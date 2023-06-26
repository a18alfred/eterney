import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRandomInt } from '../../utils/math';
import { NUMBER_OF_RANDOMS, RESULTS_PER_PAGE, TRANSACTION_STATUS } from '../../constants/settings';
import { customRace, destructNamesAndIds, getDates, retryableFetch } from '../../utils/helpers';
import { NewNameTransaction, AddToCachedSouls, Search, Soul, SoulById, SoulState, NewNameProps } from './types';
import { getDemoNamesV2 } from '../../utils/demo';
import { Contract } from '@ethersproject/contracts';
import { RootState, ThunkApi } from '../index';
import { fetchUserNames, submissions_reset } from '../user/slice';

const newNameInitialState: NewNameTransaction = {
	name: '',
	dobDay: 0,
	dobMonth: 0,
	dobYear: 0,
	dodDay: 0,
	dodMonth: 0,
	dodYear: 0,
	bio: '',
	status: TRANSACTION_STATUS.NEW
};

const initialState: SoulState = {
	isLoading: true,
	isInitialized: false,
	total: 0,
	randomIds: [],
	cachedSoulsById: {},
	search: {},
	currentSearch: '',
	newNameTransaction: newNameInitialState
};

interface FetchRandomSoulsPayload {
	eterneyReadOnly: Contract;
}

interface FetchRandomSoulsResult {
	total: number;
	soulIds: number[];
	cachedSouls: SoulById;
}

export const fetchRandomSouls = createAsyncThunk<FetchRandomSoulsResult, FetchRandomSoulsPayload, ThunkApi>(
	'soul/fetchRandomSouls',
	async (props) => {
		const { eterneyReadOnly } = props;

		const total = Number(await retryableFetch(eterneyReadOnly.peopleCount));

		const amount = total > NUMBER_OF_RANDOMS ? NUMBER_OF_RANDOMS : total;
		const idsToFetch: number[] = [];
		while (idsToFetch.length < amount) {
			const random = getRandomInt(0, total);
			if (!idsToFetch.includes(random)) {
				idsToFetch.push(random);
			}
		}

		const response = await retryableFetch(eterneyReadOnly.getPeopleByIds, idsToFetch);

		const { soulIds, cachedSouls } = destructNamesAndIds(response, idsToFetch, true);

		// Dummy names *************************************
		let initialDummyId = 1024555;
		const dummy = getDemoNamesV2(initialDummyId, NUMBER_OF_RANDOMS - total);
		//**************************************************
		return {
			total: total,
			soulIds: [...soulIds, ...dummy.ids],
			cachedSouls: { ...cachedSouls, ...dummy.souls }
		};
	}
);

interface FetchByIdPayload {
	eterneyReadOnly: Contract;
	id: number;
}

interface FetchByIdResult {
	soul: Soul | undefined;
}

export const fetchById = createAsyncThunk<FetchByIdResult, FetchByIdPayload, ThunkApi>(
	'soul/fetchById',
	async (props, { dispatch }) => {
		const { eterneyReadOnly, id } = props;
		const response = await retryableFetch(eterneyReadOnly.getPeopleByIds, [id]);
		const dates = getDates(response[0].dates);

		let soul: Soul | undefined;
		if (dates) {
			soul = {
				id: id,
				name: response[0].name,
				bio: response[0].bio,
				dates: dates,
				isDeleted: false
			};
		}
		return {
			soul: soul
		};
	}
);

interface FetchByNamePayload {
	eterneyReadOnly: Contract;
	name: string;
}

export const fetchByName = createAsyncThunk<Search, FetchByNamePayload, ThunkApi>(
	'soul/fetchByName',
	async (props, { dispatch, getState }) => {
		const { eterneyReadOnly, name } = props;
		const search = getState().soul.search[name];
		const hasMore = search ? search.hasMore : true;


		if (!hasMore) {
			return {
				totalFound: search.totalFound,
				ids: [],
				currentPage: search.currentPage,
				hasMore: hasMore
			};
		}

		const page = search ? search.currentPage + 1 : 1;

		const {
			totalAmountOfSubmissions,
			submissions,
			ids
		} = await retryableFetch(
			eterneyReadOnly.getUserOrSearchSubmissionsPaginated,
			true,
			name,
			page,
			RESULTS_PER_PAGE);

		const { soulIds, cachedSouls } = destructNamesAndIds(submissions, ids, true);

		dispatch(add_to_cached_souls({
			cachedSouls: cachedSouls
		}));

		return {
			totalFound: Number(totalAmountOfSubmissions),
			ids: soulIds,
			currentPage: page,
			hasMore: Number(totalAmountOfSubmissions) > page * RESULTS_PER_PAGE
		};
	}
);

interface AddNewNamePayload {
	eterneyInstance: Contract;
	newName: NewNameProps;
}

interface AddNewNameResult {
}

