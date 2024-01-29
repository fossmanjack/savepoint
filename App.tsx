import { Provider } from 'react-redux';
import { _Store } from './assets/redux/_Store';
import Main from './components/Main';

export default function App() {

	return (
		<Provider store={_Store}>
			<Main />
		</Provider>
	);
}

/*
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
*/
