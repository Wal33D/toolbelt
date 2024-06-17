import axios from 'axios';
import { getNextEnvKey } from 'envholster';
import { parseQueryParams } from '../utils/parseQueryParams';
import { SerpSearchRequest } from './searchGoogleTypes';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { interfaceDescriptionSearchGoogleWeb } from '../functions/searchGoogle/search-googleOptions';

const handler = async (request: VercelRequest, response: VercelResponse) => {
	if (request.method === 'OPTIONS') {
		return response.status(200).json(interfaceDescriptionSearchGoogleWeb);
	}

	try {
		const { key: apiKey } = await getNextEnvKey({ baseEnvName: 'SCALE_SERP_API_KEY_' });

		let requests: SerpSearchRequest[];

		if (request.method === 'GET') {
			requests = [parseQueryParams(request.query) as SerpSearchRequest];
		} else if (request.method === 'POST') {
			requests = Array.isArray(request.body) ? request.body : [request.body];
		} else {
			throw new Error('Invalid request method');
		}

		if (requests.length > 50) {
			return response.status(400).json({
				status: false,
				message: 'Too many requests. Please provide 50 or fewer requests in a single call.',
			});
		}

		const results = await Promise.all(
			requests.map(async req => {
				const params: any = {
					api_key: apiKey,
					q: req.searchTerm,
					location: req.location || '',
					hl: req.hostLanguage || 'en',
					gl: req.geolocation || 'us',
					device: req.device || 'desktop',
					num: req.numberOfResults ? req.numberOfResults.toString() : '1',
					max_page: req.max_page || 1,
					include_html: req.include_html || 'false',
					output: req.output || 'json',
					include_answer_box: req.include_answer_box || 'false',
					time_period: req.time_period || '',
				};

				try {
					const response = await axios.get('https://api.scaleserp.com/search', { params });
					const { organic_results } = response.data;
					const { engine_url, json_url } = response.data.search_metadata.pages[0];

					// Filter out the unwanted fields
					const filteredResults = organic_results.map((result: any) => {
						const { prerender, page, position, position_overall, block_position, ...filteredResult } = result;
						return filteredResult;
					});

					return {
						searchQuery: req.searchTerm,
						organic_results: filteredResults,
						searchUrl: engine_url,
						metaDataUrl: json_url,
					};
				} catch (error) {
					throw new Error(`Failed to retrieve results for query "${req.searchTerm}": ${error.message}`);
				}
			})
		);

		return response.status(200).json({
			status: true,
			message: 'SERP search results retrieved successfully.',
			data: results,
		});
	} catch (error: any) {
		return response.status(500).json({
			status: false,
			message: `Error: ${error.message}`,
		});
	}
};

export default handler;
