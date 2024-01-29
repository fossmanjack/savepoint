import { useDispatch, useSelector } from 'react-redux';
import {
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';
import { useState, useEffect } from 'react';
import * as Loc from '../slices/locationSlice';

export default function SaveScreen() {
	const {
		errorMsg,
		isLoading,
		locationObject,
		geocodeObject,
		weatherObject
	} = useSelector(S => S.location);

/*
	const [ lat, setLat ] = useState(locationObject.coords.latitude ?? '');
	const [ long, setLong ] = useState(locationObject.coords.longitude ?? '');
	const [ alt, setAlt ] = useState(locationObject.coords.altitude ?? '');
	const [ locString, setLocString ] = useState(Loc.getLocString(geocodeObject));
	const [ weatherString, setWeatherString ] = useState(Loc.getWeatherString(weatherObject));
*/
/*
	let lat = locationObject ? locationObject.coords.latitude : '';
	//let lat = locationObject.coords.latitude ?? '';
	//let long = locationObject.coords.longitude ?? '';
	//let alt = locationObject.coords.altitude ?? '';
	let long = locationObject ? locationObject.coords.longitude : '';
	let alt = locationObject ? locationObject.coords.altitude : '';
	let locString = geocodeObject ? Loc.getLocString(geocodeObject) : '';
	let weatherString = weatherObject ? Loc.getWeatherString(weatherObject) : '';
*/
	const [ lat, setLat ] = useState('');
	const [ long, setLong ] = useState('');
	const [ alt, setAlt ] = useState('');
	const [ locString, setLocString ] = useState('');
	const [ weatherString, setWeatherString ] = useState('');

	useEffect(_ => {
		if(!isLoading) {
			if(locationObject) {
				setLat(locationObject.coords.latitude);
				setLong(locationObject.coords.longitude);
				setAlt(locationObject.coords.altitude);
			}
			if(geocodeObject)
				setLocString(Loc.getLocString(geocodeObject));
			if(weatherObject)
				setWeatherString(Loc.getWeatherString(weatherObject));
		}
	}, [ isLoading, locationObject, geocodeObject, weatherObject ]);

	let text = 'Waiting...';

	if(errorMsg) {
		text = errorMsg;
	} else if(locationObject) {
		text = `Latitude: ${lat}\nLongitude: ${long}\nAltitude: ${alt}\n${locString}\n${weatherString}`;
		//text = JSON.stringify(location);
	}

	return (
		<View style={styles.container}>
			<Text>{text}</Text>
		</View>

	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

/* Notes

Title
Tags
Entry
Activity
"Almanac" button, brings up dialog auto-populated with date, time, location,
weather, etc, all of which can be edited
Save button
Clear button

Behavior:
- This screen reflects currentEntry in the Redux state
- Inputting text or hitting the almanac button copies the background almanac
  data into this entry
- "Saving" an entry inserts this into the timeline and clears currentEntry and
  the almanac data
- Thus, before we can start working on this, we have to get the almanac thunk
  in place
- "Almanac" is a publication of current data, per Wikipedia, so it's an appropriate
  word to use here



*/
