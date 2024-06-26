import axios from 'axios';
import stream from 'stream';
import OpenAI from 'openai';
import { promisify } from 'util';
import { v2 as cloudinary } from 'cloudinary';

const openai = new OpenAI();
const pipeline = promisify(stream.pipeline);

interface viewAndDescribeWhatsAppImageParams {
	body: {
		mediaId: string;
		quality?: 'low' | 'high';
	};
}

export const viewAndDescribeWhatsAppImage = async (request: viewAndDescribeWhatsAppImageParams): Promise<any> => {
	const { mediaId, quality = 'low' } = request.body;

	try {
		const isSetOne = Math.random() < 0.5;

		const cloudinaryConfig = {
			cloud_name: isSetOne ? process.env.CLOUDINARY_CLOUD_NAME : process.env.CLOUDINARY_AUX_CLOUD_NAME,
			api_key: isSetOne ? process.env.CLOUDINARY_API_KEY : process.env.CLOUDINARY_AUX_API_KEY,
			api_secret: isSetOne ? process.env.CLOUDINARY_API_SECRET : process.env.CLOUDINARY_AUX_API_SECRET,
		};
		cloudinary.config(cloudinaryConfig);

		const { data: mediaData } = await axios.get(`${process.env.WHATSAPP_GRAPH_API_URL}/${mediaId}`, {
			headers: {
				Authorization: `Bearer ${process.env.WHATSAPP_GRAPH_API_TOKEN}`,
				'Content-Type': 'application/json',
			},
		});
		console.log(mediaData);
		const mediaUrl = mediaData.url;
		const { data: mediaStream } = await axios.get(mediaUrl, {
			headers: {
				Authorization: `Bearer ${process.env.WHATSAPP_GRAPH_API_TOKEN}`,
			},
			responseType: 'stream',
		});

		const uploadResult: any = await new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream({ folder: 'ai_temp_images', resource_type: 'auto' }, (error, result) => {
				if (error) {
					reject(new Error('Cloudinary upload failed'));
				} else {
					resolve(result);
				}
			});
			pipeline(mediaStream, uploadStream).catch(reject);
		});

		if (!uploadResult || !uploadResult.url) {
			throw new Error('Upload result is invalid');
		}

		const scaleDownUrlTransform = (url: string): string => {
			const parts = url.split('/upload/');
			return `${parts[0]}/upload/w_500,q_auto:low/${parts[1]}`;
		};

		const scaledUrl = scaleDownUrlTransform(uploadResult.url);
		const analysisMessage = 'What’s in this image?';
		const response = await openai.chat.completions.create({
			model: 'gpt-4o',
			messages: [
				{
					role: 'user',
					content: [
						{ type: 'text', text: analysisMessage },
						{
							type: 'image_url',
							image_url: { url: scaledUrl, detail: quality === 'high' ? 'high' : 'low' },
						},
					],
				},
			],
		});

		const analysis = response.choices[0].message.content || 'No analysis available';

		cloudinary.uploader.destroy(uploadResult.public_id);

		return {
			success: true,
			source: 'whatsapp',
			type: 'image_upload',
			mediaId,
			format: uploadResult.format,
			width: uploadResult.width,
			height: uploadResult.height,
			fileSize: uploadResult.bytes,
			analysis: analysis,
		};
	} catch (error) {
		return {
			success: false,
			error: error.message,
		};
	}
};
