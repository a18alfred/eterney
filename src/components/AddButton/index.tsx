import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import { selectUserConnected } from '../../state/user/slice';
import { headerBtnBg, headerBtnBgHover } from '../../theme/colors';
import useModal from '../../hooks/useModal';
import { MODAL_ROUTE } from '../../constants/routing';
import { useAppSelector } from '../../state/hooks';

const AddIconStyled = styled(AddIcon)`
  color: ${headerBtnBg};
  cursor: pointer;
  height: 20px !important;
  width: 20px !important;
  padding: 5px;
  border-radius: 50%;
  border: 2px solid ${headerBtnBg};
  outline: none;
  background: transparent;
  margin-right: 0.5rem;

  @media (hover: hover) {
    :hover {
      color: ${headerBtnBgHover};
      border: 2px solid ${headerBtnBgHover};
    }
  }
`;

const AddButton = () => {
	const connected = useAppSelector(selectUserConnected);
	const { open } = useModal();

	
	const onAdd = (e: MouseEvent<SVGSVGElement>) => {
		e.preventDefault();
		open(MODAL_ROUTE.ADD_NAME);
	};

	if (!connected) return null;

	return (
		<AddIconStyled onClick={onAdd} />
	);
};

export default AddButton;
