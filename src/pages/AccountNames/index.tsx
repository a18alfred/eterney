import { ModalProps } from '../../state/modal/types';
import AccountInfiniteLoader from './components/AccountInfiniteLoader';
import styled from 'styled-components';
import NamesList from './components/NamesList';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../state/hooks';
import { selectUserConnected } from '../../state/user/slice';
import useModal from '../../hooks/useModal';

const AccountNamesWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-height: 410px;
`;

const AccountNames: React.FC<ModalProps> = () => {
	const connected = useAppSelector(selectUserConnected);
	const { close } = useModal();

	useEffect(() => {
		if (!connected) close();
	}, [close, connected]);

	if (!connected) return null;

	return (
		<AccountNamesWrapper>
			<NamesList />
			<AccountInfiniteLoader />
		</AccountNamesWrapper>
	);
};

export default AccountNames;
