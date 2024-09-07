// i18n.config.ts

export const locales = ['en-US', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = 'en-US';
