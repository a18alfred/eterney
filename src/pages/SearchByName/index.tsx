import React, { FormEvent, useRef, useState } from 'react';
import { ModalProps } from '../../state/modal/types';
import {
	InputSearch,
	SearchButtonWrapper,
	SearchFormStyled,
	SearchIconStyled,
	SearchInputLabel
} from '../../theme/elements';
import { useTranslation } from 'react-i18next';
import { NAME_MAX_CHAR } from '../../constants/settings';
import { useEterney } from '../../hooks/useEterney';
import SearchResults from './components/SearchResults';
import { useAppSelector } from '../../state/hooks';
import { selectSoulCurrentSearch } from '../../state/soul/slice';
import { cleanString } from '../../utils/helpers';

const SearchByName: React.FC<ModalProps> = () => {
	const { t } = useTranslation();
	const inputRef = useRef<HTMLInputElement>(null);
	const currentSearch = useAppSelector(selectSoulCurrentSearch);
	const [inputName, setInputName] = useState<string>(currentSearch);
	const [selectedName, setSelectedName] = useState<string>(currentSearch);
	const { findByName } = useEterney();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const cleanName = cleanString(inputName, true);
		if (inputName !== selectedName) {
			findByName(cleanName);
			setSelectedName(cleanName);
		}
	};

	return (
		<>
			<SearchInputLabel>
				{t('enter_full_name')}
			</SearchInputLabel>
			<SearchFormStyled onSubmit={handleSubmit}>
				<InputSearch
					value={inputName}
					onChange={e => setInputName(e.target.value)}
					type={'text'}
					placeholder={t('full_name_placeholder')}
					ref={inputRef}
					maxLength={NAME_MAX_CHAR}
					required
				/>
				<SearchButtonWrapper type={'submit'}>
					<SearchIconStyled />
				</SearchButtonWrapper>
			</SearchFormStyled>
			<SearchResults name={selectedName} />
		</>
	);
};

export default SearchByName;
