import React from 'react';
import useOnlineStatus from '../../context/online/online';
import Offline from '../Offline';
import { WithChildren } from '../../constants/types';

const OnlineSwitcher: React.FC<WithChildren> = ({ children }) => {
	const isOnline = useOnlineStatus();

	if (!isOnline) return (
		<Offline />
	);

	return (
		<>
			{children}
		</>
	);
};

export default OnlineSwitcher;
