import Welcome from '../pages/Welcome';
import { Routes } from './types';
import IosInstall from '../pages/IosInstall';
import Details from '../pages/Details';
import Admin from '../pages/Admin';
import Account from '../pages/Account';
import AccountNames from '../pages/AccountNames';
import SearchSelector from '../pages/SearchSelector';
import SearchById from '../pages/SearchById';
import SearchByName from '../pages/SearchByName';
import AddName from '../pages/AddName';
import Error from '../pages/Error';
import Success from '../pages/Success';
import AddPending from '../pages/AddPending';

export enum MODAL_ROUTE {
	ACCOUNT = 'account',
	ACCOUNT_NAMES = 'account_names',
	NAME_DETAILS = 'account_name_details',
	WELCOME = 'welcome',
	SEARCH = 'search',
	SEARCH_ID = 'search_id',
	SEARCH_NAME = 'search_name',
	ADMIN = 'admin',
	ERROR = 'error',
	SUCCESS = 'success',
	INSTALL = 'install',
	DETAILS_WALL = 'details_wall',
	ADD_NAME = 'add_name',
	ADD_PENDING = 'add_pending',
}

export const modalRoutes: Routes = {
	[MODAL_ROUTE.WELCOME]: { component: Welcome, noBack: true },
	[MODAL_ROUTE.INSTALL]: { component: IosInstall, noBack: true },
	[MODAL_ROUTE.DETAILS_WALL]: { component: Details, noBack: true, customGap: '0.5rem' },
	[MODAL_ROUTE.ADMIN]: { component: Admin },
	[MODAL_ROUTE.ACCOUNT]: { component: Account, noBack: true },
	[MODAL_ROUTE.ACCOUNT_NAMES]: { component: AccountNames },
	[MODAL_ROUTE.NAME_DETAILS]: { component: Details, customGap: '0.5rem', customName: 'account_names' },
	[MODAL_ROUTE.SEARCH]: { component: SearchSelector },
	[MODAL_ROUTE.SEARCH_ID]: { component: SearchById },
	[MODAL_ROUTE.SEARCH_NAME]: { component: SearchByName },
	[MODAL_ROUTE.ADD_NAME]: { component: AddName, noBack: true },
	[MODAL_ROUTE.ERROR]: { component: Error, noBack: true },
	[MODAL_ROUTE.SUCCESS]: { component: Success, noBack: true },
	[MODAL_ROUTE.ADD_PENDING]: { component: AddPending, noBack: true }
};