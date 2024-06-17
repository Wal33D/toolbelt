import { VercelResponse } from '@vercel/node';

export const handleWeatherOptions = (response: VercelResponse) => {
	const interfaceDescription = {
		description:
			'This endpoint retrieves weather information based on address, zip code, or geo-coordinates (lat, lon). A functionName is required to specify the type of weather data to retrieve.',
		requiredParams: {
			zipCode: 'Zip code (optional)',
			lat: 'Latitude (optional)',
			lon: 'Longitude (optional)',
			city: 'City name (optional)',
			state: 'State code (optional)',
			country: 'Country code (required if city is provided)',
			functionName: 'Name of the function to retrieve specific weather data (required)',
		},
		demoBody: [
			{
				zipCode: '49024',
				functionName: 'getWeeklyForecast',
			},
			{
				lat: 42.201,
				lon: -85.5806,
				functionName: 'getTodaysWinddir',
			},
			{
				city: 'Portage',
				state: 'MI',
				country: 'US',
				functionName: 'getWeeklyForecastDescription',
			},
			{
				lat: 42.201,
				lon: -85.5806,
				functionName: 'getTodaysFeelslike',
			},
			{
				zipCode: '49024',
				functionName: 'getTodaysTemp',
			},
		],
		demoResponse: {
			status: true,
			message: 'Weather data retrieved successfully.',
			location: 'Austin, TX, 78741, US',
			forecast: [
				{
					dayOfWeek: 'Monday',
					date: '2024-06-10',
					maxTempC: 35,
					minTempC: 22,
					avgTempC: 28,
					maxTempF: 95,
					minTempF: 71.6,
					avgTempF: 82.4,
					windSpeed: 10,
					windDir: 180,
					precipitation: 0,
					humidity: 40,
					conditions: 'Clear',
					detailedDescription:
						'On Monday (2024-06-10), the weather in Austin, TX will be clear. The temperature will range from 22°C (71.6°F) to 35°C (95°F), with an average of 28°C (82.4°F). Expect clear skies, with a wind speed of 10 km/h coming from 180°. The precipitation is 0 mm, humidity is 40%.',
				},
			],
		},
		availableFunctions: {
			todaysWeather: [
				'getTodaysTemp',
				'getTodaysFeelslike',
				'getTodaysHumidity',
				'getTodaysDew',
				'getTodaysPrecip',
				'getTodaysPrecipProb',
				'getTodaysSnow',
				'getTodaysSnowDepth',
				'getTodaysWindspeed',
				'getTodaysWinddir',
				'getTodaysPressure',
				'getTodaysVisibility',
				'getTodaysCloudcover',
				'getTodaysSolarradiation',
				'getTodaysUvindex',
				'getTodaysConditions',
				'getTodaysIcon',
				'getTodaysSunrise',
				'getTodaysSunset',
				'getTodaysWeather',
				'getTodaysWeatherDescription',
				'getCurrentTemp',
				'getCurrentWeather',
				'getCurrentWeatherDescription',
			],
			weeklyWeather: [
				'getWeeklyAvgMaxTempC',
				'getWeeklyAvgMinTempC',
				'getWeeklyAvgTempC',
				'getWeeklyAvgMaxTempF',
				'getWeeklyAvgMinTempF',
				'getWeeklyAvgTempF',
				'getWeeklyAvgWindSpeed',
				'getWeeklyAvgWindDir',
				'getWeeklyTotalPrecipitation',
				'getWeeklyAvgHumidity',
				'getWeeklyConditions',
				'getWeeklyHighTempC',
				'getWeeklyLowTempC',
				'getWeeklyHighTempF',
				'getWeeklyLowTempF',
				'getWeeklyForecast',
				'getWeeklyForecastDescription',
			],
		},
	};

	return response.status(200).json(interfaceDescription);
};
