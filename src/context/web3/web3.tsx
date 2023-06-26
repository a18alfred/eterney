import React, { useEffect, useRef } from 'react';
import {
	fetchUserNames,
	getAdminAndFee,
	selectUserConnected,
	user_connected,
	user_disconnected
} from '../../state/user/slice';
import { fetchRandomSouls, souls_reset } from '../../state/soul/slice';
import Eterney from '../../abis/Eterney.json';
import useOnlineStatus from '../online/online';
import { ethereumClient } from '../../index';
import { Network, Web3ContextState } from './types';
import { WithChildren } from '../../constants/types';
import { NETWORK } from '../../constants/settings';
import { useAccount, useNetwork, useSigner } from 'wagmi';
import { Contract } from '@ethersproject/contracts';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import useModal from '../../hooks/useModal';
import { MODAL_ROUTE } from '../../constants/routing';

const eterneyNetworks: Network = Eterney.networks;

const { ethers } = require('ethers');
export const providerEthers = new ethers.providers.AlchemyProvider(NETWORK.name, process.env.REACT_APP_ALCHEMY_KEY_TESTING);

const defaultState: Web3ContextState = {
	eterneyInstance: {
		current: undefined
	},
	eterneyReadOnly: {
		current: undefined
	}
};

export const Web3Context = React.createContext(defaultState);

export const useWeb3 = () => React.useContext(Web3Context);

export const disconnectUser = async () => {
	try {
		await ethereumClient.disconnect();
	} catch (error) {
		console.log(error);
	}
};

const Web3Provider: React.FC<WithChildren> = ({ children }) => {
	const dispatch = useAppDispatch();
	const userConnected = useAppSelector(selectUserConnected);
	const isOnline = useOnlineStatus();
	const eterneyInstance = useRef<Contract | undefined>(defaultState.eterneyInstance.current);
	const eterneyReadOnly = useRef<Contract | undefined>(defaultState.eterneyReadOnly.current);
	const { address, isConnected, isDisconnected, isReconnecting } = useAccount();
	const { data: signer } = useSigner();
	const { chain } = useNetwork();
	const { open } = useModal();

	useEffect(() => {
		const newConnect = async () => {
			await onConnected();
		};
		if (isConnected && signer) {
			newConnect();
		}
	}, [isConnected, signer]);

	useEffect(() => {
		if (userConnected && isDisconnected && !isReconnecting) {
			eterneyInstance.current = undefined;
			dispatch(user_disconnected());
		}
	}, [isDisconnected]);

	useEffect(() => {
		const initReadOnlyContract = async () => {
			const netData = eterneyNetworks[NETWORK.id];
			if (netData) {
				eterneyReadOnly.current = new ethers.Contract(netData.address, Eterney.abi, providerEthers);
				if (eterneyReadOnly.current) {
					dispatch(fetchRandomSouls({
						eterneyReadOnly: eterneyReadOnly.current
					}));
				}
			} else console.log('Eterney contract was not deployed');
		};

		// Test Network
		// const initReadOnlyContract = async () => {
		// 	const netData = eterneyNetworks[NETWORK_TEST.id];
		// 	if (netData) {
		// 		eterneyReadOnly.current = new ethers.Contract(netData.address, Eterney.abi, providerEthers);
		// 		if (eterneyReadOnly.current) {
		// 			dispatch(fetchRandomSouls({
		// 				eterneyReadOnly: eterneyReadOnly.current
		// 			}));
		// 		}
		// 	} else console.log('Eterney contract was not deployed');
		// };

		if (isOnline) {
			initReadOnlyContract().catch(e => console.log(e));
		} else {
			dispatch(souls_reset());
			dispatch(user_disconnected());
		}

	}, [isOnline]);

	const initContracts = async (chainId: number) => {
		const netData = eterneyNetworks[chainId];
		if (netData) {
			eterneyInstance.current = new ethers.Contract(netData.address, Eterney.abi, signer);
		} else {
			open(MODAL_ROUTE.ERROR, { message: 'contract_not_deployed' });
			await disconnectUser();
			return false;
		}
		return true;
	};

	const onConnected = async () => {
		if (chain?.id) {
			if (await initContracts(chain.id)) {
				dispatch(user_connected({
					address: address,
					chainId: chain.id,
					chainName: chain.id === 1 ? 'Ethereum Mainnet' : chain.name
				}));
				if (eterneyReadOnly.current)
					dispatch(getAdminAndFee({
						eterneyReadOnly: eterneyReadOnly.current
					}));
				if (eterneyInstance.current)
					dispatch(fetchUserNames({
						eterneyInstance: eterneyInstance.current
					}));

			}
		}
	};

	return (
		<Web3Context.Provider value={{
			eterneyInstance: eterneyInstance,
			eterneyReadOnly: eterneyReadOnly
		}}>
			{children}
		</Web3Context.Provider>
	);
};

export default Web3Provider;
