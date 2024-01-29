import { configureStore } from '@reduxjs/toolkit';
import { saveReducer } from '../../slices/saveSlice';
import { locationReducer } from '../../slices/locationSlice';
import { optionsReducer } from '../../slices/optionsSlice';

export const _Store = configureStore({
	reducer: {
		save: saveReducer,
		location: locationReducer,
		options: optionsReducer,
	},
});
