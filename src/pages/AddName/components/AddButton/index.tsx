import React, { Dispatch, memo, MouseEvent, SetStateAction } from 'react';
import { selectUserFee } from '../../../../state/user/slice';
import { useEterney } from '../../../../hooks/useEterney';
import { cleanString, dobDodCompareAndValidate, isDateValid } from '../../../../utils/helpers';
import { DarkButton } from '../../../../theme/elements';
import { FormState } from '../../index';
import { ValueLoader } from '../../../../components/Loader';
import { GLOBAL_CALC_UNIT } from '../../../../constants/settings';
import { useTranslation } from 'react-i18next';
import { ethers } from 'ethers';
import { useAppSelector } from '../../../../state/hooks';

interface AddButtonProps {
	formState: FormState,
	setFormState: Dispatch<SetStateAction<FormState>>
}

const AddButton = memo(({ formState, setFormState }: AddButtonProps) => {
	const fee = useAppSelector(selectUserFee);
	const { t } = useTranslation();
	const { addPerson } = useEterney();

	const validateForm = (): boolean => {
		const nameError = cleanString(formState.name, true).length < 1;
		let dobError = !isDateValid(formState.dobYear, formState.dobMonth, formState.dobDay);
		let dodError = !isDateValid(formState.dodYear, formState.dodMonth, formState.dodDay);

		if (!dobError && !dodError)
			if (!dobDodCompareAndValidate({
				dobDay: formState.dobDay,
				dobMonth: formState.dobMonth,
				dobYear: formState.dobYear,
				dodDay: formState.dodDay,
				dodMonth: formState.dodMonth,
				dodYear: formState.dodYear
			})) {
				dobError = true;
				dodError = true;
			}

		setFormState(prev => ({
			...prev,
			nameError,
			dobError,
			dodError
		}));

		return !(nameError || dobError || dodError);
	};

	const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (validateForm()) {
			addPerson({
				name: cleanString(formState.name, true),
				dobDay: formState.dobDay,
				dobMonth: formState.dobMonth,
				dobYear: formState.dobYear,
				dodDay: formState.dodDay,
				dodMonth: formState.dodMonth,
				dodYear: formState.dodYear,
				bio: cleanString(formState.bio)
			});
		}
	};

	return (
		<DarkButton onClick={onSubmit}>
			<ValueLoader value={fee} light={true}>
				{t('add')} | {ethers.utils.formatUnits(fee ? fee:0, GLOBAL_CALC_UNIT)} ETH + gas
			</ValueLoader>
		</DarkButton>
	);
});

export default AddButton;
