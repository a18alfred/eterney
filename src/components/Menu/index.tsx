import React, { useEffect, useRef, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styled from 'styled-components';
import { headerBtnBg, headerBtnBgHover, mainText, mainTextHover } from '../../theme/colors';
import { MENU_MODES } from '../../constants/settings';
import { appearance } from '../../theme/annimations';
import { isNode } from '../../utils/helpers';
import { MenuModalOverlay } from '../ModalOverlay';
import MainMenu from './MainMenu';
import FontMenu from './FontMenu';
import LanguageMenu from './LanguageMenu';

const MenuContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
  z-index: 1;
  overflow: hidden;
`;

const MenuMoreIcon = styled(MoreHorizIcon)`
  color: ${headerBtnBg};
  cursor: pointer;
  height: 20px !important;
  width: 20px !important;
  padding: 5px;
  border-radius: 50%;
  background: transparent;
  border: 2px solid ${headerBtnBg};
  outline: none;

  @media (hover: hover) {
    :hover {
      color: ${headerBtnBgHover};
      border: 2px solid ${headerBtnBgHover};
    }
  }
`;

const MenuModalContent = styled.div`
  position: fixed;
  top: 3.2rem;
  right: 0.5rem;
  min-width: 196px;
  max-height: 350px;
  width: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  padding: 0.5rem;

  z-index: 100;
  animation: ${appearance} 1s linear forwards;
`;

export const ToggleModalItem = styled.button`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 0.5rem;
  justify-content: space-between;
  color: ${mainText};
  text-decoration: none;
  border: none;
  outline: none;
  cursor: pointer;
  background: none;
  font-weight: 500;
  font-size: 16px;

  @media (hover: hover) {
    :hover {
      color: ${mainTextHover};
    }
  }
`;


const Menu = () => {
	const [menuMode, setMenuMode] = useState(MENU_MODES.CLOSE);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const onMore = (e: React.MouseEvent<SVGSVGElement>) => {
		e.preventDefault();
		setMenuMode(MENU_MODES.MAIN);
	};

	useEffect(() => {
		const handleClickOutside = ({ target }: MouseEvent) => {
			if (isNode(target))
				if (wrapperRef.current &&
					!wrapperRef.current.contains(target)) {
					setMenuMode(MENU_MODES.CLOSE);
				}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wrapperRef]);

	return (
		<MenuContainer>
			<MenuMoreIcon onClick={onMore} />
			{menuMode !== MENU_MODES.CLOSE &&
				<>
					<MenuModalOverlay />
					<MenuModalContent ref={wrapperRef}>
						{
							{
								'main': <MainMenu setMenuMode={setMenuMode} />,
								'language': <LanguageMenu close={() => setMenuMode(MENU_MODES.MAIN)} />,
								'font_size': <FontMenu close={() => setMenuMode(MENU_MODES.MAIN)} />

							}[menuMode]
						}
					</MenuModalContent>
				</>
			}
		</MenuContainer>
	);
};

export default Menu;

