import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { errorBorder, secondaryText } from '../../theme/colors';
import { BIO_MAX_CHAR, NAME_MAX_CHAR } from '../../constants/settings';
import { InputStyled, InputTextArea } from '../../theme/elements';
import AddButton from './components/AddButton';
import { NewNameTransaction } from '../../state/soul/types';
import { useAppSelector } from '../../state/hooks';
import { selectSoulNewName } from '../../state/soul/slice';
import { ModalProps } from '../../state/modal/types';

const AddForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.p`
  font-weight: 800;
  margin-top: 0.5rem;
`;

const CautionText = styled.p`
  font-weight: 800;
  margin-bottom: 0.5rem;
`;

const LabelSmall = styled.p`
  font-size: 12px;
  color: ${secondaryText};
  margin-bottom: 0.5rem;
`;

const ErrorLabel = styled.span`
  font-size: 12px;
  margin-left: 0.5rem;
  color: ${errorBorder};
`;

const DatesWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  gap: 1rem;
`;

export interface FormState extends NewNameTransaction {
	nameError: boolean;
	dobError: boolean;
	dodError: boolean;
}

const AddName: React.FC<ModalProps> = () => {
	const initialState = useAppSelector(selectSoulNewName);
	const [formState, setFormState] = useState<FormState>({
		...initialState,
		nameError: false,
		dobError: false,
		dodError: false
	});
	const { t } = useTranslation();

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const field = e.target.id as keyof NewNameTransaction;
		let value = e.target.value;
		const maxLength = e.target.getAttribute('maxlength');
		value = value.slice(0, maxLength ? +maxLength : value.length);

		if (typeof formState[field] === 'number') {
			setFormState(prev => ({
				...prev,
				[field]: parseInt(value) || 0
			}));
		} else
			setFormState(prev => ({
				...prev,
				[field]: value
			}));
	};

	return (
		<>
			<AddForm>
				<Label>
					{t('full_name')} *
				</Label>
				<InputStyled
					id={'name'}
					error={formState.nameError}
					type='text'
					maxLength={NAME_MAX_CHAR}
					placeholder={t('full_name_placeholder')}
					value={formState.name}
					onChange={handleChange}
					required
				/>
				<Label>
					{t('dob')} *
					{formState.dobError && <ErrorLabel>{t('invalid_date')}</ErrorLabel>}
				</Label>
				<DatesWrapper>
					<div>
						<LabelSmall>
							{t('day')}
						</LabelSmall>
						<InputStyled
							id={'dobDay'}
							width='50px'
							error={formState.dobError}
							type='number'
							maxLength={2}
							placeholder={t('DD')}
							value={formState.dobDay || ''}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<LabelSmall>
							{t('month')}
						</LabelSmall>
						<InputStyled
							id={'dobMonth'}
							width='50px'
							error={formState.dobError}
							type='number'
							maxLength={2}
							placeholder={t('MM')}
							value={formState.dobMonth || ''}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<LabelSmall>
							{t('year')}
						</LabelSmall>
						<InputStyled
							id={'dobYear'}
							width='60px'
							error={formState.dobError}
							type='number'
							maxLength={4}
							placeholder={t('YYYY')}
							value={formState.dobYear || ''}
							onChange={handleChange}
							required
						/>
					</div>
				</DatesWrapper>

				<Label>
					{t('dod')} *
					{formState.dodError && <ErrorLabel>{t('invalid_date')}</ErrorLabel>}
				</Label>
				<DatesWrapper>
					<div>
						<LabelSmall>
							{t('day')}
						</LabelSmall>
						<InputStyled
							id={'dodDay'}
							width='50px'
							error={formState.dodError}
							type='number'
							maxLength={2}
							placeholder={t('DD')}
							value={formState.dodDay || ''}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<LabelSmall>
							{t('month')}
						</LabelSmall>
						<InputStyled
							id={'dodMonth'}
							width='50px'
							error={formState.dodError}
							type='number'
							maxLength={2}
							placeholder={t('MM')}
							value={formState.dodMonth || ''}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<LabelSmall>
							{t('year')}
						</LabelSmall>
						<InputStyled
							id={'dodYear'}
							width='60px'
							error={formState.dodError}
							type='number'
							maxLength={4}
							placeholder={t('YYYY')}
							value={formState.dodYear || ''}
							onChange={handleChange}
							required
						/>
					</div>
				</DatesWrapper>
				<Label>
					{t('bio')}
				</Label>
				<InputTextArea
					id={'bio'}
					value={formState.bio}
					onChange={handleChange}
					maxLength={BIO_MAX_CHAR}
				/>
				<LabelSmall>
					{formState.bio.length}/{BIO_MAX_CHAR}. {t('text_length_affects_gas')}
				</LabelSmall>
				<CautionText>
					{t('please_ensure')}
				</CautionText>
				<AddButton formState={formState} setFormState={setFormState} />
			</AddForm>
		</>
	);
};

export default AddName;
