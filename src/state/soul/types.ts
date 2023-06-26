import { TRANSACTION_STATUS } from '../../constants/settings';

export interface SoulDates {
	dobDay: number;
	dobMonth: number;
	dobYear: number;
	dodDay: number;
	dodMonth: number;
	dodYear: number;
}

export interface Soul {
	id: number;
	name: string;
	dates: SoulDates | null;
	bio: string;
	isDeleted: boolean;
}

export interface SoulById {
	[key: number]: Soul;
}

export interface Search {
	ids: number[];
	currentPage: number;
	hasMore: boolean;
	totalFound: number;
}

export interface SearchByName {
	[key: string]: Search;
}

export interface SoulState {
	isLoading: boolean;
	isInitialized: boolean;
	total: number;
	randomIds: number[];
	cachedSoulsById: SoulById;
	search: SearchByName;
	currentSearch: string;
	newNameTransaction: NewNameTransaction;
}

export interface SoulResponseType {
	name: string;
	bio: string;
	dates: string;
}

export interface AddToCachedSouls {
	cachedSouls: SoulById;
}

export interface NewNameProps {
	name: string,
	dobDay: number,
	dobMonth: number,
	dobYear: number,
	dodDay: number,
	dodMonth: number,
	dodYear: number,
	bio: string,
}

export interface NewNameTransaction extends NewNameProps {
	status: TRANSACTION_STATUS;
}
