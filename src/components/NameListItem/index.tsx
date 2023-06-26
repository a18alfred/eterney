import React, { memo, MouseEvent } from 'react';
import styled from 'styled-components';
import { lightGreyBg } from '../../theme/colors';
import { selectSoulById } from '../../state/soul/slice';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../state/hooks';
import useModal from '../../hooks/useModal';
import { MODAL_ROUTE } from '../../constants/routing';

interface DeletedName {
	isDeleted: boolean;
}

const NameItemWrapper = styled.li<DeletedName>`
  display: flex;
  flex-direction: column;
  padding: 8px;
  text-transform: uppercase;
  cursor: ${(props) => props.isDeleted ? 'default' : 'pointer'};
  width: 100%;
  text-decoration: ${(props) => props.isDeleted ? 'line-through' : 'none'};

  @media (hover: hover) {
    :hover {
      background: ${(props) => props.isDeleted ? 'transparent' : lightGreyBg};
    }
  }
`;

const DatesRow = styled.p`
  font-size: 12px;
`;

const NameRow = styled.p`
  word-break: break-word;
  margin-bottom: 0.3rem;
`;

interface NameListItemProps {
	id: number;
}

const NameListItem = memo(({ id }: NameListItemProps) => {
	const { t } = useTranslation();
	const soul = useAppSelector(state => selectSoulById(state, id));
	const { open } = useModal();

	if (!soul) return null;

	const handleClick = (e: MouseEvent<HTMLLIElement>) => {
		e.preventDefault();
		if (!soul.isDeleted) open(MODAL_ROUTE.NAME_DETAILS, { id });
	};

	return (
		<NameItemWrapper onClick={handleClick} isDeleted={soul.isDeleted}>
			<NameRow>
				{soul.name}
			</NameRow>
			{!soul.isDeleted && soul.dates &&
				<DatesRow>
					{('0' + soul.dates.dobDay).slice(-2)}.
					{('0' + soul.dates.dobMonth).slice(-2)}.
					{soul.dates.dobYear} - {('0' + soul.dates.dodDay).slice(-2)}.
					{('0' + soul.dates.dodMonth).slice(-2)}.
					{soul.dates.dodYear} | {t('#')}{soul.id}
				</DatesRow>
			}
		</NameItemWrapper>
	);
});

export default NameListItem;
