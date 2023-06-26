import React, { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalProps } from '../../state/modal/types';
import useModal from '../../hooks/useModal';
import { MODAL_ROUTE } from '../../constants/routing';
import { LightButton } from '../../theme/elements';
import { useAppDispatch } from '../../state/hooks';
import { clear_search } from '../../state/soul/slice';

const SearchSelector: React.FC<ModalProps> = () => {
	const { t } = useTranslation();
	const { open } = useModal();
	const dispatch = useAppDispatch();

	const onSearchById = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		open(MODAL_ROUTE.SEARCH_ID);
	};

	const onSearchByName = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(clear_search());
		open(MODAL_ROUTE.SEARCH_NAME);
	};

	return (
		<>
			<LightButton onClick={onSearchByName}>
				{t('search_name')}
			</LightButton>
			<LightButton onClick={onSearchById}>
				{t('search_id')}
			</LightButton>
		</>
	);
};

export default SearchSelector;
