import 'server-only';

const dictionaries: { [key: string]: () => Promise<any> } = {
  'en-US': () =>
    import('./../../locales/en/common.json').then((module) => module.default),
  es: () =>
    import('./../../locales/es/common.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (locale === 'favicon.ico') {
    return {};
  }

  const validLangs = Object.keys(dictionaries);

  if (!validLangs.includes(locale)) {
    throw new Error(`Dictionary for language "${locale}" is not available.`);
  }

  const dictionaryLoader = dictionaries[locale];

  if (typeof dictionaryLoader !== 'function') {
    throw new Error(`Dictionary for language "${locale}" is not available.`);
  }

  return dictionaryLoader();
};
