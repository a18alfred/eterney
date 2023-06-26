import { MODAL_ROUTE } from './routing';
import React from 'react';
import { ModalProps } from '../state/modal/types';

export type ErrorType = string | null

export type WithChildren = {
	children?: React.ReactNode
};

export type FontSize = {
	name: string,
	size: string,
	collisionSize: string,
	key: string
}


export type FontSizesList = {
	[key: string]: FontSize
}

export type HEX = `#${string}`;

export type Routes = {
	[key in MODAL_ROUTE]: {
		component: React.FC<ModalProps>
		customName?: string
		noBack?: boolean
		customGap?: string
	}
};
