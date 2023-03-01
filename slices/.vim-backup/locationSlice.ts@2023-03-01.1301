import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Location from 'expo-location';

const reverseGeocodeUrl = 'https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json';
const geocodeApiKey = 'dG1haM9vsYI7NJ1Qj3At8w0O_sopnYGtJ5OEnBkladY';
const mode = 'retrieveAreas';
const maxresults = '1';
const gen = 9;
const weatherUrl = 'https://api.weatherapi.com/v1/current.json';
const weatherApiKey = 'f7ce5b523356463dbfb215652231701';

const initialState = {
	locationObject: {},
	weatherObject: {},
	loading: false,
}


// Grabs GPS data using expo-location
const getLocationData = async _ => {
	let { status } = await Location.requestForegroundPermissionsAsync();
	if(status !== 'granted') {
		return new Error('Location permission denied!');
	}

	let location = await Location.getCurrentPositionAsync({});
	return location; // { coords: { latitude, longitude, altitude }, ... }
};

// Reverse geocodes based on location data using Here API
export const fetchLocationGeocode = async ({ latitude: string, longitude: string, altitude: string }) => {
	let url: string = `${reverseGeocodeUrl}?prox=${latitude},${longitude},${altitude}&`+
		`mode=${mode}&maxresults=${maxresults}&gen=${gen}&apiKey=${geocodeApiKey}`;


	//const locData = await fetch(url);
	//const locJson = await locData.json();
	const locJson = await (await fetch(url)).json();

	return locJson.Response.View[0].Result[0].Location.Address.Label;
}

// Gets weather based on location label using WeatherAPI
export const fetchWeatherData = async locString => {
	let url: string = `${weatherUrl}?key=${weatherApiKey}&q=${locString}&aqi=yes`;

	const wData = await fetch(url);
	const wJson = await wData.json();

	const { condition, temp_f, temp_c } = wJson.current;
	const { text, icon } = condition;

	return { temp_f, temp_c, text, icon };
}

export const locationSlice = createSlice({
	name: 'location',
	initialState,
	reducers: {},
	extraReducers: {

	},
});




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
