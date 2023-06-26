import React, { memo } from 'react';
import SearchByNameLoader from '../SearchLoader';
import SearchInfiniteLoader from '../SearchInfiniteLoader';
import styled from 'styled-components';
import SearchList from '../SearchList';

interface SearchResultsProps {
	name: string;
}

const SearchResultWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: -0.5rem;
  max-height: 270px;
`;

const SearchResults = memo(({ name }: SearchResultsProps) => {
	if (!name) return null;
	return (
		<SearchByNameLoader name={name}>
			<SearchResultWrapper>
				<SearchList name={name} />
				<SearchInfiniteLoader name={name} />
			</SearchResultWrapper>
		</SearchByNameLoader>
	);
});

export default SearchResults;
