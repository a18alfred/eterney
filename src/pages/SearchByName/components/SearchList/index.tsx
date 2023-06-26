import React from 'react';
import { useAppSelector } from '../../../../state/hooks';
import NameListItem from '../../../../components/NameListItem';
import { selectSoulSearchByNameIds } from '../../../../state/soul/slice';

interface SearchListProps {
	name: string;
}

const SearchList = ({ name }: SearchListProps) => {
	const ids = useAppSelector(state => selectSoulSearchByNameIds(state, name));
	const nameElements = [];

	for (let id of ids) {
		nameElements.push(
			<NameListItem
				key={id}
				id={id}
			/>
		);
	}

	return (
		<>
			{nameElements}
		</>
	);
};

export default SearchList;
