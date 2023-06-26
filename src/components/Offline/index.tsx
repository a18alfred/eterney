import React from 'react';
import styled from 'styled-components';
import { ReactComponent as OfflineLogo } from '../../assets/images/offline.svg';
import { useTranslation } from 'react-i18next';
import { mainText } from '../../theme/colors';

const OfflineContainer = styled.div`
  display: grid;
  place-items: center;
  height: 95vh;
`;

const OfflineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  min-height: 126px;
`;

const OfflineLogoWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;

  svg {
    height: 80px;
    width: 100%;
  }
`;

const OfflineText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${mainText};
`;

const Offline = () => {
	const { t } = useTranslation();
	return (
		<OfflineContainer>
			<OfflineWrapper>
				<OfflineLogoWrapper>
					<OfflineLogo />
				</OfflineLogoWrapper>
				<OfflineText>
					{t('offline')}
				</OfflineText>
			</OfflineWrapper>
		</OfflineContainer>
	);
};

export default Offline;
