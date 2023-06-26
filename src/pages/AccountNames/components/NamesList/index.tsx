import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../state/hooks';
import { selectUserFetched, selectUserNameIds, selectUserNamesNumber } from '../../../../state/user/slice';
import styled from 'styled-components';
import { secondaryText } from '../../../../theme/colors';
import NameListItem from '../../../../components/NameListItem';

const EmptyList = styled.li`
  width: 100%;
  text-align: center;
  color: ${secondaryText};
`;

const NamesList = React.memo(() => {
	const { t } = useTranslation();
	const nameIds = useAppSelector(selectUserNameIds);
	const isFetched = useAppSelector(selectUserFetched);
	const total = useAppSelector(selectUserNamesNumber);
	const nameElements = [];


	for (let id of nameIds) {
		nameElements.push(
			<NameListItem
				key={id}
				id={id}
			/>
		);
	}

	if (isFetched && total === 0) return (
		<EmptyList>
			{t('its_empty')}
		</EmptyList>
	);

	return (
		<>
			{nameElements}
		</>
	);
});

export default NamesList;
