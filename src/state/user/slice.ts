import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RESULTS_PER_PAGE } from '../../constants/settings';
import { destructNamesAndIds, retryableFetch } from '../../utils/helpers';
import { add_to_cached_souls } from '../soul/slice';
import { RootState, ThunkApi } from '../index';
import { User, UserConnectedPayloadAction } from './types';
import { Contract } from '@ethersproject/contracts';

const initialState: User = {
	isLoading: false,
	address: undefined,
	connected: false,
	chainId: 1,
	chainName: '',
	isAdmin: false,
	fee: '',
	numberOfNames: 0,
	currentPage: 0,
	hasMore: true,
	isFetched: false,
	userNameIds: [],
	error: null
};

interface GetAdminAndFeePayload {
	eterneyReadOnly: Contract;

}

interface GetAdminAndFeeResult {
	isAdmin: boolean;
	fee: string;
}

export const getAdminAndFee = createAsyncThunk<GetAdminAndFeeResult, GetAdminAndFeePayload, ThunkApi>(
	'user/getAdminAndFee',
	async (props, { getState }) => {
		const { eterneyReadOnly } = props;
		const { address } = getState().user;

		const admin = await retryableFetch(eterneyReadOnly.admin);
		const fee = await retryableFetch(eterneyReadOnly.fee);

		if (address && admin) {
			return {
				isAdmin: address.toLowerCase() === admin.toLowerCase(),
				fee: fee.toString()
			};
		} else
			return {
				isAdmin: false,
				fee: fee.toString()
			};
	}
);

interface FetchUserSubmissionsPayload {
	eterneyInstance: Contract;
}

interface FetchUserSubmissionsResult {
	numberOfNames: number;
	userNameIds: number[];
	currentPage: number;
	hasMore: boolean;
}

export const fetchUserNames = createAsyncThunk<FetchUserSubmissionsResult, FetchUserSubmissionsPayload, ThunkApi>(
	'user/fetchUserSubmissions',
	async (props, { dispatch, getState }) => {
		const { eterneyInstance } = props;
		const currentState = getState().user;

		if (!currentState.hasMore) {
			return {
				numberOfNames: currentState.numberOfNames,
				userNameIds: [],
				currentPage: currentState.currentPage,
				hasMore: currentState.hasMore
			};
		}

		const page = currentState.currentPage + 1;

		const { totalAmountOfSubmissions, submissions, ids } = await retryableFetch(
			eterneyInstance.getUserOrSearchSubmissionsPaginated,
			false,
			'',
			page,
			RESULTS_PER_PAGE,
			{ from: currentState.address }
		);

		const { soulIds, cachedSouls } = destructNamesAndIds(submissions, ids);

		dispatch(add_to_cached_souls({
			cachedSouls: cachedSouls
		}));

		return {
			numberOfNames: Number(totalAmountOfSubmissions),
			userNameIds: soulIds,
			currentPage: page,
			hasMore: Number(totalAmountOfSubmissions) > page * RESULTS_PER_PAGE
		};
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		user_disconnected: () => initialState,
		user_connected: (state, action: PayloadAction<UserConnectedPayloadAction>) => {
			state.isLoading = false;
			state.address = action.payload.address;
			state.connected = true;
			state.chainId = action.payload.chainId;
			state.chainName = action.payload.chainName;
			state.isAdmin = false;
			state.isFetched = false;
			state.numberOfNames = 0;
			state.currentPage = 0;
			state.hasMore = true;
			state.userNameIds = [];
		},
		submissions_reset: (state) => {
			state.isFetched = false;
			state.numberOfNames = 0;
			state.currentPage = 0;
			state.hasMore = true;
			state.userNameIds = [];
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAdminAndFee.fulfilled, (state, action) => {
				state.isAdmin = action.payload.isAdmin;
				state.fee = action.payload.fee;
			})
			.addCase(fetchUserNames.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchUserNames.fulfilled, (state, action) => {
				state.isLoading = false;
				state.numberOfNames = action.payload.numberOfNames;
				state.userNameIds = [...state.userNameIds, ...action.payload.userNameIds];
				state.currentPage = action.payload.currentPage;
				state.hasMore = action.payload.hasMore;
				state.isFetched = true;
				state.error = null;
			})
			.addCase(fetchUserNames.rejected, (state, action) => {
				state.error = 'Fetch Submissions Error';
				state.isLoading = false;
			});
	}
});

export const {
	user_disconnected,
	user_connected,
	submissions_reset
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectUserLoading = (state: RootState) => state.user.isLoading;
export const selectUserHasMore = (state: RootState) => state.user.hasMore;
export const selectUserConnected = (state: RootState) => state.user.connected;
export const selectUserAddress = (state: RootState) => state.user.address;
export const selectUserChain = (state: RootState) => ({
	chain: state.user.chainId,
	chainName: state.user.chainName
});
export const selectUserIsAdmin = (state: RootState) => state.user.isAdmin;
export const selectUserFee = (state: RootState) => state.user.fee;
export const selectUserFetched = (state: RootState) => state.user.isFetched;
export const selectUserNameIds = (state: RootState) => state.user.userNameIds;
export const selectUserNamesNumber = (state: RootState) => state.user.numberOfNames;

export default userSlice.reducer;
