import React, { MouseEvent } from 'react';
import Identicon, { IdenticonOptions } from 'identicon.js';
import styled from 'styled-components';
import { headerBtnBg, headerBtnBgHover, mainText } from '../../theme/colors';
import { selectUserAddress } from '../../state/user/slice';
import { useAppSelector } from '../../state/hooks';

const options: IdenticonOptions = {
	foreground: [51, 51, 51, 255],
	background: [0, 0, 0, 0],
	margin: 0,
	size: 420,
	format: 'svg'
};

const optionsButton: IdenticonOptions = {
	foreground: [255, 255, 255, 255],
	background: [0, 0, 0, 0],
	margin: 0,
	size: 420,
	format: 'svg'
};

const IdIcon = styled.img`
  height: 15px !important;
  width: 15px !important;
  padding: 2px;
  border-radius: 50%;
  margin-right: 0.5rem;
  outline: none;
  border: 2px solid ${mainText};
  background: transparent;
`;

const IdIconButton = styled.img`
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

interface AvatarIconProps {
	isButton: boolean;
	clickHandler?: (e: MouseEvent<HTMLImageElement>) => void;
}

const AvatarIcon = ({ isButton, clickHandler }: AvatarIconProps) => {
	const address = useAppSelector(selectUserAddress);
	if (!address) return null;
	const icon = `data:image/svg+xml;base64,${new Identicon(address, isButton ? optionsButton : options).toString()}`;

	if (isButton) return (
		<IdIconButton
			src={icon}
			onClick={clickHandler}
		/>
	);

	return (
		<IdIcon
			src={icon}
		/>
	);
};

export default AvatarIcon;
