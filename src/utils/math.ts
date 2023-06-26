import calculateSize from 'calculate-size';
import {SoulById } from '../state/soul/types';

interface BoxPosition {
	x: number;
	y: number;
	x1: number;
	y1: number;
}

export interface BoxPositionIndexed extends BoxPosition {
	index: number;
}

export const getRandomInt = (min: number, max: number): number => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
};

export const intersects = (a: BoxPosition, b: BoxPosition): boolean => {
	if (a.y > b.y1 || a.y1 < b.y) return false;
	return !(a.x1 < b.x || a.x > b.x1);
};

interface GetPositionsProps {
	nameIds: number[];
	cachedSoulsById: SoulById;
	width: number;
	height: number;
	fontSize: string;
}


export const getPositions = ({
								 nameIds,
								 cachedSoulsById,
								 width,
								 height,
								 fontSize
							 }: GetPositionsProps): BoxPositionIndexed[] => {
	let positions: BoxPositionIndexed[] = [];

	const oneLineHeight = calculateSize('O', {
		font: 'Roboto',
		fontSize: fontSize
	}).height;

	nameIds.forEach((value) => {
		let randomizing = true;
		let x: number, y: number;
		const name = cachedSoulsById[value];
		let tempDateString = '';
		if (name.dates) tempDateString = name.dates.dobYear + ' - ' + name.dates.dodYear;
		const longerString = name.name.length > tempDateString.length ? name.name : tempDateString;

		const size = calculateSize(longerString, {
			font: 'Roboto',
			fontSize: fontSize
		});
		let finalWidth = size.width;
		let finalHeight = oneLineHeight;

		let pos: BoxPositionIndexed | undefined;
		let counter = 0;

		if (size.width > 175) {
			const breakLines = Math.ceil(size.width / 320) * 2;
			finalHeight = finalHeight * breakLines;
			finalWidth = 175;
		}

		while (randomizing && counter < 100) {
			x = getRandomInt(20, width - finalWidth - 30);
			y = getRandomInt(10, height - (finalHeight + oneLineHeight * 2) - 10);
			pos = {
				index: value,
				x: x,
				y: y,
				x1: x + finalWidth + 30,
				y1: y + (finalHeight + oneLineHeight * 2) + 11
			};

			randomizing = false;
			for (let p of positions) {
				if (intersects(p, pos)) {
					randomizing = true;
					break;
				}
			}

			counter++;
		}

		if (!randomizing) {
			if (pos) positions.push(pos);
		}
	});
	return positions;
};