import React, { MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useEterney } from '../../hooks/useEterney';
import { ModalProps } from '../../state/modal/types';
import { DarkButton, InputStyled } from '../../theme/elements';

const TextBold = styled.span`
  margin-right: 1rem;
  font-weight: 800;
`;

const Admin: React.FC<ModalProps> = () => {
	const { t } = useTranslation();
	const {
		getContractBalance,
		getContractFee,
		withdraw,
		changeFee
	} = useEterney();
	const contractSettingsInitialState = {
		balance: t('loading'),
		fee: t('loading')
	};
	const [contractInfo, setContractInfo] = useState(contractSettingsInitialState);
	const [newFee, setNewFee] = useState<string>('');

	const init = async () => {
		try {
			setContractInfo(contractSettingsInitialState);
			const balance = await getContractBalance();
			const fee = await getContractFee();
			setContractInfo({
				balance: balance,
				fee: fee
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onWithdraw = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (contractInfo.balance === t('loading')) return false;
		try {
			await withdraw({ value: parseFloat((contractInfo.balance)) });
			await init();
		} catch (e) {
			console.log(e);
		}
	};

	const onChangeFee = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!newFee) return;
		try {
			await changeFee({ fee: parseFloat(newFee) });
			setNewFee('');
			await init();
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<p>
				<TextBold>
					{t('balance')}:
				</TextBold>
				{contractInfo.balance} ETH
			</p>
			<DarkButton onClick={onWithdraw}>
				{t('withdraw')}
			</DarkButton>
			<p>
				<TextBold>
					{t('fee')}:
				</TextBold>
				{contractInfo.fee} ETH
			</p>
			<InputStyled
				value={newFee}
				onChange={(e) => setNewFee(e.target.value)}
				type={'number'}
				placeholder={'ETH'}
			/>
			<DarkButton onClick={onChangeFee}>
				{t('change_fee')}
			</DarkButton>
		</>
	);
};

export default Admin;
