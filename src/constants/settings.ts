import { FontSizesList } from './types';
import { Unit } from 'wagmi';

export const NAME_APPEARANCE: number = 6; // in seconds
export const NAME_SPEED_LOOP: number = 75; // in seconds
export const NUMBER_OF_RANDOMS: number = 120;
export const RESULTS_PER_PAGE: number = 120;
export const FETCH_RETRIES: number = 3;
export const FETCH_RETRY_DELAY: number = 3000; // 3 seconds

export const NAME_MAX_CHAR: number = 250;
export const BIO_MAX_CHAR: number = 1400;

export const NETWORK: { name: string, id: number } = {
	name: 'homestead',
	id: 1
};

export const NETWORK_TEST: { name: string, id: number } = {
	name: 'goerli',
	id: 5
};

export enum MENU_MODES {
	CLOSE = 'close',
	MAIN = 'main',
	LANGUAGE = 'language',
	FONT_SIZE = 'font_size'
};

export const FONT_SIZES: FontSizesList = {
	SMALL: {
		name: 'small',
		size: '7px',
		collisionSize: '7px',
		key: 'SMALL'
	},
	MEDIUM: {
		name: 'medium',
		size: '9px',
		collisionSize: '9px',
		key: 'MEDIUM'
	},
	LARGE: {
		name: 'large',
		size: '11px',
		collisionSize: '11px',
		key: 'LARGE'
	}
};

export const GLOBAL_CALC_UNIT: Unit = 'ether';

export enum TRANSACTION_STATUS {
	NEW,
	PENDING,
	SUCCESS,
	ERROR
};