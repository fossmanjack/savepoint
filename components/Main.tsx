// Main.tsx
// Handles all displayed information
// jsp/P3Soft
// 2023-03-02

// React Native imports
import { useState, useEffect } from 'react';
import {
	Modal,
	Text,
	TextInput,
	View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

// Community imports
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Icon } from '@rneui/themed';

// Screens
import SaveScreen from '../screens/SaveScreen';
import TimelineScreen from '../screens/TimelineScreen';
import RolodexScreen from '../screens/RolodexScreen';
import QuizScreen from '../screens/QuizScreen';
import DevScreen from '../screens/DevScreen';

// Assets and utils
import * as Loc from '../slices/locationSlice';

export default function Main() {
	// locAge is a timestamp
	const { locationObject } = useSelector(S => S.location);

	// locTimeout is an interval in seconds, default 1800
	const { locTimeout } = useSelector(S => S.options);

	const dispatch = useDispatch();

	// Checks age of the location object and dispatches update if expired
	const refreshLocationData = dispatch => {
		console.log('Main.tsx: ['+Date.now()+'] refreshLocationData called...');
		const locTimestamp = locationObject.timestamp ?? 0;
		if((locTimestamp + locTimeout) < Date.now())
			dispatch(Loc.fetchLocationData());

	}

	// Run refreshLocationData on load
	refreshLocationData(dispatch);

	// We want to refresh every 5 minutes (300000ms)
	setInterval(refreshLocationData, 300000, dispatch);

	// Eventually we should probably subscribe to foreground location data
	// changes?  Look into that further

	// useEffect to update almanac data when locationObject changes
	useEffect(_ => {
		console.log('Main.tsx: ['+Date.now()+'] Location object changed');

		(async _ => {
			const geoData = await Loc.fetchGeocodeData(locationObject);
			dispatch(Loc.setGeocodeObject(geoData));

			const weatherData = await Loc.fetchWeatherData(geoData.Response.View[0].Result[0].Location.Address.Label);
			dispatch(Loc.setWeatherObject(weatherData));

			const almanacData = await Loc.generateAlmanacData(locationObject);
			dispatch(Loc.setAlmanacObject(almanacData));
		})();


	}, [ locationObject, dispatch ]);

	return (
		<>
			<SaveScreen />
			<StatusBar style="auto" />
		</>

	);
};

/* Notes

- Loading this screen calls an age check on location data; if more than timeout
(default 1 hour), dispatch thunk to update
- This screen also calls out the age check every five minutes



*/
