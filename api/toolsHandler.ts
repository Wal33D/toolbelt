import { searchGoogle } from '../functions/searchGoogle/googleWebSearch';
import { getLocationData } from '../functions/resolvers/location';
import { sendTextMessage } from '../functions/sendTextMessage';
import { IPAddressLookUp } from '../functions/ip/ip';
import { handleToolOptions } from '../functions/handleToolOptions';
import { googleImageSearch } from '../functions/searchGoogle/googleImageSearch';
import { getCurrentDateTime } from './getCurrentDateTime';
import { uploadToCloudinary } from '../functions/uploaders/uploadToCloudinary';
import { sendWhatsAppMessage } from '../functions/whatsapp/sendWhatsAppMessage';
import { fetchExtendedWeather } from '../functions/weather/fetchExtendedWeather';
import { getWebsiteScreenshot } from '../functions/screenshot/getWebsiteScreenshot';
import { googleAddressResolver } from '../functions/resolvers/googleAddressResolver';
import { fetchWeeklyWeatherData } from '../functions/weather/weeklyWeather';
import { fetchTodaysWeatherData } from '../functions/weather/todaysWeather';
import { parsePhoneNumberHandler } from '../functions/resolvers/phonenumber';
import { getIslamicPrayerTimingsDay } from '../functions/islamicPrayerTimingsDay';
import { getIslamicPrayerTimingsWeek } from '../functions/IslamicPrayerTimingsWeek';
import { VercelRequest, VercelResponse } from '@vercel/node';
import {
	createGoogleDocsFile,
	createGoogleSheetsFile,
	updateGoogleDocsFile,
	updateGoogleSheetsFile,
	setGoogleFilePermissions,
} from '../functions/googleBusinessStuff/createGoogleSheetOrGoogleDoc';

const handler = async (request: VercelRequest, response: VercelResponse) => {
	if (request.method === 'OPTIONS') {
		return await handleToolOptions(response);
	}
	try {
		let functionName: string | null = null;

		if (request.method === 'POST') {
			const body = request.body;
			functionName = body.functionName || null;
		} else {
			throw new Error('Invalid request method');
		}

		const processRequest = async (request: VercelRequest) => {
			console.log({ functionName, request });
			switch (functionName) {
				case 'IPAddressLookUp':
					return await IPAddressLookUp(request);
				case 'locationResolver':
					return await getLocationData(request);
				case 'getWebsiteScreenshot':
					return await getWebsiteScreenshot(request);
				case 'googleWebSearch':
					return await searchGoogle(request);
				case 'getTodaysWeather':
					return await fetchTodaysWeatherData(request);
				case 'getWeeklyForecast':
					return await fetchWeeklyWeatherData(request);
				case 'getExtendedWeather':
					return await fetchExtendedWeather(request);
				case 'googleAddressResolver':
					return await googleAddressResolver(request);
				case 'parsePhoneNumber':
					return await parsePhoneNumberHandler(request);
				case 'googleImageSearch':
					return await googleImageSearch(request);
				case 'cloudinaryUpload':
					return await uploadToCloudinary(request);
				case 'getIslamicPrayerTimingsDay':
					return await getIslamicPrayerTimingsDay(request);
				case 'getIslamicPrayerTimingsWeek':
					return await getIslamicPrayerTimingsWeek(request);
				case 'getCurrentDateTime':
					return await getCurrentDateTime(request);
				case 'sendTextMessage':
					return await sendTextMessage(request);
				case 'sendWhatsAppMessage':
					return await sendWhatsAppMessage(request);
				case 'createGoogleDocsFile':
					return await createGoogleDocsFile(request);
				case 'createGoogleSheetsFile':
					return await createGoogleSheetsFile(request);
				case 'updateGoogleDocsFile':
					return await updateGoogleDocsFile(request);
				case 'updateGoogleSheetsFile':
					return await updateGoogleSheetsFile(request);
				case 'setGoogleFilePermissions':
					return await setGoogleFilePermissions(request);
				default:
					throw new Error('Invalid function name.');
			}
		};

		const responseData = await processRequest(request);
		response.status(200).json(responseData);
	} catch (error: any) {
		response.status(400).json({ error: error.message });
	}
};

export default handler;
