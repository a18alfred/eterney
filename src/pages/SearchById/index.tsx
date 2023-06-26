import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { selectSoulCached, selectSoulLoading, selectSoulTotal } from '../../state/soul/slice';
import { useEterney } from '../../hooks/useEterney';
import { SearchLoader } from '../../components/Loader';
import { ModalProps } from '../../state/modal/types';
import { useAppSelector } from '../../state/hooks';
import PersonDetails from '../../components/PersonDetails';
import {
	InputSearch,
	SearchButtonWrapper,
	SearchFormStyled,
	SearchIconStyled,
	SearchInputLabel
} from '../../theme/elements';

const SearchById: React.FC<ModalProps> = () => {
	const total = useAppSelector(selectSoulTotal);
	const cachedSoulsById = useAppSelector(selectSoulCached);
	const isLoading = useAppSelector(selectSoulLoading);
	const currentTotal = total === 0 ? '...' : total - 1;
	const { t } = useTranslation();
	const { findById } = useEterney();
	const inputRef = useRef<HTMLInputElement>(null);
	const [inputId, setInputId] = useState<string>('');
	const [selectedId, setSelectedId] = useState<number>(-1);

	const validate = (id: number): boolean => {
		if (isNaN(id) || id > (total - 1) || id < 0) {
			setInputId('');
			return false;
		}
		return true;
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const id = Number(inputId);
		if (validate(id)) {
			if (!(inputId in cachedSoulsById)) {
				inputRef?.current?.blur();
				findById(id);
			}
			setSelectedId(id);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const re = /^[0-9\b]+$/;
		const value = e.target.value;
		if (value === '' || re.test(value)) {
			setInputId(value);
		}
		if (value === '') setSelectedId(-1);
	};

	return (
		<>
			<SearchInputLabel>
				{t('enter_number_from') + (currentTotal)}
			</SearchInputLabel>
			<SearchFormStyled onSubmit={handleSubmit}>
				<InputSearch
					value={inputId}
					onChange={handleChange}
					type={'number'}
					placeholder={t('#')}
					ref={inputRef}
					required
				/>
				<SearchButtonWrapper type={'submit'}>
					<SearchIconStyled />
				</SearchButtonWrapper>
			</SearchFormStyled>
			<SearchLoader isLoading={isLoading} soul={cachedSoulsById[selectedId]}>
				{cachedSoulsById[selectedId] &&
					<PersonDetails soul={cachedSoulsById[selectedId]} isPending={false} />}
			</SearchLoader>
		</>
	);
};

export default SearchById;
