import 'server-only';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  id: () => import('@/dictionaries/id.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const hasLocale = (locale?: string | null): locale is Locale =>
  Boolean(locale && (locale === 'en' || locale === 'id'));

export const getDictionary = async (locale: string) => {
  const targetLocale: Locale = hasLocale(locale) ? locale : 'en';
  return dictionaries[targetLocale]();
};
