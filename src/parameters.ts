import { l10n } from 'vscode';

export enum ParameterValueType {
    Number = 'number',
    String = 'string',
    Boolean = 'boolean'
}

export interface Value {
    value: string;
    label?: string;
}

export interface ParameterConstraint {
    min?: number;
    max?: number;
    maxLength?: number;
    values?: Value[];
    optionalValues?: boolean;
    predefinedValue?: string;
}

export interface ParameterDefinition {
    id: string;
    label: string;
    type: ParameterValueType;
    constraints?: ParameterConstraint;
    engTerm: string;
    rusTerm: string;
}

// Locale parameter
export const localeParameters: ParameterDefinition[] = [
    {
        id: 'Locale',
        label: l10n.t('Language (Country)'),
        type: ParameterValueType.String,
        constraints: {
            optionalValues: false,
            values: [
                { value: 'af', label: l10n.t('Afrikaans') },
                { value: 'af_NA', label: l10n.t('Afrikaans (Namibia)') },
                { value: 'af_ZA', label: l10n.t('Afrikaans (South Africa)') },
                { value: 'am', label: l10n.t('Amharic') },
                { value: 'am_ET', label: l10n.t('Amharic (Ethiopia)') },
                { value: 'ar', label: l10n.t('Arabic') },
                { value: 'ar_AE', label: l10n.t('Arabic (United Arab Emirates)') },
                { value: 'ar_BH', label: l10n.t('Arabic (Bahrain)') },
                { value: 'ar_DZ', label: l10n.t('Arabic (Algeria)') },
                { value: 'ar_EG', label: l10n.t('Arabic (Egypt)') },
                { value: 'ar_IQ', label: l10n.t('Arabic (Iraq)') },
                { value: 'ar_JO', label: l10n.t('Arabic (Jordan)') },
                { value: 'ar_KW', label: l10n.t('Arabic (Kuwait)') },
                { value: 'ar_LB', label: l10n.t('Arabic (Lebanon)') },
                { value: 'ar_LY', label: l10n.t('Arabic (Libya)') },
                { value: 'ar_MA', label: l10n.t('Arabic (Morocco)') },
                { value: 'ar_OM', label: l10n.t('Arabic (Oman)') },
                { value: 'ar_QA', label: l10n.t('Arabic (Qatar)') },
                { value: 'ar_SA', label: l10n.t('Arabic (Saudi Arabia)') },
                { value: 'ar_SD', label: l10n.t('Arabic (Sudan)') },
                { value: 'ar_SY', label: l10n.t('Arabic (Syria)') },
                { value: 'ar_TN', label: l10n.t('Arabic (Tunisia)') },
                { value: 'ar_YE', label: l10n.t('Arabic (Yemen)') },
                { value: 'as', label: l10n.t('Assamese') },
                { value: 'as_IN', label: l10n.t('Assamese (India)') },
                { value: 'az', label: l10n.t('Azerbaijani') },
                { value: 'az_AZ', label: l10n.t('Azerbaijani (Azerbaijan)') },
                { value: 'az_Cyrl', label: l10n.t('Azerbaijani (Cyrillic)') },
                { value: 'az_Cyrl_AZ', label: l10n.t('Azerbaijani (Cyrillic, Azerbaijan)') },
                { value: 'az_Latn', label: l10n.t('Azerbaijani (Latin)') },
                { value: 'az_Latn_AZ', label: l10n.t('Azerbaijani (Latin, Azerbaijan)') },
                { value: 'be', label: l10n.t('Belarusian') },
                { value: 'be_BY', label: l10n.t('Belarusian (Belarus)') },
                { value: 'bg', label: l10n.t('Bulgarian') },
                { value: 'bg_BG', label: l10n.t('Bulgarian (Bulgaria)') },
                { value: 'bn', label: l10n.t('Bengali') },
                { value: 'bn_IN', label: l10n.t('Bengali (India)') },
                { value: 'ca', label: l10n.t('Catalan') },
                { value: 'ca_ES', label: l10n.t('Catalan (Spain)') },
                { value: 'cs', label: l10n.t('Czech') },
                { value: 'cs_CZ', label: l10n.t('Czech (Czech Republic)') },
                { value: 'cy', label: l10n.t('Welsh') },
                { value: 'cy_GB', label: l10n.t('Welsh (United Kingdom)') },
                { value: 'da', label: l10n.t('Danish') },
                { value: 'da_DK', label: l10n.t('Danish (Denmark)') },
                { value: 'de', label: l10n.t('German') },
                { value: 'de_AT', label: l10n.t('German (Austria)') },
                { value: 'de_BE', label: l10n.t('German (Belgium)') },
                { value: 'de_CH', label: l10n.t('German (Switzerland)') },
                { value: 'de_DE', label: l10n.t('German (Germany)') },
                { value: 'de_LI', label: l10n.t('German (Liechtenstein)') },
                { value: 'de_LU', label: l10n.t('German (Luxembourg)') },
                { value: 'el', label: l10n.t('Greek') },
                { value: 'el_CY', label: l10n.t('Greek (Cyprus)') },
                { value: 'el_GR', label: l10n.t('Greek (Greece)') },
                { value: 'en', label: l10n.t('English') },
                { value: 'en_AU', label: l10n.t('English (Australia)') },
                { value: 'en_BE', label: l10n.t('English (Belgium)') },
                { value: 'en_BW', label: l10n.t('English (Botswana)') },
                { value: 'en_BZ', label: l10n.t('English (Belize)') },
                { value: 'en_CA', label: l10n.t('English (Canada)') },
                { value: 'en_GB', label: l10n.t('English (United Kingdom)') },
                { value: 'en_HK', label: l10n.t('English (Hong Kong SAR China)') },
                { value: 'en_IE', label: l10n.t('English (Ireland)') },
                { value: 'en_IN', label: l10n.t('English (India)') },
                { value: 'en_JM', label: l10n.t('English (Jamaica)') },
                { value: 'en_MH', label: l10n.t('English (Marshall Islands)') },
                { value: 'en_MT', label: l10n.t('English (Malta)') },
                { value: 'en_NA', label: l10n.t('English (Namibia)') },
                { value: 'en_NZ', label: l10n.t('English (New Zealand)') },
                { value: 'en_PH', label: l10n.t('English (Philippines)') },
                { value: 'en_PK', label: l10n.t('English (Pakistan)') },
                { value: 'en_SG', label: l10n.t('English (Singapore)') },
                { value: 'en_TT', label: l10n.t('English (Trinidad and Tobago)') },
                { value: 'en_US', label: l10n.t('English (United States)') },
                { value: 'en_US_POSIX', label: l10n.t('English (United States, Computer)') },
                { value: 'en_VI', label: l10n.t('English (U.S. Virgin Islands)') },
                { value: 'en_ZA', label: l10n.t('English (South Africa)') },
                { value: 'en_ZW', label: l10n.t('English (Zimbabwe)') },
                { value: 'es', label: l10n.t('Spanish') },
                { value: 'es_AR', label: l10n.t('Spanish (Argentina)') },
                { value: 'es_BO', label: l10n.t('Spanish (Bolivia)') },
                { value: 'es_CL', label: l10n.t('Spanish (Chile)') },
                { value: 'es_CO', label: l10n.t('Spanish (Colombia)') },
                { value: 'es_CR', label: l10n.t('Spanish (Costa Rica)') },
                { value: 'es_DO', label: l10n.t('Spanish (Dominican Republic)') },
                { value: 'es_EC', label: l10n.t('Spanish (Ecuador)') },
                { value: 'es_ES', label: l10n.t('Spanish (Spain)') },
                { value: 'es_GT', label: l10n.t('Spanish (Guatemala)') },
                { value: 'es_HN', label: l10n.t('Spanish (Honduras)') },
                { value: 'es_MX', label: l10n.t('Spanish (Mexico)') },
                { value: 'es_NI', label: l10n.t('Spanish (Nicaragua)') },
                { value: 'es_PA', label: l10n.t('Spanish (Panama)') },
                { value: 'es_PE', label: l10n.t('Spanish (Peru)') },
                { value: 'es_PR', label: l10n.t('Spanish (Puerto Rico)') },
                { value: 'es_PY', label: l10n.t('Spanish (Paraguay)') },
                { value: 'es_SV', label: l10n.t('Spanish (El Salvador)') },
                { value: 'es_US', label: l10n.t('Spanish (United States)') },
                { value: 'es_UY', label: l10n.t('Spanish (Uruguay)') },
                { value: 'es_VE', label: l10n.t('Spanish (Venezuela)') },
                { value: 'et', label: l10n.t('Estonian') },
                { value: 'et_EE', label: l10n.t('Estonian (Estonia)') },
                { value: 'eu', label: l10n.t('Basque') },
                { value: 'eu_ES', label: l10n.t('Basque (Spain)') },
                { value: 'fa', label: l10n.t('Persian') },
                { value: 'fa_AF', label: l10n.t('Persian (Afghanistan)') },
                { value: 'fa_IR', label: l10n.t('Persian (Iran)') },
                { value: 'fi', label: l10n.t('Finnish') },
                { value: 'fi_FI', label: l10n.t('Finnish (Finland)') },
                { value: 'fo', label: l10n.t('Faroese') },
                { value: 'fo_FO', label: l10n.t('Faroese (Faroe Islands)') },
                { value: 'fr', label: l10n.t('French') },
                { value: 'fr_BE', label: l10n.t('French (Belgium)') },
                { value: 'fr_CA', label: l10n.t('French (Canada)') },
                { value: 'fr_CH', label: l10n.t('French (Switzerland)') },
                { value: 'fr_FR', label: l10n.t('French (France)') },
                { value: 'fr_LU', label: l10n.t('French (Luxembourg)') },
                { value: 'fr_MC', label: l10n.t('French (Monaco)') },
                { value: 'fr_SN', label: l10n.t('French (Senegal)') },
                { value: 'ga', label: l10n.t('Irish') },
                { value: 'ga_IE', label: l10n.t('Irish (Ireland)') },
                { value: 'gl', label: l10n.t('Galician') },
                { value: 'gl_ES', label: l10n.t('Galician (Spain)') },
                { value: 'gu', label: l10n.t('Gujarati') },
                { value: 'gu_IN', label: l10n.t('Gujarati (India)') },
                { value: 'he', label: l10n.t('Hebrew') },
                { value: 'he_IL', label: l10n.t('Hebrew (Israel)') },
                { value: 'hi', label: l10n.t('Hindi') },
                { value: 'hi_IN', label: l10n.t('Hindi (India)') },
                { value: 'hr', label: l10n.t('Croatian') },
                { value: 'hr_HR', label: l10n.t('Croatian (Croatia)') },
                { value: 'hu', label: l10n.t('Hungarian') },
                { value: 'hu_HU', label: l10n.t('Hungarian (Hungary)') },
                { value: 'hy', label: l10n.t('Armenian') },
                { value: 'hy_AM', label: l10n.t('Armenian (Armenia)') },
                { value: 'hy_AM_REVISED', label: l10n.t('Armenian (Armenia, Revised Orthography)') },
                { value: 'id', label: l10n.t('Indonesian') },
                { value: 'id_ID', label: l10n.t('Indonesian (Indonesia)') },
                { value: 'is', label: l10n.t('Icelandic') },
                { value: 'is_IS', label: l10n.t('Icelandic (Iceland)') },
                { value: 'it', label: l10n.t('Italian') },
                { value: 'it_CH', label: l10n.t('Italian (Switzerland)') },
                { value: 'it_IT', label: l10n.t('Italian (Italy)') },
                { value: 'ja', label: l10n.t('Japanese') },
                { value: 'ja_JP', label: l10n.t('Japanese (Japan)') },
                { value: 'ka', label: l10n.t('Georgian') },
                { value: 'ka_GE', label: l10n.t('Georgian (Georgia)') },
                { value: 'kk', label: l10n.t('Kazakh') },
                { value: 'kk_KZ', label: l10n.t('Kazakh (Kazakhstan)') },
                { value: 'kl', label: l10n.t('Kalaallisut') },
                { value: 'kl_GL', label: l10n.t('Kalaallisut (Greenland)') },
                { value: 'kn', label: l10n.t('Kannada') },
                { value: 'kn_IN', label: l10n.t('Kannada (India)') },
                { value: 'ko', label: l10n.t('Korean') },
                { value: 'ko_KR', label: l10n.t('Korean (South Korea)') },
                { value: 'kok', label: l10n.t('Konkani') },
                { value: 'kok_IN', label: l10n.t('Konkani (India)') },
                { value: 'lt', label: l10n.t('Lithuanian') },
                { value: 'lt_LT', label: l10n.t('Lithuanian (Lithuania)') },
                { value: 'lv', label: l10n.t('Latvian') },
                { value: 'lv_LV', label: l10n.t('Latvian (Latvia)') },
                { value: 'mk', label: l10n.t('Macedonian') },
                { value: 'mk_MK', label: l10n.t('Macedonian (Macedonia)') },
                { value: 'ml', label: l10n.t('Malayalam') },
                { value: 'ml_IN', label: l10n.t('Malayalam (India)') },
                { value: 'mn', label: l10n.t('Mongolian') },
                { value: 'mn_Cyrl', label: l10n.t('Mongolian (Cyrillic)') },
                { value: 'mn_MN', label: l10n.t('Mongolian (Mongolia)') },
                { value: 'mn_Mong', label: l10n.t('Mongolian (Mongolian)') },
                { value: 'mn_Mong_CN', label: l10n.t('Mongolian (Mongolian, China)') },
                { value: 'mr', label: l10n.t('Marathi') },
                { value: 'mr_IN', label: l10n.t('Marathi (India)') },
                { value: 'ms', label: l10n.t('Malay') },
                { value: 'ms_BN', label: l10n.t('Malay (Brunei)') },
                { value: 'ms_MY', label: l10n.t('Malay (Malaysia)') },
                { value: 'mt', label: l10n.t('Maltese') },
                { value: 'mt_MT', label: l10n.t('Maltese (Malta)') },
                { value: 'nb', label: l10n.t('Norwegian Bokmål') },
                { value: 'nb_NO', label: l10n.t('Norwegian Bokmål (Norway)') },
                { value: 'nl', label: l10n.t('Dutch') },
                { value: 'nl_BE', label: l10n.t('Dutch (Belgium)') },
                { value: 'nl_NL', label: l10n.t('Dutch (Netherlands)') },
                { value: 'nn', label: l10n.t('Norwegian Nynorsk') },
                { value: 'nn_NO', label: l10n.t('Norwegian Nynorsk (Norway)') },
                { value: 'om', label: l10n.t('Oromo') },
                { value: 'om_ET', label: l10n.t('Oromo (Ethiopia)') },
                { value: 'om_KE', label: l10n.t('Oromo (Kenya)') },
                { value: 'or', label: l10n.t('Oriya') },
                { value: 'or_IN', label: l10n.t('Oriya (India)') },
                { value: 'pa', label: l10n.t('Punjabi') },
                { value: 'pa_IN', label: l10n.t('Punjabi (India)') },
                { value: 'pl', label: l10n.t('Polish') },
                { value: 'pl_PL', label: l10n.t('Polish (Poland)') },
                { value: 'ps', label: l10n.t('Pashto') },
                { value: 'ps_AF', label: l10n.t('Pashto (Afghanistan)') },
                { value: 'pt', label: l10n.t('Portuguese') },
                { value: 'pt_BR', label: l10n.t('Portuguese (Brazil)') },
                { value: 'pt_PT', label: l10n.t('Portuguese (Portugal)') },
                { value: 'ro', label: l10n.t('Romanian') },
                { value: 'ro_RO', label: l10n.t('Romanian (Romania)') },
                { value: 'ru', label: l10n.t('Russian') },
                { value: 'ru_RU', label: l10n.t('Russian (Russia)') },
                { value: 'ru_UA', label: l10n.t('Russian (Ukraine)') },
                { value: 'sk', label: l10n.t('Slovak') },
                { value: 'sk_SK', label: l10n.t('Slovak (Slovakia)') },
                { value: 'sl', label: l10n.t('Slovenian') },
                { value: 'sl_SI', label: l10n.t('Slovenian (Slovenia)') },
                { value: 'so', label: l10n.t('Somali') },
                { value: 'so_DJ', label: l10n.t('Somali (Djibouti)') },
                { value: 'so_ET', label: l10n.t('Somali (Ethiopia)') },
                { value: 'so_KE', label: l10n.t('Somali (Kenya)') },
                { value: 'so_SO', label: l10n.t('Somali (Somalia)') },
                { value: 'sq', label: l10n.t('Albanian') },
                { value: 'sq_AL', label: l10n.t('Albanian (Albania)') },
                { value: 'sr', label: l10n.t('Serbian') },
                { value: 'sr_BA', label: l10n.t('Serbian (Bosnia and Herzegovina)') },
                { value: 'sr_CS', label: l10n.t('Serbian (Serbia and Montenegro)') },
                { value: 'sr_Cyrl', label: l10n.t('Serbian (Cyrillic)') },
                { value: 'sr_Cyrl_BA', label: l10n.t('Serbian (Cyrillic, Bosnia and Herzegovina)') },
                { value: 'sr_Cyrl_CS', label: l10n.t('Serbian (Cyrillic, Serbia and Montenegro)') },
                { value: 'sr_Cyrl_ME', label: l10n.t('Serbian (Cyrillic, Montenegro)') },
                { value: 'sr_Cyrl_RS', label: l10n.t('Serbian (Cyrillic, Serbia)') },
                { value: 'sr_Latn', label: l10n.t('Serbian (Latin)') },
                { value: 'sr_Latn_BA', label: l10n.t('Serbian (Latin, Bosnia and Herzegovina)') },
                { value: 'sr_Latn_CS', label: l10n.t('Serbian (Latin, Serbia and Montenegro)') },
                { value: 'sr_Latn_ME', label: l10n.t('Serbian (Latin, Montenegro)') },
                { value: 'sr_Latn_RS', label: l10n.t('Serbian (Latin, Serbia)') },
                { value: 'sr_ME', label: l10n.t('Serbian (Montenegro)') },
                { value: 'sr_RS', label: l10n.t('Serbian (Serbia)') },
                { value: 'sv', label: l10n.t('Swedish') },
                { value: 'sv_FI', label: l10n.t('Swedish (Finland)') },
                { value: 'sv_SE', label: l10n.t('Swedish (Sweden)') },
                { value: 'sw', label: l10n.t('Swahili') },
                { value: 'sw_KE', label: l10n.t('Swahili (Kenya)') },
                { value: 'sw_TZ', label: l10n.t('Swahili (Tanzania)') },
                { value: 'ta', label: l10n.t('Tamil') },
                { value: 'ta_IN', label: l10n.t('Tamil (India)') },
                { value: 'te', label: l10n.t('Telugu') },
                { value: 'te_IN', label: l10n.t('Telugu (India)') },
                { value: 'th', label: l10n.t('Thai') },
                { value: 'th_TH', label: l10n.t('Thai (Thailand)') },
                { value: 'ti', label: l10n.t('Tigrinya') },
                { value: 'ti_ER', label: l10n.t('Tigrinya (Eritrea)') },
                { value: 'ti_ET', label: l10n.t('Tigrinya (Ethiopia)') },
                { value: 'tk', label: l10n.t('Turkmen') },
                { value: 'tk_TM', label: l10n.t('Turkmen (Turkmenistan)') },
                { value: 'tr', label: l10n.t('Turkish') },
                { value: 'tr_TR', label: l10n.t('Turkish (Turkey)') },
                { value: 'uk', label: l10n.t('Ukrainian') },
                { value: 'uk_UA', label: l10n.t('Ukrainian (Ukraine)') },
                { value: 'ur', label: l10n.t('Urdu') },
                { value: 'ur_PK', label: l10n.t('Urdu (Pakistan)') },
                { value: 'uz', label: l10n.t('Uzbek') },
                { value: 'uz_Cyrl', label: l10n.t('Uzbek (Cyrillic)') },
                { value: 'uz_Cyrl_UZ', label: l10n.t('Uzbek (Cyrillic, Uzbekistan)') },
                { value: 'uz_Latn', label: l10n.t('Uzbek (Latin)') },
                { value: 'uz_Latn_UZ', label: l10n.t('Uzbek (Latin, Uzbekistan)') },
                { value: 'uz_UZ', label: l10n.t('Uzbek (Uzbekistan)') },
                { value: 'vi', label: l10n.t('Vietnamese') },
                { value: 'vi_VN', label: l10n.t('Vietnamese (Vietnam)') },
                { value: 'zh', label: l10n.t('Chinese') },
                { value: 'zh_CN', label: l10n.t('Chinese (China)') },
                { value: 'zh_Hans', label: l10n.t('Chinese (Simplified Han)') },
                { value: 'zh_Hans_CN', label: l10n.t('Chinese (Simplified Han, China)') },
                { value: 'zh_Hans_SG', label: l10n.t('Chinese (Simplified Han, Singapore)') },
                { value: 'zh_Hant', label: l10n.t('Chinese (Traditional Han)') },
                { value: 'zh_Hant_HK', label: l10n.t('Chinese (Traditional Han, Hong Kong SAR China)') },
                { value: 'zh_Hant_MO', label: l10n.t('Chinese (Traditional Han, Macau SAR China)') },
                { value: 'zh_Hant_TW', label: l10n.t('Chinese (Traditional Han, Taiwan)') },
                { value: 'zh_HK', label: l10n.t('Chinese (Hong Kong SAR China)') },
                { value: 'zh_MO', label: l10n.t('Chinese (Macau SAR China)') },
                { value: 'zh_SG', label: l10n.t('Chinese (Singapore)') },
                { value: 'zh_TW', label: l10n.t('Chinese (Taiwan)') }
            ]
        },
        engTerm: 'L',
        rusTerm: 'Л'
    }
];

