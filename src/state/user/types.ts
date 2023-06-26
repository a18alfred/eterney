import { ErrorType } from '../../constants/types';

export interface User {
	isLoading: boolean;
	address: `0x${string}` | undefined;
	connected: boolean;
	chainId: number;
	chainName: string;
	isAdmin: boolean;
	fee: string;
	numberOfNames: number;
	currentPage: number,
	hasMore: boolean,
	isFetched: boolean;
	userNameIds: number[];
	error: ErrorType;
}

export interface UserConnectedPayloadAction {
	address: `0x${string}` | undefined;
	chainId: number;
	chainName: string;
}

export interface ErrorReportedPayloadAction {
	error: string;
}