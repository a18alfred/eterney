import React, { useState, MouseEvent } from 'react';
import { getRandomInt } from '../utils/math';
import styled from 'styled-components';
import { LoremIpsum } from 'lorem-ipsum';
import { unixToDate } from '../utils/helpers';
import { useWeb3Modal } from '@web3modal/react';
import { useWeb3 } from '../context/web3/web3';
import { selectUser } from '../state/user/slice';
import { useAppSelector } from '../state/hooks';

const lorem = new LoremIpsum({
	sentencesPerParagraph: {
		max: 8,
		min: 4
	},
	wordsPerSentence: {
		max: 16,
		min: 4
	}
});

const TestingLayer = styled.div`
  z-index: 100;
  position: fixed;
`;

const BStyled = styled.button`
  z-index: 100;
  background: white;
  color: black;
`;

const Testing = () => {
	const { open } = useWeb3Modal();
	const { eterneyInstance } = useWeb3();
	const { address } = useAppSelector(selectUser);
	const [inputField, setInputField] = useState('');

	const add = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		for (let i = 0; i < 60; i++) {
			let random = require('random-name');
			const name = random().toString();
			const bio = lorem.generateParagraphs(1);

			const dob = getRandomInt(0, 1642779308);
			const dod = getRandomInt(dob, 1642779308);
			const dates = unixToDate(dob) + '.' + unixToDate(dod);
			if (eterneyInstance.current)
				eterneyInstance.current.addPerson(name, dates, bio, { from: address, value: '2000000000000000' });
		}
	};

	const connectAccount = () => {
		open();
	};

	return (
		<TestingLayer>
			<BStyled onClick={connectAccount}>Connect</BStyled>
			<BStyled onClick={add}>Add</BStyled>
			<input
				type='text'
				value={inputField}
				onChange={e => setInputField(e.target.value)}
			/>
		</TestingLayer>
	);
};

export default Testing;
