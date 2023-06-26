import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/slice';
import soulReducer from './soul/slice';
import modalReducer from './modal/slice';

const store = configureStore({
	reducer: {
		user: userReducer,
		soul: soulReducer,
		modal: modalReducer
	},
	devTools: false
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export interface ThunkApi {
	dispatch: AppDispatch;
	state: RootState;
}

export default store;