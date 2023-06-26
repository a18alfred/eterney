import React from 'react';
import { useAppSelector } from '../../../../state/hooks';
import { Loader } from '../../../../components/Loader';
import styled from 'styled-components';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { useEterney } from '../../../../hooks/useEterney';
import {
	selectSoulLoading,
	selectSoulSearchByNameHasMore
} from '../../../../state/soul/slice';

const LoaderElement = styled.li`
  width: 100%;
`;

interface SearchInfiniteLoaderProps {
	name: string;
}

const SearchInfiniteLoader = ({ name }: SearchInfiniteLoaderProps) => {
	const isLoading = useAppSelector(selectSoulLoading);
	const { findByName } = useEterney();
	const hasMore = useAppSelector(state => selectSoulSearchByNameHasMore(state, name));
	const loader = useInfiniteScroll({
		isLoading,
		hasMore,
		fetchMore: findByName,
		fetchArgs: [name]
	});

	return (
		<LoaderElement ref={loader}>
			{hasMore && <Loader extraTopMargin={true} />}
		</LoaderElement>
	);
};

export default SearchInfiniteLoader;
