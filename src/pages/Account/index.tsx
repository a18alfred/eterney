import React, { memo, MouseEvent, useEffect } from 'react';
import { selectUserAddress, selectUserChain, selectUserConnected, submissions_reset } from '../../state/user/slice';
import { disconnectUser } from '../../context/web3/web3';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { truncate } from '../../utils/helpers';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { lightBorder } from '../../theme/colors';
import AvatarIcon from '../../components/AvatarIcon';
import useModal from '../../hooks/useModal';
import { ModalProps } from '../../state/modal/types';
import { MODAL_ROUTE } from '../../constants/routing';
import { TextButton, TextButtonWithBorder } from '../../theme/elements';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { clear_name_transaction, selectSoulNewName } from '../../state/soul/slice';
import { TRANSACTION_STATUS } from '../../constants/settings';

const AccountContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border: 1px solid ${lightBorder};
  border-radius: 18px;
  padding: 1rem;
  margin-top: 0.5rem;
  gap: 1rem;

  @media (max-width: 375px) {
    font-size: clamp(0.75rem, -0.7045rem + 7.2727vw, 1rem);
  }
`;

const AccountControl = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -6px;
`;


const AccountAddress = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.5rem;

  @media (max-width: 375px) {
    font-size: clamp(1rem, -1.9091rem + 14.5455vw, 1.5rem);
  }
`;

const Account: React.FC<ModalProps> = memo(() => {
	const connected = useAppSelector(selectUserConnected);
	const address = useAppSelector(selectUserAddress);
	const formState = useAppSelector(selectSoulNewName);
	const { chainName } = useAppSelector(selectUserChain);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const { close } = useModal();
	const { open } = useModal();

	const onDisconnect = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await disconnectUser();
	};

	const onMemoryWall = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (formState.status === TRANSACTION_STATUS.PENDING) {
			dispatch(submissions_reset());
			dispatch(clear_name_transaction());
		}
		open(MODAL_ROUTE.ACCOUNT_NAMES);
	};

	useEffect(() => {
		if (!connected) close();
	}, [close, connected]);

	if (!connected) return null;

	return (
		<AccountContainer>
			<p>{t('connected_to')} {chainName}</p>
			<AccountAddress>
				<AvatarIcon isButton={false} />
				{truncate(address, 13)}
			</AccountAddress>
			<AccountControl>
				<TextButton onClick={onMemoryWall}>
					<ExitToAppIcon />
					{t('account_names')}
				</TextButton>
				<TextButtonWithBorder onClick={onDisconnect}>
					{t('disconnect')}
				</TextButtonWithBorder>
			</AccountControl>
		</AccountContainer>
	);
});

export default Account;
