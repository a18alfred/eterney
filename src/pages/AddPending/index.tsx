import React, { useEffect } from 'react';
import { ModalProps } from '../../state/modal/types';
import styled from 'styled-components';
import { lightBorder, secondaryText } from '../../theme/colors';
import { useTranslation } from 'react-i18next';
import { scrollStyle } from '../../theme/style';
import PersonDetails from '../../components/PersonDetails';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { clear_name_transaction, selectSoulNewName } from '../../state/soul/slice';
import { Soul } from '../../state/soul/types';
import useModal from '../../hooks/useModal';
import { TRANSACTION_STATUS } from '../../constants/settings';
import { MODAL_ROUTE } from '../../constants/routing';
import { Loader } from '../../components/Loader';

const PendingNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
  padding: 1rem;
  border: 1px solid ${lightBorder};
  gap: 0.5rem;
  ${scrollStyle};
`;

const TextSecondary = styled.p`
  text-align: center;
  color: ${secondaryText};
`;

const AddPending: React.FC<ModalProps> = () => {
	const formState = useAppSelector(selectSoulNewName);
	const { t } = useTranslation();
	const { open } = useModal();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (formState.status === TRANSACTION_STATUS.SUCCESS) {
			open(MODAL_ROUTE.SUCCESS, { message: 'name_added' });
			dispatch(clear_name_transaction());
		}
		if (formState.status === TRANSACTION_STATUS.ERROR)
			open(MODAL_ROUTE.ERROR, { message: 'transaction_failed' });
	}, [formState.status, open]);

	const newSoul: Soul = {
		id: -1,
		name: formState.name,
		dates: {
			dobDay: formState.dobDay,
			dobMonth: formState.dobMonth,
			dobYear: formState.dobYear,
			dodDay: formState.dodDay,
			dodMonth: formState.dodMonth,
			dodYear: formState.dodYear
		},
		bio: formState.bio,
		isDeleted: false
	};

	return (
		<>
			<PendingNameWrapper>
				<PersonDetails soul={newSoul} isPending={true} />
			</PendingNameWrapper>
			<Loader extraTopMargin={true} />
			<TextSecondary>
				{t('please_confirm_transaction')}
			</TextSecondary>
		</>
	);
};

export default AddPending;
