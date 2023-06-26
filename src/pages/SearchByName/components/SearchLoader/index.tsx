import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { NothingFound } from '../../../../theme/elements';
import { Loader } from '../../../../components/Loader';
import { WithChildren } from '../../../../constants/types';
import { useAppSelector } from '../../../../state/hooks';
import {
	selectSoulLoading,
	selectSoulSearchByNameTotal
} from '../../../../state/soul/slice';

interface SearchLoaderProps extends WithChildren {
	name: string;
}

export const SearchByNameLoader: React.FC<SearchLoaderProps> = memo(({ children, name }) => {
	const { t } = useTranslation();
	const isLoading = useAppSelector(selectSoulLoading);
	const total = useAppSelector(state => selectSoulSearchByNameTotal(state, name));

	if (total === undefined && isLoading) return (<Loader />);
	if (total === undefined) return null;
	if (total === 0) return (<NothingFound>{t('nothing_found')}</NothingFound>);

	return (
		<>
			{children}
		</>
	);
});

export default SearchByNameLoader;