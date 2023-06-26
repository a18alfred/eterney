import React, { createContext, useContext, useEffect, useState } from 'react';
import { WithChildren } from '../../constants/types';

const PING_RESOURCE = '/ping.txt';
const TIMEOUT_TIME_MS = 3000;
const onlinePollingInterval = 10000;

const timeout = (time: number, promise: Promise<any>): Promise<any> => {
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			reject(new Error('Request timed out.'));
		}, time);
		promise.then(resolve, reject);
	});
};

const checkOnlineStatus = async (): Promise<boolean> => {
	const controller = new AbortController();
	const { signal } = controller;

	if (!navigator.onLine) return navigator.onLine;

	//
	try {
		await timeout(
			TIMEOUT_TIME_MS,
			fetch(PING_RESOURCE, {
				method: 'GET',
				signal
			})
		);
		return true;
	} catch (error) {
		console.error(error);
		controller.abort();
	}
	return false;
};

const OnlineStatusContext = createContext(navigator.onLine);

export const OnlineStatusProvider: React.FC<WithChildren> = ({ children }) => {
	const [onlineStatus, setOnlineStatus] = useState<boolean>(navigator.onLine);

	const checkStatus = async () => {
		const online = await checkOnlineStatus();
		setOnlineStatus(online);
	};

	useEffect(() => {
		window.addEventListener('offline', () => {
			setOnlineStatus(false);
		});

		checkStatus();
		setTimeout(() => checkStatus(), 4000);
		// Add polling in case of slow connection
		const id = setInterval(() => {
			checkStatus();
		}, onlinePollingInterval);

		return () => {
			window.removeEventListener('offline', () => {
				setOnlineStatus(false);
			});

			clearInterval(id);
		};
	}, []);

	return (
		<OnlineStatusContext.Provider value={onlineStatus}>
			{children}
		</OnlineStatusContext.Provider>
	);
};

export const useOnlineStatus = () => {
	return useContext(OnlineStatusContext);
};

export default useOnlineStatus;