import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import IosShareIcon from '@mui/icons-material/IosShare';
import { ReactComponent as LogoBlack } from '../../assets/images/logo_black.svg';
import { ModalProps } from '../../state/modal/types';
import { LogoWrapper } from '../../theme/elements';

const ShareIconStyled = styled(IosShareIcon)`
  margin-left: 0.2rem;
  padding-bottom: 3px;
`;

const TextWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  display: flex;
  align-items: center;
`;

const Dot = styled.span`
  &:after {
    content: "•";
    font-size: 24px;
  }

  margin-right: 0.5rem;
`;

const IosInstall: React.FC<ModalProps> = () => {
	const { t } = useTranslation();

	return (
		<>
			<LogoWrapper>
				<LogoBlack />
			</LogoWrapper>
			<Description>
				{t('to_install_this_app')}
			</Description>
			<TextWrapper>
				<Description>
					<Dot />{t('tap_the_share')}<ShareIconStyled />
				</Description>
				<Description>
					<Dot />{t('then_find_and_tap')}
				</Description>
			</TextWrapper>
		</>
	);
};

export default IosInstall;
