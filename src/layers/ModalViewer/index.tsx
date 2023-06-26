import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { appearance } from '../../theme/annimations';
import { isNode } from '../../utils/helpers';
import { MODAL_ROUTE, modalRoutes } from '../../constants/routing';
import { useAppSelector } from '../../state/hooks';
import { selectModal } from '../../state/modal/slice';
import useModal from '../../hooks/useModal';
import { ArrowBackStyled, CloseIconStyled } from '../../components/IconsStyled';
import { mainText } from '../../theme/colors';
import { scrollStyle } from '../../theme/style';
import { useTranslation } from 'react-i18next';
import { ModalOverlay } from '../../components/ModalOverlay';

const ModalContent = styled.div`
  box-sizing: border-box;
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 418px;
  min-width: 320px;
  min-height: 190px;
  max-height: 85vh;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 18px;
  padding: 1rem;
  background: white;
  overflow: hidden;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${appearance} 1s linear forwards;
  color: ${mainText};
`;

const FirstRow = styled.div<{ space?: boolean }>`
  display: flex;
  justify-content: ${(props) => props.space ? 'space-between' : 'flex-end'};
  align-items: center;
  margin-bottom: ${(props) => props.space ? '0.5rem' : '0'};
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 500;
`;

interface ContentWrapperProps {
	customGap?: string;
}

export const ModalContentWrapper = styled.div<ContentWrapperProps>`
  ${scrollStyle};
  display: flex;
  flex-direction: column;
  gap: ${({ customGap }) => customGap ? customGap : '1rem'};
  color: ${mainText};
  min-height: 135px;
`;

const ModalViewer = () => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const contentWrapperRef = useRef<HTMLDivElement>(null);
	const { currentModal, currentModalProps, history, currentIniScroll } = useAppSelector(selectModal);
	const { close, back, open } = useModal();
	const { t } = useTranslation();

	useEffect(() => {
		const handleClickOutside = ({ target }: MouseEvent) => {
			if (isNode(target))
				if (wrapperRef.current &&
					!wrapperRef.current.contains(target)) {
					close();
				}
		};
		document.addEventListener('mousedown', handleClickOutside);

		const seenWelcome = window.localStorage.getItem('eterney_seen_welcome');
		if (!seenWelcome) {
			open(MODAL_ROUTE.WELCOME);
			window.localStorage.setItem('eterney_seen_welcome', 'true');
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wrapperRef]);

	useEffect(() => {

		if (contentWrapperRef.current) {
			contentWrapperRef.current.scrollTop = currentIniScroll;
		}
	}, [currentModal, contentWrapperRef]);

	if (!currentModal) return null;

	const CurrentModal = modalRoutes[currentModal].component;
	const customName = modalRoutes[currentModal].customName;
	const noBack = !modalRoutes[currentModal].noBack;
	const isHistory = history.length > 1 && noBack;
	const title = customName ? t(customName) : t(currentModal);

	return (
		<>
			<ModalOverlay />
			<ModalContent ref={wrapperRef}>
				<FirstRow space={isHistory || !!title}>
					{isHistory &&
						<ArrowBackStyled onClick={back} fontSize={'medium'} />
					}
					{title &&
						<Title>
							{title}
						</Title>
					}
					<CloseIconStyled fontSize={'medium'} onClick={close} />
				</FirstRow>
				<ModalContentWrapper
					id={'modalContentWrapper'}
					customGap={modalRoutes[currentModal].customGap}
					ref={contentWrapperRef}
				>
					<CurrentModal {...currentModalProps} />
				</ModalContentWrapper>
			</ModalContent>
		</>
	);
};

export default ModalViewer;