// Number parameters
export const numberParameters: ParameterDefinition[] = [
    {
        id: 'Length',
        label: l10n.t('Length'),
        type: ParameterValueType.Number,
        constraints: { min: 1, max: 9999999999, predefinedValue: "1" },
        engTerm: 'ND',
        rusTerm: 'ЧЦ'
    },
    {
        id: 'Acc',
        label: l10n.t('Precision'),
        type: ParameterValueType.Number,
        constraints: { min: 0, max: 9999999999, predefinedValue: "0" },
        engTerm: 'NFD',
        rusTerm: 'ЧДЦ'
    },
    {
        id: 'Shift',
        label: l10n.t('Shift'),
        type: ParameterValueType.Number,
        constraints: { min: -999999999, max: 999999999, predefinedValue: "0" },
        engTerm: 'NS',
        rusTerm: 'ЧС'
    },
    {
        id: 'AccDelimeter',
        label: l10n.t('Decimal separator'),
        type: ParameterValueType.String,
        constraints: {
            maxLength: 1,
            values: [
                { value: '', label: l10n.t('<empty>') },
                { value: '.' },
                { value: ',' }
            ],
            optionalValues: true
        },
        engTerm: 'NDS',
        rusTerm: 'ЧРД'
    },
    {
        id: 'GroupDelimeter',
        label: l10n.t('Thousands separator'),
        type: ParameterValueType.String,
        constraints: {
            maxLength: 1,
            values: [
                { value: '', label: l10n.t('<empty>') },
                { value: ' ' },
                { value: '.' },
                { value: ',' }],
            optionalValues: true
        },
        engTerm: 'NGS',
        rusTerm: 'ЧРГ'
    },
    {
        id: 'Grouping',
        label: l10n.t('Grouping'),
        type: ParameterValueType.String,
        constraints: {
            values: [
                { value: '', label: l10n.t('<empty>') },
                { value: '0', label: '0 : 123456789' },
                { value: '3,0', label: '3,0 : 123 456 789' },
                { value: '3,2,0', label: '3,2,0 : 12 34 56 789' }
            ],
            optionalValues: true
        },
        engTerm: 'NG',
        rusTerm: 'ЧГ'
    },
    {
        id: 'NullPresentation',
        label: l10n.t('Zero presentation'),
        type: ParameterValueType.String,
        constraints: {
            values: [
                { value: '', label: l10n.t('<empty>') },
                { value: '-' },
                { value: l10n.t('Zero') },
                { value: l10n.t('None') },
                { value: l10n.t('Not filled') },
                { value: l10n.t('Enter!!!') },
                { value: l10n.t('Empty') }],
            optionalValues: true
        },
        engTerm: 'NZ',
        rusTerm: 'ЧН'
    },
    {
        id: 'Negative',
        label: l10n.t('Negative numbers representation'),
        type: ParameterValueType.Number,
        constraints: {
            min: 0,
            max: 4,
            values: [
                { value: '', label: l10n.t('<empty>') },
                { value: '0', label: '0 : (1,1)' },
                { value: '1', label: '1 : -1,1' },
                { value: '2', label: '2 : - 1,1' },
                { value: '3', label: '3 : 1,1-' },
                { value: '4', label: '4 : 1,1 -' }],
            optionalValues: false
        },
        engTerm: 'NN',
        rusTerm: 'ЧО'
    },
    {
        id: 'LeadingNulls',
        label: l10n.t('Display leading zeros'),
        type: ParameterValueType.Boolean,
        engTerm: 'NLZ',
        rusTerm: 'ЧВН'
    },
    {
        id: 'NumberFormatStr',
        label: l10n.t('Number format template'),
        type: ParameterValueType.String,
        constraints: {
            predefinedValue: l10n.t('N')
        },
        engTerm: 'NF',
        rusTerm: 'ЧФ'
    }
];

