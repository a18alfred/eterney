import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { getRandomInt } from '../../utils/math';
import { starsColor } from '../../theme/colors';
import { animStar } from '../../theme/annimations';


interface CanvasStyledProps {
	screenHeight: number;
	time: number;
}

const CanvasStyled = styled.canvas<CanvasStyledProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.width || 100}px;
  height: ${(props) => (props.height || 100)}px;
  animation: ${(props) => animStar(props.screenHeight)} ${(props) => props.time}s linear infinite;
`;

const Stars = () => {
	const { height, width } = useWindowDimensions();
	const smStars = (width > 1300 && height > 1000) ? 1100 : 700;
	const mdStars = (width > 1300 && height > 1000) ? 300 : 200;
	const lgStars = (width > 1300 && height > 1000) ? 150 : 100;
	const starsOne = useRef<HTMLCanvasElement | null>(null);
	const starsTwo = useRef<HTMLCanvasElement | null>(null);
	const starsThree = useRef<HTMLCanvasElement | null>(null);

	const drawStarOne = () => {
		const canvas = starsOne.current;
		if (!canvas) return;
		const context = canvas.getContext('2d');
		if (!context) return;
		context.beginPath();
		context.fillStyle = starsColor;

		for (let i = 0; i < smStars; i++) {
			const x = getRandomInt(1, width);
			const y = getRandomInt(1, height);
			context.fillRect(x, y, 1, 1);
			context.fillRect(x, y + height, 1, 1);

		}
		context.fill();
		context.closePath();
	};

	const drawStarTwo = () => {
		const canvas = starsTwo.current;
		if (!canvas) return;
		const context = canvas.getContext('2d');
		if (!context) return;
		context.beginPath();
		context.fillStyle = starsColor;

		for (let i = 0; i < mdStars; i++) {
			const x = getRandomInt(1, width);
			const y = getRandomInt(1, height);
			context.fillRect(x, y, 2, 2);
			context.fillRect(x, y + height, 2, 2);
		}

		context.fill();
		context.closePath();
	};

	const drawStarThree = () => {
		const canvas = starsThree.current;
		if (!canvas) return;
		const context = canvas.getContext('2d');
		if (!context) return;
		context.beginPath();
		context.fillStyle = starsColor;

		for (let i = 0; i < lgStars; i++) {
			const x = getRandomInt(1, width);
			const y = getRandomInt(1, height);
			context.moveTo(x, y);
			context.arc(x, y, 1.5, 0, 360);
			context.moveTo(x, y + height);
			context.arc(x, y + height, 1.5, 0, 360);
		}

		context.fill();
		context.closePath();
	};

	const refOne = useCallback((node: HTMLCanvasElement | null) => {
		starsOne.current = node;
		drawStarOne();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const refTwo = useCallback((node: HTMLCanvasElement) => {
		starsTwo.current = node;
		drawStarTwo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const refThree = useCallback((node: HTMLCanvasElement) => {
		starsThree.current = node;
		drawStarThree();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (starsOne.current !== null) {
			drawStarOne();
			drawStarTwo();
			drawStarThree();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [height, width]);

	return (
		<div>
			<CanvasStyled
				ref={refOne}
				height={height * 2}
				width={width}
				screenHeight={height}
				time={100}
			/>
			<CanvasStyled
				ref={refTwo}
				height={height * 2}
				width={width}
				screenHeight={height}
				time={150}
			/>
			<CanvasStyled
				ref={refThree}
				height={height * 2}
				width={width}
				screenHeight={height}
				time={200}
			/>
		</div>
	);
};

export default Stars;
