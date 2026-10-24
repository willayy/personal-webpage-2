import en from '@/locales/en.json';
import sv from '@/locales/sv.json';

export type Language = 'en' | 'sv';

const dictionaries: Record<Language, Record<string, unknown>> = {
  en,
  sv,
};

function retrieveNestedValue(
  target: unknown,
  keySegment: string
): unknown {
  const isObject = typeof target === 'object' && target !== null;
  if (!isObject) {
    return undefined;
  }
  const record = target as Record<string, unknown>;
  return record[keySegment];
}

function extractTextByKey(dictionary: unknown, keyPath: string): string {
  const segments = keyPath.split('.');
  let current: unknown = dictionary;
  for (const segment of segments) {
    current = retrieveNestedValue(current, segment);
  }
  const isString = typeof current === 'string';
  const result = isString ? (current as string) : keyPath;
  return result;
}

export function formatTemplateWithParams(
  template: string,
  params: Record<string, string | number>
): string {
  const keys = Object.keys(params);
  let formatted = template;
  for (const key of keys) {
    const rawValue = params[key];
    const valueString = String(rawValue);
    const placeholder = `{${key}}`;
    formatted = formatted.replaceAll(placeholder, valueString);
  }
  return formatted;
}

export function translateByKey(
  language: Language,
  keyPath: string,
  params: Record<string, string | number> | null
): string {
  const dictionary = dictionaries[language];
  const template = extractTextByKey(dictionary, keyPath);
  if (!params) {
    return template;
  }
  const formatted = formatTemplateWithParams(template, params);
  return formatted;
}

export function extractDataByKey<T>(
  language: Language,
  keyPath: string
): T {
  const dictionary = dictionaries[language];
  const segments = keyPath.split('.');
  let current: unknown = dictionary;
  for (const segment of segments) {
    current = retrieveNestedValue(current, segment);
  }
  return current as T;
}
