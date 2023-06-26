import { useTranslation } from 'react-i18next';
import { SUPPORTED_LOCALES } from '../../i18nextConf';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from 'react';
import { ToggleModalItem } from './index';
import CheckIcon from '@mui/icons-material/Check';
import { ScrollableDiv } from '../../theme/elements';

interface LanguageMenuProps {
	close: () => void;
}

const LanguageMenu = ({ close }: LanguageMenuProps) => {
	const { i18n } = useTranslation();
	const locales = [];

	for (let key in SUPPORTED_LOCALES) {
		locales.push(< LanguageMenuItem
			language={SUPPORTED_LOCALES[key]}
			languageKey={key}
			active={i18n.language === key}
			key={key} />
		);
	}

	return (
		<ScrollableDiv>
			<ToggleModalItem onClick={close}>
				<ChevronLeftIcon style={{ fontSize: 16 }} />
			</ToggleModalItem>
			{locales}
		</ScrollableDiv>
	);
};

export default LanguageMenu;

interface LanguageMenuItemProps {
	languageKey: string;
	language: string;
	active: boolean;
}

const LanguageMenuItem = ({ language, languageKey, active }: LanguageMenuItemProps) => {
	const { i18n } = useTranslation();

	const changeLang = () => {
		if (active) return null;
		i18n.changeLanguage(languageKey);
	};

	return (
		<ToggleModalItem onClick={changeLang}>
			<div>{language}</div>
			{active && <CheckIcon style={{ fontSize: 16, opacity: 0.6 }} />}
		</ToggleModalItem>
	);
};