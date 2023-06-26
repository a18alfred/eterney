import { MODAL_ROUTE } from '../../constants/routing';

export interface ModalProps {
	id?: number;
	message?: string;
};

export interface ModalHistory {
	route: MODAL_ROUTE;
	scrollPosition: number;
	props?: ModalProps;
}

export interface ModalState {
	history: ModalHistory[];
	currentModal: MODAL_ROUTE | undefined,
	currentModalProps: ModalProps | undefined
	currentIniScroll: number
}