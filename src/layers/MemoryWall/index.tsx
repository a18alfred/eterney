import React, { MouseEvent, useMemo, ReactNode } from 'react';
import { selectRandomIds, selectSoulCached } from '../../state/soul/slice';
import styled from 'styled-components';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { getPositions } from '../../utils/math';
import { selectUserConnected, selectUserNameIds } from '../../state/user/slice';
import { memoryWallName, memoryWallNameHover } from '../../theme/colors';
import useFontSize from '../../context/font/font';
import { shuffleArray } from '../../utils/helpers';
import { NAME_APPEARANCE, NUMBER_OF_RANDOMS, RESULTS_PER_PAGE } from '../../constants/settings';
import { useHistory } from 'react-router-dom';
import { appearance } from '../../theme/annimations';
import { useAppSelector } from '../../state/hooks';
import Names from './Names';

const NamesLayerContainer = styled.div`
  z-index: 1;
  animation: ${appearance} ${NAME_APPEARANCE}s linear forwards;
  overflow: hidden;
`;

interface NameObject {
	posx: number;
	posy: number;
	size: string;
}

const Name = styled.div.attrs<NameObject>(({ posx, posy, size }) => ({
	style: {
		left: `${posx}px`,
		top: `${posy}px`,
		fontSize: size,
		color: memoryWallName,
		background: 'transparent',
		textAlign: 'center',
		padding: '5px',
		position: 'absolute',
		transition: '300ms ease-in-out',
		lineHeight: '0.7rem',
		textTransform: 'uppercase',
		overflow: 'hidden',
		width: 'max-content',
		maxWidth: '175px',
		wordBreak: 'break-word',
		zIndex: 1,
		cursor: 'pointer'
	}
}))<NameObject>`
    :hover {
      color: ${memoryWallNameHover} !important;
      transform: scale(1.5);
      z-index: 2;
    }
`;

const MemoryWall = () => {
	const randomIds = useAppSelector(selectRandomIds);
	const cachedSoulsById = useAppSelector(selectSoulCached);
	const userNameIds = useAppSelector(selectUserNameIds);
	const connected = useAppSelector(selectUserConnected);
	const { height, width } = useWindowDimensions();
	const history = useHistory();
	const { size } = useFontSize();
	const memoryWall = connected ? userNameIds : randomIds;

	const nameIds = useMemo(() => {
		let ids: number[] = [];
		if (connected) {
			for (let id of memoryWall) {
				if (cachedSoulsById[id].dates !== null) {
					ids.push(id);
				}
			}
			if (ids.length > NUMBER_OF_RANDOMS) {
				ids = shuffleArray(ids);
			}
		} else {
			ids = randomIds;
		}
		return ids;
	}, [memoryWall]);

	const positions = useMemo(() => {
		return getPositions({
			nameIds,
			cachedSoulsById,
			width,
			height,
			fontSize: size.collisionSize
		});
	}, [nameIds, width, height, size]);

	const nameElements = useMemo(() => {
		let elements: ReactNode[] = [];
		for (let position of positions) {

			elements.push(
				<Name key={position.index}
					  posx={position.x}
					  posy={position.y}
					  size={size.size}
					  onClick={e => clickHandler(e, cachedSoulsById[position.index].id)}
				>
					<p>{cachedSoulsById[position.index].name}</p>
					<p>{cachedSoulsById[position.index].dates?.dobYear} - {cachedSoulsById[position.index].dates?.dodYear}</p>
				</Name>
			);
		}
		return (elements);
	}, [positions]);

	const clickHandler = (e: MouseEvent<HTMLDivElement>, id: number) => {
		e.preventDefault();
		history.push(`/${id}`);
	};

	if (nameIds.length === 0) return null;

	return (
		<NamesLayerContainer>
			<Names nameElements={nameElements} height={height} />
		</NamesLayerContainer>
	);
};

export default MemoryWall;
