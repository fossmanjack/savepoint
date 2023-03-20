import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { _Store } from './assets/redux/_Store';
import SaveScreen from './screens/SaveScreen';

export default function App() {
	const [ location, setLocation ] = useState(null);
	const [ errorMsg, setErrorMsg ] = useState(null);
	const [ locString, setLocString ] = useState('');
	const [ lat, setLat ] = useState('');
	const [ long, setLong ] = useState('');
	const [ alt, setAlt ] = useState('');
	const [ zip, setZip ] = useState('');
	const [ weatherString, setWeatherString ] = useState('');
	const [ weatherIcon, setWeatherIcon ] = useState('');

	const APIKEY = 'dG1haM9vsYI7NJ1Qj3At8w0O_sopnYGtJ5OEnBkladY';
	const mode = 'retrieveAreas';
	const maxresults = '1';
	const gen = 9;

	const WEATHERAPI = 'f7ce5b523356463dbfb215652231701';

	useEffect(_ => {
		(async _ => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if(status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	// {
	// 		timestamp (int),
	// 		mocked (bool),
	// 		coords: {
	// 			accuracy (float),
	// 			altitude (float, meters?)
	// 			altitudeAccuracy (float),
	// 			heading (float),
	// 			latitude (float),
	// 			longitude (float),
	// 			speed (float, unknown unit)
	// 		}
	// }
	// Note that it is possible to subscribe to location changes in foreground.
	// Background is also possible but requires extra review at publish time and
	// I don't want to deal with that and it's unneeded for this app anyway.

	useEffect(_ => {
		const fetchLocationData = async _ => {
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
		fetchLocationData();
	}, [ location ]);

			/*
			fetch(url)
				.then(res => res.json())
				.then(data => {
					console.log('Retrieved data:', data);

					setLocString(data.Response.View[0].Result[0].Location.Address.Label);
					setZip(data.Response.View[0].Result[0].Location.Address.PostalCode);
				})
				.then(res => {
					//console.log('Here result:', res);
					res.json();
				})
				.then(resJson => {
					if(resJson && resJson.Response && resJson.Response.View && resJson.Response.View[0] && resJson.Response.View[0].Result && resJson.Response.View[0].Result[0]) {
						console.log('resJson:', resJson);
						const { District, City, State, PostalCode } = resJson.Response.View[0].Result[0].Location.Address;

						setLocString(`${District}, ${City}, ${State}, ${PostalCode}`);
					} else {
						console.log('Couldn\'t find location data');
					}
				})
				.catch(err => {
					console.log('Error getting reverse geocode:', err);
				});
			// Response.View[0].Result[0].Location.Address.{ District, City, State, PostalCode }
		}
	}, [ location ]);

			*/
/*
	useEffect(_ => {
		if(zip) {
			let url: string = `https://api.weatherapi.com/v1/current.json?key=${WEATHERAPI}&q=${zip}&aqi=yes`;
			fetch(url)
				.then(res => res.json())
				.then(data => {
					const { condition, temp_f } = data.current;
					const { text, icon } = condition;

					setWeatherString(`${temp_f}, ${text}`);
					setWeatherIcon(icon);

				})
				.catch(err => {
					console.log('Error getting weather:', err);
				});

		}
	}, [ zip ]);
*/
	useEffect(_ => {
		if(locString) {
			let url: string = `https://api.weatherapi.com/v1/current.json?key=${WEATHERAPI}&q=${locString}&aqi=yes`;
			fetch(url)
				.then(res => res.json())
				.then(data => {
					const { condition, temp_f } = data.current;
					const { text, icon } = condition;

					setWeatherString(`${temp_f}, ${text}`);
					setWeatherIcon(icon);

				})
				.catch(err => {
					console.log('Error getting weather:', err);
				});

		}
	}, [ locString ]);


/*
	let text = 'Waiting...';

	if(errorMsg) {
		text = errorMsg;
	} else if(location) {
		text = `Latitude: ${lat}\nLongitude: ${long}\nAltitude: ${alt}\n${locString}\n${weatherString}`;
		//text = JSON.stringify(location);
	}
*/


	let text = 'Waiting...';

	if(errorMsg) {
		text = errorMsg;
	} else if(location) {
		text = `Latitude: ${lat}\nLongitude: ${long}\nAltitude: ${alt}\n${locString}\n${weatherString}`;
		//text = JSON.stringify(location);
	}

/*
	return (
		<Provider store={_Store}>
			<View style={styles.container}>
				<Text>{text}</Text>
				<StatusBar style="auto" />
			</View>
		</Provider>
	);
*/

	return (
		<Provider store={_Store}>
			<SaveScreen />
		</Provider>
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

