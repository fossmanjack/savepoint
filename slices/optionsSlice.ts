import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	locTimeout: 1800,
};


export const optionsSlice = createSlice({
	name: 'options',
	initialState,
	reducers: {
		setLocTimeout: (oState, action) => { oState.locTimeout = action.payload },

	},
});

export const optionsReducer = optionsSlice.reducer;

export const {
	setLocTimeout,
} = optionsSlice.actions;
