import { MouseEvent } from 'react';
import styled, { css } from 'styled-components';
import { mainText } from '../../../../theme/colors';
import { useTranslation } from 'react-i18next';
import LoginIcon from '@mui/icons-material/Login';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import useModal from '../../../../hooks/useModal';
import useInstall from '../../../../hooks/useInstall';
import { LightButton } from '../../../../theme/elements';

const Description = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const sharedStyles = css`
  height: 20px !important;
  width: 20px !important;
  padding: 5px;
  border-radius: 50%;
  border: 2px solid ${mainText};
  outline: none;
  background: transparent;
  margin-right: 1rem;
`;
const LoginIconStyled = styled(LoginIcon)`${sharedStyles}`;
const AddIconStyled = styled(AddIcon)`${sharedStyles}`;
const MenuMoreIcon = styled(MoreHorizIcon)`${sharedStyles}`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Guide = () => {
	const { t } = useTranslation();
	const { install, isInstallable } = useInstall();
	const { close } = useModal();

	const onGetStarted = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		close();
	};

	const onInstall = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		install();
	};

	return (
		<>
			<Description>
				{t('guide_description')}
			</Description>
			<Description>
				{t('there_are_control')}
			</Description>
			<Description>
				<LoginIconStyled />
				{t('click_to_connect')}
			</Description>
			<Description>
				<AddIconStyled />
				{t('click_to_add')}
			</Description>
			<Description>
				<MenuMoreIcon />
				{t('click_to_menu')}
			</Description>
			<Description>
				{t('inquiries_support')} support@eterney.com
			</Description>
			<ButtonWrapper>
				<LightButton onClick={onGetStarted}>
					{t('get_started')}
				</LightButton>
				{isInstallable &&
					<LightButton onClick={onInstall}>
						{t('install_app')}
					</LightButton>
				}
			</ButtonWrapper>
		</>
	);
};

export default Guide;
