import { useAppDispatch } from '../state/hooks';
import { MODAL_ROUTE } from '../constants/routing';
import { ModalProps } from '../state/modal/types';
import { goBack, openModal, closeModal } from '../state/modal/slice';
import { useHistory } from 'react-router-dom';

const useModal = () => {
	const dispatch = useAppDispatch();
	const history = useHistory();

	const open = (route: MODAL_ROUTE, props?: ModalProps) => {
		const div = document.getElementById('modalContentWrapper');
		const scrollPosition = div?.scrollTop;
		dispatch(openModal({ route, props, scrollPosition: scrollPosition ? scrollPosition : 0 }));
	};

	const close = () => {
		if (history.location.pathname !== '/')
			history.push('/');
		dispatch(closeModal());
	};

	const back = () => {
		dispatch(goBack());
	};

	return { open, close, back };
};

export default useModal;