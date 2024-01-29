import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Location from 'expo-location';
import * as SunCalc from 'suncalc';

const reverseGeocodeUrl = 'https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json';
const geocodeApiKey = 'dG1haM9vsYI7NJ1Qj3At8w0O_sopnYGtJ5OEnBkladY';
const mode = 'retrieveAreas';
const maxresults = '1';
const gen = 9;
const weatherUrl = 'https://api.weatherapi.com/v1/current.json';
const weatherApiKey = 'f7ce5b523356463dbfb215652231701';

const initialState = {
	locationObject: {},
	geocodeObject: {},
	weatherObject: {},
	almanacObject: {},
	isLoading: true,
	errMess: null,
}

export const fetchLocationData = createAsyncThunk(
	'location/fetchLocationData',
	async _ => await getLocationData()
);

// Grabs GPS data using expo-location
const getLocationData = async _ => {
	let { status } = await Location.requestForegroundPermissionsAsync();
	if(status !== 'granted') {
		return new Error('Location permission denied!');
	}

	let location = await Location.getCurrentPositionAsync({});
	console.log('locationSlice: getLocationData', location);
	return location; // { coords: { latitude, longitude, altitude }, ... }
};

// Reverse geocodes based on location data using Here API
/*
export const fetchLocationGeocode = async ({ latitude, longitude, altitude }) => {
	let url: string = `${reverseGeocodeUrl}?prox=${latitude},${longitude},${altitude}&`+
		`mode=${mode}&maxresults=${maxresults}&gen=${gen}&apiKey=${geocodeApiKey}`;


	const locJson = await (await fetch(url)).json();

	return locJson.Response.View[0].Result[0].Location.Address.Label;
}
*/

export const fetchGeocodeData = async locationObject => {
	const { latitude, longitude, altitude } = locationObject.coords;

	let url: string = `${reverseGeocodeUrl}?prox=${latitude},${longitude},${altitude}&`+
		`mode=${mode}&maxresults=${maxresults}&gen=${gen}&apiKey=${geocodeApiKey}`;

	const geoData = await (await fetch(url)).json();

	return geoData;
	// geoData.Response.View[0].Result[0].Location.Address.Label is the specific bit of data we want
}

export const getLocString = geocodeObject => geocodeObject.Response.View[0].Result[0].Location.Address.Label ?? 'Unknown';


// Gets weather based on location label using WeatherAPI
export const fetchWeatherData = async locString => {
	let url: string = `${weatherUrl}?key=${weatherApiKey}&q=${locString}&aqi=yes`;

	const wJson = await (await fetch(url)).json();

	//const { condition, temp_f, temp_c } = wJson.current;
	//const { text, icon } = condition;

	//return { temp_f, temp_c, text, icon };
	return wJson;
	// wJson = {
	// 		current: {
	// 			condition: {
	// 				text, icon
	// 			},
	// 			temp_f,
	// 			temp_c
	// 		}
	// 	}
}

export const getWeatherString = weatherObject => {
	const { condition, temp_f, temp_c } = weatherObject.current;
	const { text, icon } = condition;

	const temp: string = temp_f ?? '??F';
	const currentConditions: string = text ?? 'Unknown';

	// Later we'll implement F/C options but for now ...
	return `${temp}, ${currentConditions}`;
}

// use SunCalc to calculate sun and moon times
export const generateAlmanacData = locOb => {
	const { latitude, longitude } = locOb.coords;

	// we want sunrise, sunset, moonrise, moonset, moon percentage
	const date = new Date();
	const latInt = parseFloat(latitude);
	const longInt = parseFloat(longitude);

	const sunData = SunCalc.getTimes(date, latInt, longInt);
	const moonData = SunCalc.getMoonTimes(date, latInt, longInt);
	const moonPhase = SunCalc.getMoonIllumination(date);

	// Since Suncalc doesn't return just an object containing everything we
	// want to know, we'll roll our own and return that
	return {
		sunrise: sunData.sunrise,
		sunset: sunData.sunset,
		moonrise: moonData.rise,
		moonset: moonData.set,
		moonphase: moonPhase.fraction
	};
}

export const locationSlice = createSlice({
	name: 'location',
	initialState,
	reducers: {
		setLocationObject: (lState, action) => {
			// locationObject is the data returned from the Location API
			return {
				...lState,
				locationObject: action.payload,
			};
		},
		setWeatherObject: (lState, action) => {
			// weatherObject is the data returned from weatherAPI
			return {
				...lState,
				weatherObject: action.payload,
			};
		},
		setGeocodeObject: (lState, action) => {
			// geocodeObject is the data returned from Here API
			return {
				...lState,
				geocodeObject: action.payload,
			};
		},
		setAlmanacObject: (lState, action) => {
			return {
				...lState,
				almanacObject: action.payload,
			};
		},
	},
	extraReducers: {
		[fetchLocationData.pending]: (lState) => {
			lState.isLoading = true;
		},
		[fetchLocationData.fulfilled]: (lState, action) => {
			lState.isLoading = false;
			lState.errMess = null;
			lState.locationObject = action.payload;
		},
		[fetchLocationData.rejected]: (lState, action) => {
			lState.isLoading = false;
			state.errMess = action.error ? action.error.message : 'Fetch failed';
		},

	},
});

export const locationReducer = locationSlice.reducer;

export const {
	setLocationObject,
	setGeocodeObject,
	setWeatherObject,
	setAlmanacObject
} = locationSlice.actions;




/*
			if(location) {
				let localLat: string = location.coords.latitude;
				let localLong: string = location.coords.longitude;
				let localAlt: string = location.coords.altitude;

				setLat(localLat);
				setLong(localLong);
				setAlt(localAlt);
				let url: string = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${localLat},${localLong},${localAlt}&`+
					`mode=${mode}&maxresults=${maxresults}&gen=${gen}&apiKey=${APIKEY}`;
				console.log('URL:', url);

				const locData = await fetch(url);
				const locJson = await locData.json();

				setLocString(locJson.Response.View[0].Result[0].Location.Address.Label);
				setZip(locJson.Response.View[0].Result[0].Location.Address.PostalCode);
			}
		};
*/
