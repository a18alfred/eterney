import moment from 'moment';
import { shuffle } from 'lodash';
import { SoulById, SoulDates, SoulResponseType } from '../state/soul/types';
import { FETCH_RETRIES, FETCH_RETRY_DELAY } from '../constants/settings';

export const unixToDate = (unixTime: number): string => {
	return moment.unix(unixTime).format('DD.MM.YYYY').toString();
};

export const isDateValid = (year: number, month: number, day: number): boolean => {
	return moment([year, month - 1, day]).isValid();
};

export const getDates = (dateString: string): SoulDates | null => {
	if (dateString === '') return null;
	const dateSplit = dateString.split('.');
	let array: number[] = [];
	dateSplit.forEach((element, index) => {
		array[index] = Number(element);
	});
	let dates = null;
	if (array.length === 6 && array[2] !== null && array[5] !== null) {
		dates = {
			dobDay: Number(array[0]),
			dobMonth: Number(array[1]),
			dobYear: Number(array[2]),
			dodDay: Number(array[3]),
			dodMonth: Number(array[4]),
			dodYear: Number(array[5])
		};

		if (!isDateValid(dates.dobYear, dates.dobMonth, dates.dobDay) ||
			!isDateValid(dates.dodYear, dates.dodMonth, dates.dodDay) ||
			!dobDodCompareAndValidate(dates)
		) return null;
	}

	return dates;
};

export const truncate = (fullStr: `0x${string}` | undefined, strLen: number, separator?: string): string => {
	if (!fullStr) return '';
	if (fullStr.length <= strLen) return fullStr;
	separator = separator || '...';
	const sepLen = separator.length,
		charsToShow = strLen - sepLen,
		frontChars = Math.ceil(charsToShow / 2),
		backChars = Math.floor(charsToShow / 2);
	return fullStr.slice(0, frontChars) + separator + fullStr.slice(fullStr.length - backChars);
};

export const cleanString = (str: string, toUpper?: boolean): string => {
	if (toUpper) return str.replace(/^\s+|\s+$/g, '').replace(/ +/g, ' ').toUpperCase();
	return str.replace(/^\s+|\s+$/g, '').replace(/ +/g, ' ');
};

export const dobDodCompareAndValidate = ({
											 dobDay,
											 dobMonth,
											 dobYear,
											 dodDay,
											 dodMonth,
											 dodYear
										 }: SoulDates): boolean => {
	try {
		const dob = new Date();
		dob.setFullYear(dobYear, dobMonth - 1, dobDay);
		const dod = new Date();
		dod.setFullYear(dodYear, dodMonth - 1, dodDay);
		const today = new Date();
		return (dob <= dod) && (dod <= today);
	} catch (e) {
		console.log(e);
		return false;
	}
};

export const shuffleArray = (array: any[]) => shuffle(array);

export const isNode = (value: any): value is Node => {
	return 'nodeType' in value;
};

export const scrollToTop = (id: string) => {
	const scrollableWrapper = document.getElementById(id);
	if (scrollableWrapper) scrollableWrapper.scrollTop = 0;
};

export const waitFor = (ms: number): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const retryableFetch = async (fetchFunc: (...args: any[]) => Promise<any>, ...fetchArgs: any[]): Promise<any> => {
	let attempts = 0;
	while (attempts < FETCH_RETRIES) {
		try {
			return await fetchFunc(...fetchArgs);
		} catch (e) {
			console.log(`Error fetching data, retrying in ${FETCH_RETRY_DELAY}ms. Error: ${e}`);
			await waitFor(FETCH_RETRY_DELAY);
			attempts++;
		}
	}
	throw new Error(`Data fetch failed after ${FETCH_RETRIES} attempts.`);
};

interface DestructNamesAndIdsResult {
	soulIds: number[];
	cachedSouls: SoulById;
}

export const destructNamesAndIds = (response: SoulResponseType[], ids: number[], deleteFilter?: boolean): DestructNamesAndIdsResult => {
	let soulIds: number[] = [];
	let cachedSouls: SoulById = {};

	response.forEach((item: SoulResponseType, index: number) => {
		if (item.name) {
			const dates = getDates(item.dates);
			if (dates || !deleteFilter) {
				soulIds.push(Number(ids[index]));
				cachedSouls[Number(ids[index])] = {
					id: Number(ids[index]),
					name: item.name,
					bio: item.bio,
					dates: dates,
					isDeleted: !dates
				};
			}
		}
	});


	return {
		soulIds, cachedSouls
	};
};

export function customRace<T>(promise: Promise<T>, timeout: number): Promise<T | undefined> {
	let timer: NodeJS.Timeout | null = null;
	return Promise.race([
		new Promise<T | undefined>((resolve, reject) => {
			timer = setTimeout(() => resolve(undefined), timeout);
			return timer;
		}),
		promise.then((value: T) => {
			clearTimeout(timer!);
			return value;
		})
	]);
}