export const addNewName = createAsyncThunk<AddNewNameResult, AddNewNamePayload, ThunkApi>(
	'soul/addNewName',
	async (props, { dispatch, getState }) => {
		const { eterneyInstance, newName } = props;
		const address = getState().user.address;
		const fee = getState().user.fee;

		const { name, dobDay, dobMonth, dobYear, dodDay, dodMonth, dodYear, bio } = newName;
		const dates = dobDay + '.' + dobMonth + '.' + dobYear + '.' + dodDay + '.' + dodMonth + '.' + dodYear;

		const tx = await eterneyInstance.addPerson(name, dates, bio, { from: address, value: fee });
		await customRace(tx.wait(), 20000);
		dispatch(submissions_reset());
		dispatch(fetchUserNames({
			eterneyInstance: eterneyInstance
		}));
	}
);

export const soulSlice = createSlice({
	name: 'soul',
	initialState,
	reducers: {
		souls_reset: () => initialState,
		delete_soul: (state, action: PayloadAction<{ id: number }>) => {
			state.cachedSoulsById[action.payload.id].isDeleted = true;
		},
		add_to_cached_souls: (state, action: PayloadAction<AddToCachedSouls>) => {
			state.cachedSoulsById = { ...state.cachedSoulsById, ...action.payload.cachedSouls };
		},
		clear_search: (state) => {
			state.currentSearch = '';
		},
		clear_name_transaction: (state) => {
			state.newNameTransaction = newNameInitialState;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRandomSouls.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(fetchRandomSouls.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isInitialized = true;
				state.total = action.payload.total;
				state.randomIds = action.payload.soulIds;
				state.cachedSoulsById = { ...state.cachedSoulsById, ...action.payload.cachedSouls };
			})
			.addCase(fetchRandomSouls.rejected, (state, action) => {
				state.isLoading = false;
				state.isInitialized = false;
				console.error(action.error);
			})
			.addCase(fetchById.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(fetchById.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload.soul)
					state.cachedSoulsById[action.meta.arg.id] = action.payload.soul;
			})
			.addCase(fetchById.rejected, (state, action) => {
				state.isLoading = false;
				console.error(action.error);
			})
			.addCase(fetchByName.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(fetchByName.fulfilled, (state, action) => {
				state.isLoading = false;
				state.currentSearch = action.meta.arg.name;
				state.search[action.meta.arg.name] = {
					ids: state.search[action.meta.arg.name]
						? [...state.search[action.meta.arg.name].ids, ...action.payload.ids]
						: action.payload.ids,
					currentPage: action.payload.currentPage,
					hasMore: action.payload.hasMore,
					totalFound: action.payload.totalFound
				};
			})
			.addCase(fetchByName.rejected, (state, action) => {
				state.isLoading = false;
				console.error(action.error);
			})
			.addCase(addNewName.pending, (state, action) => {
				state.newNameTransaction = {
					name: action.meta.arg.newName.name,
					dobDay: action.meta.arg.newName.dobDay,
					dobMonth: action.meta.arg.newName.dobMonth,
					dobYear: action.meta.arg.newName.dobYear,
					dodDay: action.meta.arg.newName.dodDay,
					dodMonth: action.meta.arg.newName.dodMonth,
					dodYear: action.meta.arg.newName.dodYear,
					bio: action.meta.arg.newName.bio,
					status: TRANSACTION_STATUS.PENDING
				};
			})
			.addCase(addNewName.fulfilled, (state, action) => {
				state.newNameTransaction = {
					...state.newNameTransaction,
					status: TRANSACTION_STATUS.SUCCESS
				};
			})
			.addCase(addNewName.rejected, (state, action) => {
				state.newNameTransaction = {
					...state.newNameTransaction,
					status: TRANSACTION_STATUS.ERROR
				};
				console.error(action.error);
			});
	}
});

export const {
	souls_reset,
	delete_soul,
	add_to_cached_souls,
	clear_search,
	clear_name_transaction
} = soulSlice.actions;

export const selectSoul = (state: RootState) => state.soul;
export const selectSoulLoading = (state: RootState) => state.soul.isLoading;
export const selectSoulInitialized = (state: RootState) => state.soul.isInitialized;
export const selectSoulTotal = (state: RootState) => state.soul.total;
export const selectRandomIds = (state: RootState) => state.soul.randomIds;
export const selectSoulCached = (state: RootState) => state.soul.cachedSoulsById;
export const selectSoulCurrentSearch = (state: RootState) => state.soul.currentSearch;
export const selectSoulNewName = (state: RootState) => state.soul.newNameTransaction;
export const selectSoulSearchByNamePage = createSelector(
	[
		(state: RootState) => state.soul,
		(state: RootState, name: string) => name
	],
	(soul, name) => soul.search[name]?.currentPage
);
export const selectSoulSearchByNameHasMore = createSelector(
	[
		(state: RootState) => state.soul,
		(state: RootState, name: string) => name
	],
	(soul, name) => soul.search[name]?.hasMore
);
export const selectSoulSearchByNameTotal = createSelector(
	[
		(state: RootState) => state.soul,
		(state: RootState, name: string) => name
	],
	(soul, name) => soul.search[name]?.totalFound
);
export const selectSoulSearchByNameIds = createSelector(
	[
		(state: RootState) => state.soul,
		(state: RootState, name: string) => name
	],
	(soul, name) => soul.search[name]?.ids
);
export const selectSoulById = createSelector(
	[
		(state: RootState) => state.soul,
		(state: RootState, id?: number) => id
	],
	(soul, id) => id === undefined ? undefined : soul.cachedSoulsById[id]
);

export default soulSlice.reducer;


