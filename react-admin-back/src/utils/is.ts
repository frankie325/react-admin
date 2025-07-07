export type PlainObject = Record<string, any>;

export function isObject(value: any): value is PlainObject {
  return Object.prototype.toString.call(value) === '[object Object]';
}
