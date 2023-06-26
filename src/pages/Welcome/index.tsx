import React, { useState } from 'react';
import AboutProject from './components/AboutProject';
import WelcomeSelector from './components/WelcomeSelector';
import Guide from './components/Guide';
import { ReactComponent as LogoBlack } from '../../assets/images/logo_black.svg';
import { ModalProps } from '../../state/modal/types';
import { LogoWrapper } from '../../theme/elements';

const Welcome: React.FC<ModalProps> = () => {
	const [isGuide, setIsGuide] = useState<boolean>(false);

	return (
		<>
			<LogoWrapper>
				<LogoBlack />
			</LogoWrapper>
			{
				isGuide
					? <Guide />
					: <AboutProject />
			}
			<WelcomeSelector isGuide={isGuide} setIsGuide={setIsGuide} />
		</>
	);
};

export default Welcome;
