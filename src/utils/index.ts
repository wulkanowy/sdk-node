export * from './links';
export * from './parsers';

export function notNil<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}
