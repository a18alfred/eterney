import { providerEthers, useWeb3 } from '../context/web3/web3';
import { fetchUserNames, selectUserAddress } from '../state/user/slice';
import { GLOBAL_CALC_UNIT } from '../constants/settings';
import { addNewName, delete_soul, fetchById, fetchByName } from '../state/soul/slice';
import { NewNameProps } from '../state/soul/types';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { waitFor } from '../utils/helpers';
import { ethers } from 'ethers';
import useModal from './useModal';
import { MODAL_ROUTE } from '../constants/routing';

export const useEterney = () => {
	const address = useAppSelector(selectUserAddress);
	const { eterneyInstance, eterneyReadOnly } = useWeb3();
	const dispatch = useAppDispatch();
	const { open } = useModal();

	const findById = (id: number) => {
		if (!eterneyReadOnly.current) return;
		dispatch(fetchById({
			eterneyReadOnly: eterneyReadOnly.current,
			id: id
		}));
	};

	const fetchSubmissions = () => {
		if (!eterneyInstance.current) return;
		dispatch(fetchUserNames({
			eterneyInstance: eterneyInstance.current
		}));
	};

	const findByName = (name: string) => {
		if (!eterneyReadOnly.current) return;
		dispatch(fetchByName({
			eterneyReadOnly: eterneyReadOnly.current,
			name: name
		}));
	};

	const addPerson = (newName: NewNameProps) => {
		if (!eterneyInstance.current) return;
		dispatch(addNewName({
			eterneyInstance: eterneyInstance.current,
			newName
		}));
		open(MODAL_ROUTE.ADD_PENDING);
	};

	const deletePerson = async ({ id }: { id: number }) => {
		if (!eterneyInstance.current) return;
		const tx = await eterneyInstance.current.deletePerson(id, { from: address });
		await Promise.race([tx.wait(), waitFor(30000)]);
		dispatch(delete_soul({
			id: id
		}));
	};

	const getContractBalance = async (): Promise<string> => {
		if (!eterneyInstance.current) return '';
		const address = eterneyInstance.current.address;
		const balance = await providerEthers.getBalance(address);
		return ethers.utils.formatUnits(balance.toString(), GLOBAL_CALC_UNIT);
	};

	const getContractFee = async (): Promise<string> => {
		if (!eterneyInstance.current) return '';
		const fee = await eterneyInstance.current.fee();
		return ethers.utils.formatUnits(fee.toString(), GLOBAL_CALC_UNIT);
	};

	const withdraw = async ({ value }: { value: number }) => {
		if (!eterneyInstance.current) return;
		const valueInWei = ethers.utils.parseEther(value.toString());
		const tx = await eterneyInstance.current.withdraw(valueInWei.toString(), { from: address });
		await Promise.race([tx.wait(), waitFor(30000)]);
	};

	const changeFee = async ({ fee }: { fee: number }) => {
		if (!eterneyInstance.current) return;
		const feeInWei = ethers.utils.parseEther(fee.toString());
		const tx = await eterneyInstance.current.changeFee(feeInWei, { from: address });
		await Promise.race([tx.wait(), waitFor(300000)]);
	};

	return {
		findById,
		findByName,
		addPerson,
		deletePerson,
		fetchSubmissions,
		getContractBalance,
		getContractFee,
		withdraw,
		changeFee
	};
};
