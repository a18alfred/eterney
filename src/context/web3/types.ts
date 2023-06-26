import { Contract } from '@ethersproject/contracts';
import { MutableRefObject } from 'react';

export interface Network {
	[key: number]: { events: {}; links: {}; address: string; transactionHash: string; };
}

export interface Web3ContextState {
	eterneyInstance: MutableRefObject<Contract | undefined>;
	eterneyReadOnly: MutableRefObject<Contract | undefined>;
}