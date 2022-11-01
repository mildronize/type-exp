import { object, z } from 'zod';

export function isPrimitive<T>(Object: T): boolean {
  if (Object === 'string') return true;
  if (Object === 'symbol') return true;
  if (Object === 'number') return true;
  return false;
}

interface IModifierOption {
  readonly?: boolean;
}

class ModifierOption implements IModifierOption {
  readonly: boolean;

  constructor(option?: IModifierOption) {
    this.readonly = option?.readonly ?? false;
  }
}

export type CallbackFn = (element: any, index: any) => [keyof any, keyof any];
export type RecordCallbackFn = (elementKey: keyof any, elementValue: any, index: any) => [keyof any, keyof any];
// exprt type IsArray<T> = T extends unknown[] ? true : false;

// Overload signatures
export function map<T>(array: T[], mapping: CallbackFn, option?: IModifierOption): any;
export function map<T extends { [s: string]: unknown }>(
  array: T,
  mapping: RecordCallbackFn,
  option?: IModifierOption,
): any;

// Implementation signature
export function map(array: unknown, mapping: CallbackFn | RecordCallbackFn, option?: IModifierOption): any {
  const parsedOption = new ModifierOption(option);

  if (Array.isArray(array)) {
    return mapArray(array, mapping as CallbackFn); // Fix type later
  } else if (isRecord(array)) {
    return mapRecord(array, mapping as RecordCallbackFn); // Fix type later
  }
  throw new Error(`Input object doesn't support type`);
}

function mapArray<T>(array: T[], mapping: CallbackFn): any {
  return array.reduce(function (result: any, _value: any, _index: any) {
    const [key, value] = mapping(_value, _index);
    // TODO: Value is not directly value (e.g. { value, readonly: true })
    result[key] = value;
    return result;
  }, {});
}

function isRecord(object: unknown): object is Record<string, unknown> {
  const recordSchema = z.record(z.unknown());
  const result = recordSchema.safeParse(object);
  return result.success === true;
}

function mapRecord<T extends Record<string, unknown>>(object: T, mapping: RecordCallbackFn): any {
  return Object.entries(object).reduce(function (result: any, _value: [keyof any, any], _index: any) {
    const [ObjKey, ObjValue] = _value;
    const [key, value] = mapping(ObjKey, ObjValue, _index);
    // TODO: Value is not directly value (e.g. { value, readonly: true })
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

export function union(...types: (keyof any)[]): (keyof any)[] {
  return types;
}

export function intersect(...types: (keyof any)[]): (keyof any)[] {
  return types;
}
