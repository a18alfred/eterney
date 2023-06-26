import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalHistory, ModalState } from './types';
import { RootState } from '../index';


const initialModalState: ModalState = {
	history: [],
	currentModal: undefined,
	currentModalProps: undefined,
	currentIniScroll: 0
};

const modalSlice = createSlice({
	name: 'modal',
	initialState: initialModalState,
	reducers: {
		openModal: (state, action: PayloadAction<ModalHistory>) => {
			if (state.history.length > 0)
				state.history[state.history.length - 1].scrollPosition = action.payload.scrollPosition;
			state.history.push({
				route: action.payload.route,
				scrollPosition: 0,
				props: action.payload.props
			});
			state.currentModal = action.payload.route;
			state.currentModalProps = action.payload.props;
			state.currentIniScroll = 0;
		},
		closeModal: (state) => {
			state.history = [];
			state.currentModal = undefined;
			state.currentModalProps = undefined;
		},
		goBack: (state) => {
			state.history.pop();
			const lastModal = state.history[state.history.length - 1];
			state.currentModal = lastModal ? lastModal.route : undefined;
			state.currentModalProps = lastModal ? lastModal.props : undefined;
			state.currentIniScroll = lastModal ? lastModal.scrollPosition : 0;
		}
	}
});

export const {
	openModal,
	closeModal,
	goBack
} = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;