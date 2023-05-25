import { v4 as uuidv4 } from 'uuid';

export type VDocKey = string | number;

export type VDoc<T> = T & { $key: VDocKey; $new: boolean };

export default function createVDoc<T>(
  model: T = {} as T,
  pk?: keyof T,
): VDoc<T> {
  return {
    $key: (typeof pk === 'string' && (model[pk] as any)) || uuidv4(),
    $new: !(typeof pk === 'string' && (model[pk] as any)),
    ...model,
  };
}
