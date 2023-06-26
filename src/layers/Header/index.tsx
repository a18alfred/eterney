import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import AccountButton from '../../components/AccountButton';
import Menu from '../../components/Menu';
import AddButton from '../../components/AddButton';
import { ReactComponent as LogoWhite } from '../../assets/images/logo_white.svg';
import useModal from '../../hooks/useModal';
import { MODAL_ROUTE } from '../../constants/routing';
import { HeaderLogoWrapper } from '../../theme/elements';

const HeaderContainer = styled.div`
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 50;
`;

const ControlWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0.5rem;
`;

const Header = () => {
	const { open } = useModal();

	const onAboutOpen = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		open(MODAL_ROUTE.WELCOME);
	};

	return (
		<HeaderContainer>
			<HeaderLogoWrapper onClick={onAboutOpen}>
				<LogoWhite />
			</HeaderLogoWrapper>
			<ControlWrapper>
				<AddButton />
				<AccountButton />
				<Menu />
			</ControlWrapper>
		</HeaderContainer>
	);
};

export default Header;
