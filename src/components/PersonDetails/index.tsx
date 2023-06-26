import React, { memo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useShare } from '../../hooks/useShare';
import { ShareIconStyled } from '../IconsStyled';
import { Helmet } from 'react-helmet-async';
import { Soul } from '../../state/soul/types';
import Delete from './delete';

const NameHeader = styled.h2<{ isDeleted: boolean }>`
  font-size: 18px;
  font-weight: 800;
  text-align: center;
  text-transform: uppercase;
  word-wrap: break-word;
  text-decoration: ${(props) => props.isDeleted ? 'line-through' : 'none'};
  padding: 0 1rem;
`;

const IdRow = styled.div<{ visible: boolean, space: boolean }>`
  display: ${(props) => props.visible ? 'flex' : 'none'};
  justify-content: ${(props) => props.space ? 'space-between' : 'center'};
  align-items: center;
  font-size: 18px;
  font-weight: 800;
  text-align: center;
  text-transform: uppercase;
  margin-top: auto;
`;

const DatesRow = styled.div`
  text-align: center;
  align-items: center;
  font-style: italic;
`;

const BioText = styled.p`
  text-align: center;
  white-space: pre-line;
  word-wrap: break-word;
  padding: 0 0.5rem;
`;


interface PersonDetailsProps {
	soul: Soul;
	isPending: boolean;
	isMainScreen?: boolean;
}

const PersonDetails = memo(({ soul, isPending, isMainScreen }: PersonDetailsProps) => {
	const { t } = useTranslation();
	const { onShare, canShare } = useShare();
	
	return (
		<>
			<Helmet>
				<title>{soul.name} | ETERNEY</title>
			</Helmet>
			<NameHeader isDeleted={soul.isDeleted}>
				{soul.name}
			</NameHeader>
			<DatesRow>
				{('0' + soul.dates?.dobDay).slice(-2)}.
				{('0' + soul.dates?.dobMonth).slice(-2)}.
				{soul.dates?.dobYear} - {('0' + soul.dates?.dodDay).slice(-2)}.
				{('0' + soul.dates?.dodMonth).slice(-2)}.
				{soul.dates?.dodYear}
			</DatesRow>
			<BioText>
				{soul.bio}
			</BioText>
			<IdRow visible={!isPending} space={canShare}>
				{canShare &&
					< ShareIconStyled
						onClick={(e) => onShare({
							e: e, name: soul.name,
							id: isMainScreen ? '' : soul.id
						})}
					/>
				}
				{t('#')}{soul?.id}
			</IdRow>
			<Delete soul={soul} isPending={isPending} />
		</>
	);
});

export default PersonDetails;
