import React from 'react';
import styled from 'styled-components';
import { SuccessIconStyled } from '../../components/IconsStyled';
import { ModalProps } from '../../state/modal/types';
import useModal from '../../hooks/useModal';
import { useTranslation } from 'react-i18next';

const ModalMiddle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  margin: 1rem 0;
  font-weight: 800;
`;

const Success: React.FC<ModalProps> = ({ message }) => {
	const { t } = useTranslation();
	const { close } = useModal();

	if (!message) {
		close();
		return null;
	}

	return (
		<>
			<ModalMiddle>
				<SuccessIconStyled />
				{t(message)}
			</ModalMiddle>
		</>
	);
};

export default Success;
