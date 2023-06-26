import React, { memo } from 'react';
import styled from 'styled-components';
import { mainText, mainTextInverted } from '../../theme/colors';
import { WithChildren } from '../../constants/types';
import { InfinitySpin } from 'react-loader-spinner';
import { Soul } from '../../state/soul/types';
import { useTranslation } from 'react-i18next';
import { NothingFound } from '../../theme/elements';

const SearchLoaderWrapper = styled.div<{ extraTopMargin?: boolean }>`
  display: flex;
  width: 100%;
  justify-content: center;

  svg {
    height: 60px;
    width: auto;
    margin: ${({ extraTopMargin }) => extraTopMargin ? '-8px' : '-15px'} 0 -15px 0;
  }
`;

interface LoaderProps {
	light?: boolean;
	extraTopMargin?: boolean;
}

export const Loader = ({ light, extraTopMargin }: LoaderProps) => {
	return (
		<SearchLoaderWrapper extraTopMargin={extraTopMargin}>
			<InfinitySpin
				width='200'
				color={light ? mainTextInverted : mainText}
			/>
		</SearchLoaderWrapper>
	);
};

interface SearchLoaderProps extends WithChildren {
	isLoading: boolean;
	soul: Soul | undefined;
	nothingMessage?: boolean;
}

export const SearchLoader: React.FC<SearchLoaderProps> = memo(({ children, isLoading, soul, nothingMessage }) => {
	const { t } = useTranslation();
	if (isLoading) return (<Loader />);
	if (!soul && nothingMessage) return (<NothingFound>{t('nothing_found')}</NothingFound>);
	if (!soul) return null;
	if (soul?.isDeleted) return (<NothingFound>{t('deleted')}</NothingFound>);
	return (
		<>
			{children}
		</>
	);
});

interface ValueLoaderProps extends WithChildren {
	value: string;
	light?: boolean;
}

export const ValueLoader: React.FC<ValueLoaderProps> = ({ children, value, light }) => {
	if (!value) return (
		<Loader light={light} />
	);
	return (
		<>
			{children}
		</>
	);
};
