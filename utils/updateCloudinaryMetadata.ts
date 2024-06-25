import { v2 as cloudinary } from 'cloudinary';

/**
 * Update metadata for an existing Cloudinary resource.
 * @param publicId The public ID of the Cloudinary resource.
 * @param analysis The analysis result from OpenAI.
 * @param tags The tags generated by OpenAI.
 */
export const updateCloudinaryMetadata = async (publicId: string, description: string, tags: string[]): Promise<void> => {
	try {
		const response = await cloudinary.api.update(publicId, {
			context: {
				alt: description,
				tags: tags.join(', '),
			},
		});
		console.log('Metadata updated successfully:', response);
	} catch (error) {
		console.error('Failed to update Cloudinary metadata:', error);
	}
};
