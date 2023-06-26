import React, { Dispatch, SetStateAction, MouseEvent } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { lightBorder, mainText, mainTextHover } from '../../../../theme/colors';
import { scrollToTop } from '../../../../utils/helpers';

interface Visible {
	isVissible: boolean;
}

const WelcomeSelectorContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 4fr;
  justify-content: center;
  margin: 0.5rem 0;
`;

const BackWrapper = styled.div<Visible>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 0.5rem;
  cursor: pointer;
  color: ${mainText};
  visibility: ${(props) => props.isVissible ? 'visible' : 'hidden'};

  @media (hover: hover) {
    :hover {
      color: ${mainTextHover};
    }
  }
`;

const ForwardWrapper = styled.div<Visible>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 0.5rem;
  cursor: pointer;
  color: ${mainText};
  visibility: ${(props) => props.isVissible ? 'visible' : 'hidden'};

  @media (hover: hover) {
    :hover {
      color: ${mainTextHover};
    }
  }
`;

const MiddleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;

const ArrowBackStyled = styled(ArrowBackIosIcon)`
  height: 18px !important;
`;

const ArrowForwardStyled = styled(ArrowForwardIosIcon)`
  height: 18px !important;
`;

const Circle = styled.span<{ isSelected: boolean }>`
  border-radius: 50%;
  background: ${(props) => props.isSelected ? mainText : lightBorder};
  height: 12px;
  width: 12px;
`;

const BtnText = styled.span`
`;

interface WelcomeSelectorProps {
	isGuide: boolean;
	setIsGuide: Dispatch<SetStateAction<boolean>>;
}

const WelcomeSelector = ({ isGuide, setIsGuide }: WelcomeSelectorProps) => {
	const { t } = useTranslation();

	const toddle = (e: MouseEvent<HTMLDivElement>) => {
		setIsGuide(prev => !prev);
		scrollToTop('modalContentWrapper');
	};

	return (
		<WelcomeSelectorContainer>
			<BackWrapper onClick={toddle} isVissible={isGuide}>
				<ArrowBackStyled />
				<BtnText>
					{t('about')}
				</BtnText>
			</BackWrapper>
			<MiddleWrapper>
				<Circle isSelected={!isGuide} />
				<Circle isSelected={isGuide} />
			</MiddleWrapper>
			<ForwardWrapper onClick={toddle} isVissible={!isGuide}>
				<BtnText>
					{t('guide')}
				</BtnText>
				<ArrowForwardStyled />
			</ForwardWrapper>
		</WelcomeSelectorContainer>
	);
};

export default WelcomeSelector;
