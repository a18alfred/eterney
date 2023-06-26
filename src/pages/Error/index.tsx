import React from 'react';
import styled from 'styled-components';
import { CancelIconStyled } from '../../components/IconsStyled';
import { ModalProps } from '../../state/modal/types';
import useModal from '../../hooks/useModal';
import { useTranslation } from 'react-i18next';

const ModalMiddle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Error: React.FC<ModalProps> = ({ message }) => {
	const { t } = useTranslation();
	const { close } = useModal();

	if (!message) {
		close();
		return null;
	}

	return (
		<>
			<ModalMiddle>
				<CancelIconStyled />
				{t(message)}
			</ModalMiddle>
		</>
	);
};

export default Error;
