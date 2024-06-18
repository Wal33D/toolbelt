import { VercelResponse } from '@vercel/node';

export const handleToolOptions = (response: VercelResponse) => {
	return response.json({ tools });
};

export const tools = [
	{
		type: 'function',
		function: {
			name: 'getWeeklyForecast',
			description:
				'Get the weekly weather forecast for a specific location including date, day of the week, maximum temperature, minimum temperature, average temperature, wind speed, wind direction, precipitation, humidity, conditions, and a detailed description.',
			parameters: {
				type: 'object',
				properties: {
					city: {
						type: 'string',
						description: 'The city name, e.g., San Francisco',
					},
					state: {
						type: 'string',
						description: 'The state code, e.g., CA',
					},
				},
				required: ['city', 'state'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'IPAddressLookUp',
			description:
				'Look up detailed information for a given IP address including location, network details, and organization information. The response includes fields like ip, asn, city, continent_code, country, country_area, country_calling_code, country_capital, country_code, country_code_iso3, country_name, country_population, country_tld, currency, currency_name, description, detailedDescription, in_eu, languages, latitude, longitude, network, org, postal, region, region_code, utc_offset, version.',
			parameters: {
				type: 'object',
				properties: {
					ip: {
						type: 'string',
						description: 'The IP address to look up, e.g., 108.65.112.74',
					},
				},
				required: ['ip'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'locationResolver',
			description:
				'Resolve location details for a given; (zipCode) or (city/state) or (lat/lon) otherwise known as geocoding. The response includes fields like zipCode, address, city, country, lat, lon, state.',
			parameters: {
				type: 'object',
				properties: {
					zipCode: {
						type: 'string',
						description: 'The zip code to look up, e.g., 49024',
						optional: true,
					},
					city: {
						type: 'string',
						description: 'The city name, e.g., San Francisco',
						optional: true,
					},
					state: {
						type: 'string',
						description: 'The state code, e.g., CA',
						optional: true,
					},
					country: {
						type: 'string',
						description: 'The 2-letter country code, e.g., US',
						optional: true,
					},
					lat: {
						type: 'number',
						description: 'The latitude of the location, e.g., 42.1974',
						optional: true,
					},
					lon: {
						type: 'number',
						description: 'The longitude of the location, e.g., -85.6194',
						optional: true,
					},
				},
				required: ['zipCode'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'googleWebSearch',
			description: 'Perform an internet search and return relevant results.',
			parameters: {
				type: 'object',
				properties: {
					searchTerm: {
						type: 'string',
						description: 'The term to search for on the internet.',
					},
					location: {
						type: 'string',
						description: 'The location to target the search results.',
						optional: true,
					},
					hostLanguage: {
						type: 'string',
						description: 'The host language for the search.',
						optional: true,
					},
					numberOfResults: {
						type: 'integer',
						description: 'The number of results to return.',
						optional: true,
					},
					geolocation: {
						type: 'string',
						description: 'The browsers geolocation to search from.',
						optional: true,
					},
					time_period: {
						type: 'string',
						description: 'The time period to filter the search results.',
						optional: true,
					},
				},
				required: ['searchTerm'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'getExtendedWeather',
			description:
				'Get the extended weather forecast for the next two weeks for a specific location including maximum temperature, minimum temperature, average temperature, wind speed, precipitation, humidity, and conditions.',
			parameters: {
				type: 'object',
				properties: {
					city: {
						type: 'string',
						description: 'The city name, e.g., San Francisco',
						optional: true,
					},
					state: {
						type: 'string',
						description: 'The state code, e.g., CA',
						optional: true,
					},
					zipCode: {
						type: 'string',
						description: 'The zip code to look up, e.g., 49024',
						optional: true,
					},
					lat: {
						type: 'number',
						description: 'The latitude of the location, e.g., 42.1974',
						optional: true,
					},
					lon: {
						type: 'number',
						description: 'The longitude of the location, e.g., -85.6194',
						optional: true,
					},
				},
				required: [],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'getTodaysWeather',
			description:
				'Get the current weather for a specific location including datetime, temperature, feelslike, humidity, dew point, precipitation, precipitation probability(rain chance), snow, snow depth, wind speed, wind direction, pressure, visibility, cloud cover, solar radiation, UV index, conditions, icon, sunrise, sunset, and a detailed description.',
			parameters: {
				type: 'object',
				properties: {
					city: {
						type: 'string',
						description: 'The city name, e.g., San Francisco',
					},
					state: {
						type: 'string',
						description: 'The state code, e.g., CA',
					},
				},
				required: ['city', 'state'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'getWebsiteScreenshot',
			description:
				'Take a screenshot of a given URL with optional height and width for the browsers window size. Returns a url to the a screenshot for any website on the internet!',
			parameters: {
				type: 'object',
				properties: {
					url: {
						type: 'string',
						description: 'The fully qualified http(s) URL of the website to take a screenshot of.',
					},
					height: {
						type: 'number',
						description: 'The height of the window (optional, but required if width is provided).',
						optional: true,
					},
					width: {
						type: 'number',
						description: 'The width of the window (optional, but required if height is provided).',
						optional: true,
					},
				},
				required: ['url'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'googleAddressResolver',
			description: 'Format and correct an address using the Google Geocoding API.',
			parameters: {
				type: 'object',
				properties: {
					address: {
						type: 'string',
						description: 'The address to format and correct',
					},
				},
				required: ['address'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'parsePhoneNumber',
			description: 'Parse, validate, and format phone numbers using the libphonenumber-js package.',
			parameters: {
				type: 'object',
				properties: {
					number: {
						type: 'string',
						description: 'Phone number string (required)',
					},
					country: {
						type: 'string',
						description: 'Country code string (optional)',
						optional: true,
					},
				},
				required: ['number'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'googleImageSearch',
			description: 'Retrieve images based on a search term using the g-i-s package.',
			parameters: {
				type: 'object',
				properties: {
					searchTerm: {
						type: 'string',
						description: 'The term to search for images.',
					},
					queryStringAddition: {
						type: 'string',
						description: 'Additional query string parameters (optional).',
						optional: true,
					},
					filterOutDomains: {
						type: 'array',
						items: {
							type: 'string',
						},
						description: 'Domains to filter out (optional).',
						optional: true,
					},
					size: {
						type: 'string',
						description: 'The size of the images (optional, one of "small", "medium", "large", "icon").',
						optional: true,
					},
				},
				required: ['searchTerm'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'cloudinaryUpload',
			description: 'Upload images to Cloudinary, supports uploading via URL, base64 string, or stream.',
			parameters: {
				type: 'object',
				properties: {
					url: {
						type: 'string',
						description: 'The URL of the image to upload (optional)',
						optional: true,
					},
					base64: {
						type: 'string',
						description: 'The base64 string of the image to upload (optional)',
						optional: true,
					},
					stream: {
						type: 'object',
						description: 'The stream of the image to upload (optional)',
						optional: true,
					},
					fileName: {
						type: 'string',
						description: 'The desired file name (optional)',
						optional: true,
					},
					cloudinaryAssetFolder: {
						type: 'string',
						description: 'The Cloudinary folder to upload to (optional)',
						optional: true,
					},
				},
				required: [],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'sendSMS',
			description: 'Send an SMS message to a phone number or WhatsApp.',
			parameters: {
				type: 'object',
				properties: {
					phoneNumber: {
						type: 'string',
						description: 'The phone number to send the SMS to, e.g., +1234567890',
					},
					message: {
						type: 'string',
						description: 'The message content to send.',
					},
					viaWhatsApp: {
						type: 'boolean',
						description: 'Whether to send the message via WhatsApp (optional).',
						optional: true,
					},
				},
				required: ['phoneNumber', 'message'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'sendVoiceMessage',
			description: 'Send a voice message to a phone number or WhatsApp.',
			parameters: {
				type: 'object',
				properties: {
					phoneNumber: {
						type: 'string',
						description: 'The phone number to send the voice message to, e.g., +1234567890',
					},
					message: {
						type: 'string',
						description: 'The message content to send.',
					},
					viaWhatsApp: {
						type: 'boolean',
						description: 'Whether to send the message via WhatsApp (optional).',
						optional: true,
					},
				},
				required: ['phoneNumber', 'message'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'sendEmail',
			description: 'Send an email to a specified address.',
			parameters: {
				type: 'object',
				properties: {
					to: {
						type: 'string',
						description: 'The email address to send the email to.',
					},
					subject: {
						type: 'string',
						description: 'The subject of the email.',
					},
					body: {
						type: 'string',
						description: 'The body content of the email.',
					},
				},
				required: ['to', 'subject', 'body'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'addNote',
			description: 'Add a note.',
			parameters: {
				type: 'object',
				properties: {
					title: {
						type: 'string',
						description: 'The title of the note.',
					},
					content: {
						type: 'string',
						description: 'The content of the note.',
					},
				},
				required: ['title', 'content'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'searchNotes',
			description: 'Search notes by keyword.',
			parameters: {
				type: 'object',
				properties: {
					keyword: {
						type: 'string',
						description: 'The keyword to search for in notes.',
					},
				},
				required: ['keyword'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'updateNote',
			description: 'Update an existing note.',
			parameters: {
				type: 'object',
				properties: {
					noteId: {
						type: 'string',
						description: 'The ID of the note to update.',
					},
					title: {
						type: 'string',
						description: 'The new title of the note (optional).',
						optional: true,
					},
					content: {
						type: 'string',
						description: 'The new content of the note (optional).',
						optional: true,
					},
				},
				required: ['noteId'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'addCalendarEvent',
			description: 'Add an event to the calendar.',
			parameters: {
				type: 'object',
				properties: {
					title: {
						type: 'string',
						description: 'The title of the event.',
					},
					date: {
						type: 'string',
						description: 'The date of the event in YYYY-MM-DD format.',
					},
					time: {
						type: 'string',
						description: 'The time of the event in HH:MM format (optional).',
						optional: true,
					},
					description: {
						type: 'string',
						description: 'The description of the event (optional).',
						optional: true,
					},
				},
				required: ['title', 'date'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'searchCalendar',
			description: 'Search calendar events by keyword.',
			parameters: {
				type: 'object',
				properties: {
					keyword: {
						type: 'string',
						description: 'The keyword to search for in calendar events.',
					},
				},
				required: ['keyword'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'updateCalendarEvent',
			description: 'Update an existing calendar event.',
			parameters: {
				type: 'object',
				properties: {
					eventId: {
						type: 'string',
						description: 'The ID of the event to update.',
					},
					title: {
						type: 'string',
						description: 'The new title of the event (optional).',
						optional: true,
					},
					date: {
						type: 'string',
						description: 'The new date of the event in YYYY-MM-DD format (optional).',
						optional: true,
					},
					time: {
						type: 'string',
						description: 'The new time of the event in HH:MM format (optional).',
						optional: true,
					},
					description: {
						type: 'string',
						description: 'The new description of the event (optional).',
						optional: true,
					},
				},
				required: ['eventId'],
			},
		},
	},
];
