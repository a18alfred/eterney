import React, { Dispatch, SetStateAction } from 'react';
import { MENU_MODES } from '../../constants/settings';
import { useTranslation } from 'react-i18next';
import { selectUser } from '../../state/user/slice';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import FormatSizeOutlinedIcon from '@mui/icons-material/FormatSizeOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import styled from 'styled-components';
import { mainText, mainTextHover } from '../../theme/colors';
import { ToggleModalItem } from './index';
import useModal from '../../hooks/useModal';
import { MODAL_ROUTE } from '../../constants/routing';
import useInstall from '../../hooks/useInstall';
import { useAppSelector } from '../../state/hooks';

const LinkModalItemClick = styled.button`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 0.5rem;
  justify-content: space-between;
  color: ${mainText};
  text-decoration: none;
  border: none;
  outline: none;
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      color: ${mainTextHover};
    }
  }
`;

const ManuName = styled.div`
  margin-right: 0.5rem;
`;

interface MainMenuProps {
	setMenuMode: Dispatch<SetStateAction<MENU_MODES>>;
}

const MainMenu = ({ setMenuMode }: MainMenuProps) => {
	const { t } = useTranslation();
	const { isAdmin } = useAppSelector(selectUser);
	const { install, isInstallable } = useInstall();
	const { open } = useModal();

	const onSearchOpen = () => {
		setMenuMode(MENU_MODES.CLOSE);
		open(MODAL_ROUTE.SEARCH);
	};

	const onAboutOpen = () => {
		setMenuMode(MENU_MODES.CLOSE);
		open(MODAL_ROUTE.WELCOME);
	};

	const onAdminOpen = () => {
		setMenuMode(MENU_MODES.CLOSE);
		open(MODAL_ROUTE.ADMIN);
	};

	const onInstall = () => {
		setMenuMode(MENU_MODES.CLOSE);
		install();
	};

	return (
		<>
			<LinkModalItemClick onClick={onAboutOpen}>
				<ManuName>
					{t('about')}
				</ManuName>
				<InfoOutlinedIcon style={{ fontSize: 16, opacity: 0.6, marginTop: 2 }} />
			</LinkModalItemClick>
			<LinkModalItemClick onClick={onSearchOpen}>
				<ManuName>
					{t('search')}
				</ManuName>
				<SearchIcon style={{ fontSize: 16, opacity: 0.6, marginTop: 2 }} />
			</LinkModalItemClick>
			<ToggleModalItem onClick={(e) => {
				e.preventDefault();
				setMenuMode(MENU_MODES.FONT_SIZE);
			}}>
				<ManuName>{t('font_size')}</ManuName>
				<FormatSizeOutlinedIcon style={{ fontSize: 16, opacity: 0.6, marginTop: 2 }} />
			</ToggleModalItem>
			<ToggleModalItem onClick={(e) => {
				e.preventDefault();
				setMenuMode(MENU_MODES.LANGUAGE);
			}}>
				<ManuName>{t('language')}</ManuName>
				<LanguageOutlinedIcon style={{ fontSize: 16, opacity: 0.6, marginTop: 2 }} />
			</ToggleModalItem>
			{isInstallable &&
				<LinkModalItemClick onClick={onInstall}>
					<ManuName>
						{t('install_app')}
					</ManuName>
					<AppsOutlinedIcon style={{ fontSize: 16, opacity: 0.6, marginTop: 2 }} />
				</LinkModalItemClick>}
			{isAdmin &&
				<LinkModalItemClick onClick={onAdminOpen}>
					<ManuName>
						{t('admin_panel')}
					</ManuName>
					<AdminPanelSettingsIcon style={{ fontSize: 16, opacity: 0.6, marginTop: 2 }} />
				</LinkModalItemClick>}
		</>
	);
};

export default MainMenu;