// Date parameters
export const dateParameters: ParameterDefinition[] = [
    {
        id: 'DateFormat',
        label: l10n.t('Date format'),
        type: ParameterValueType.String,
        constraints: {
            values: [
                { value: '', label: l10n.t('<empty>') },
                { value: 'dd.MM.yyyy' },
                { value: 'dd.MM.yy' },
                { value: 'd.M.yy' },
                { value: 'dd/MM/yy' },
                { value: 'yyyy-MM-dd' }
            ],
            optionalValues: true
        },
        engTerm: 'DF',
        rusTerm: 'ДФ'
    },
    {
        id: 'LocalDateFormat',
        label: l10n.t('Local date format'),
        type: ParameterValueType.String,
        constraints: {
            values: [
                { value: '', label: l10n.t('<empty>') },
                { value: 'D' },
                { value: 'DD' },
                { value: 'DT' },
                { value: 'DDT' },
                { value: 'T' }
            ],
            optionalValues: false
        },
        engTerm: 'DLF',
        rusTerm: 'ДЛФ'
    },
    {
        id: 'EmptyDatePresentation',
        label: l10n.t('Empty date presentation'),
        type: ParameterValueType.String,
        constraints: {
            values: [
                { value: '', label: l10n.t('<empty>') },
                { value: '-' },
                { value: l10n.t('No date') },
                { value: l10n.t('Blank date') },
            ],
            optionalValues: true
        },
        engTerm: 'DE',
        rusTerm: 'ДП'
    }
];

// Boolean parameters
export const booleanParameters: ParameterDefinition[] = [
    {
        id: 'FalsePresentation',
        label: l10n.t('Boolean value presentation False'),
        type: ParameterValueType.String,
        constraints: {
            values: [
                { value: '', label: l10n.t('<empty>') },
                { value: l10n.t('False') },
                { value: l10n.t('No') },
                { value: l10n.t('Off') }
            ],
            optionalValues: true
        },
        engTerm: 'BF',
        rusTerm: 'БЛ'
    },
    {
        id: 'TruePresentation',
        label: l10n.t('Boolean value presentation True'),
        type: ParameterValueType.String,
        constraints: {
            values: [
                { value: '', label: l10n.t('<empty>') },
                { value: l10n.t('True') },
                { value: l10n.t('Yes') },
                { value: l10n.t('On') }
            ],
            optionalValues: true
        },
        engTerm: 'BT',
        rusTerm: 'БИ'
    }
];