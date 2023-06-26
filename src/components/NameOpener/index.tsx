import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { selectSoulById, selectSoulInitialized } from '../../state/soul/slice';
import { useEterney } from '../../hooks/useEterney';
import { MODAL_ROUTE } from '../../constants/routing';
import { useAppSelector } from '../../state/hooks';
import useModal from '../../hooks/useModal';

const NameOpener = () => {
	const { id: idStr } = useParams<{ id: string }>();
	const id = parseInt(idStr);
	const soul = useAppSelector(state => selectSoulById(state, id));
	const isInitialized = useAppSelector(selectSoulInitialized);
	const { findById } = useEterney();
	const { open } = useModal();
	const history = useHistory();

	const validateId = () => {
		if (isNaN(Number(id))) return false;
		return id >= 0;
	};

	useEffect(() => {
		if (validateId()) {
			if (isInitialized) {
				if (!soul) {
					findById(id);
				}
				open(MODAL_ROUTE.DETAILS_WALL, { id });
			}
		} else {
			history.push('/');
		}
	}, [id, isInitialized]);

	return null;
};

export default NameOpener;
