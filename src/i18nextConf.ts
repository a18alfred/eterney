import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN_US from './assets/locales/en-US.json';
import translationAF_ZA from './assets/locales/af-ZA.json';
import translationAR_SA from './assets/locales/ar-SA.json';
import translationCA_ES from './assets/locales/ca-ES.json';
import translationCS_CZ from './assets/locales/cs-CZ.json';
import translationDA_DK from './assets/locales/da-DK.json';
import translationDE_DE from './assets/locales/de-DE.json';
import translationEL_GR from './assets/locales/el-GR.json';
import translationES_ES from './assets/locales/es-ES.json';
import translationFI_FI from './assets/locales/fi-FI.json';
import translationFR_FR from './assets/locales/fr-FR.json';
import translationHE_IL from './assets/locales/he-IL.json';
import translationHU_HU from './assets/locales/hu-HU.json';
import translationID_ID from './assets/locales/id-ID.json';
import translationIT_IT from './assets/locales/it-IT.json';
import translationJA_JP from './assets/locales/ja-JP.json';
import translationKO_KR from './assets/locales/ko-KR.json';
import translationNL_NL from './assets/locales/nl-NL.json';
import translationNO_NO from './assets/locales/no-NO.json';
import translationPL_PL from './assets/locales/pl-PL.json';
import translationPT_BR from './assets/locales/pt-BR.json';
import translationPT_PT from './assets/locales/pt-PT.json';
import translationRO_RO from './assets/locales/ro-RO.json';
import translationRU_RU from './assets/locales/ru-RU.json';
import translationSR_SP from './assets/locales/sr-SP.json';
import translationSV_SE from './assets/locales/sv-SE.json';
import translationSW_TZ from './assets/locales/sw-TZ.json';
import translationTR_TR from './assets/locales/tr-TR.json';
import translationUK_UA from './assets/locales/uk-UA.json';
import translationVI_VN from './assets/locales/vi-VN.json';
import translationZH_CN from './assets/locales/zh-CN.json';
import translationZH_TW from './assets/locales/zh-TW.json';

const fallbackLng = ['en-US'];

const availableLanguages = [
	'en-US',
	'af-ZA',
	'ar-SA',
	'ca-ES',
	'cs-CZ',
	'da-DK',
	'de-DE',
	'el-GR',
	'es-ES',
	'fi-FI',
	'fr-FR',
	'he-IL',
	'hu-HU',
	'id-ID',
	'it-IT',
	'ja-JP',
	'ko-KR',
	'nl-NL',
	'no-NO',
	'pl-PL',
	'pt-BR',
	'pt-PT',
	'ro-RO',
	'ru-RU',
	'sr-SP',
	'sv-SE',
	'sw-TZ',
	'tr-TR',
	'uk-UA',
	'vi-VN',
	'zh-CN',
	'zh-TW'
];

export type SupportedLocaleType = {
	[key: string]: string
}

const resources = {
	'en-US': {
		translation: translationEN_US
	},
	'af-ZA': {
		translation: translationAF_ZA
	},
	'ar-SA': {
		translation: translationAR_SA
	},
	'ca-ES': {
		translation: translationCA_ES
	},
	'cs-CZ': {
		translation: translationCS_CZ
	},
	'da-DK': {
		translation: translationDA_DK
	},
	'de-DE': {
		translation: translationDE_DE
	},
	'el-GR': {
		translation: translationEL_GR
	},
	'es-ES': {
		translation: translationES_ES
	},
	'fi-FI': {
		translation: translationFI_FI
	},
	'fr-FR': {
		translation: translationFR_FR
	},
	'he-IL': {
		translation: translationHE_IL
	},
	'hu-HU': {
		translation: translationHU_HU
	},
	'id-ID': {
		translation: translationID_ID
	},
	'it-IT': {
		translation: translationIT_IT
	},
	'ja-JP': {
		translation: translationJA_JP
	},
	'ko-KR': {
		translation: translationKO_KR
	},
	'nl-NL': {
		translation: translationNL_NL
	},
	'no-NO': {
		translation: translationNO_NO
	},
	'pl-PL': {
		translation: translationPL_PL
	},
	'pt-BR': {
		translation: translationPT_BR
	},
	'pt-PT': {
		translation: translationPT_PT
	},
	'ro-RO': {
		translation: translationRO_RO
	},
	'ru-RU': {
		translation: translationRU_RU
	},
	'sr-SP': {
		translation: translationSR_SP
	},
	'sv-SE': {
		translation: translationSV_SE
	},
	'sw-TZ': {
		translation: translationSW_TZ
	},
	'tr-TR': {
		translation: translationTR_TR
	},
	'uk-UA': {
		translation: translationUK_UA
	},
	'vi-VN': {
		translation: translationVI_VN
	},
	'zh-CN': {
		translation: translationZH_CN
	},
	'zh-TW': {
		translation: translationZH_TW
	}
};

export const SUPPORTED_LOCALES: SupportedLocaleType = {
	'en-US': 'English',
	'af-ZA': 'Afrikaans',
	'ar-SA': 'العربية',
	'ca-ES': 'Català',
	'cs-CZ': 'Čeština',
	'da-DK': 'Dansk',
	'de-DE': 'Deutsch',
	'el-GR': 'ελληνικά',
	'es-ES': 'Español',
	'fi-FI': 'Suomi',
	'fr-FR': 'Français',
	'he-IL': 'עִברִית',
	'hu-HU': 'Magyar',
	'id-ID': 'Bahasa Indonesia',
	'it-IT': 'Italiano',
	'ja-JP': '日本語',
	'ko-KR': '한국어',
	'nl-NL': 'Nederlands',
	'no-NO': 'Norsk',
	'pl-PL': 'Polskie',
	'pt-BR': 'Português (BR)',
	'pt-PT': 'Português',
	'ro-RO': 'Română',
	'ru-RU': 'Русский',
	'sr-SP': 'Српски',
	'sv-SE': 'Svenska',
	'sw-TZ': 'Kiswahili',
	'tr-TR': 'Türkçe',
	'uk-UA': 'Український',
	'vi-VN': 'Tiếng Việt',
	'zh-CN': '简体中文',
	'zh-TW': '繁体中文'
};

const options = {
	order: ['localStorage', 'sessionStorage', 'navigator']
};

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng,

		detection: options,
		supportedLngs: availableLanguages,
		interpolation: {
			escapeValue: false
		},
		debug: false
	});

export default i18n;


