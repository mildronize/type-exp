export function isPrimitive<T>(Object: T): boolean {
  if (Object === 'string') return true;
  if (Object === 'symbol') return true;
  if (Object === 'number') return true;
  return false;
}

export type KeyValueFn = (element: any, index: any) => [keyof any, keyof any];

export function map<T extends any[]>(array: T, mapping: KeyValueFn): any {
  return array.reduce(function (result: any, _value: any, _index: any) {
    const [key, value] = mapping(_value, _index);
    result[key] = value;
    return result;
  }, {});
}

export type keyof<T> = T[];

export function string(): string {
  return 'string';
}

export function number(): string {
  return 'number';
}

export function boolean(): string {
  return 'boolean';
}

export function union(...types: (keyof any)[]): (keyof any)[]{
  return types;
}

export function intersect(...types: (keyof any)[]): (keyof any)[]{
  return types;
}
