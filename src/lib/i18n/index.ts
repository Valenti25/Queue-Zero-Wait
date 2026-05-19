import { en } from "./messages/en";
import { th } from "./messages/th";

type DeepString<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly DeepString<U>[]
    : T extends object
      ? { [K in keyof T]: DeepString<T[K]> }
      : T;

export type Messages = DeepString<typeof en>;
export type Locale = "en" | "th";

export const locales: Locale[] = ["en", "th"];
export const defaultLocale: Locale = "th";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  th: "ไทย",
};

const dictionaries: Record<Locale, Messages> = { en, th };

export function getDictionary(locale: Locale): Messages {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export { en, th };
