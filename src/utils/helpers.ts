import { Ref, RefObject, memo } from 'react';

import { EnumType } from './types';

/** 是否為字串陣列 */
export function isStringArray(v: any): v is string[] {
  return Array.isArray(v) && v.every(v => typeof v === 'string');
}

/** 是否為數字陣列 */
export function isNumberArray(v: any): v is number[] {
  return Array.isArray(v) && v.every(v => typeof v === 'number');
}

/** 是否有重複的元素 */
export function isDuplicate<T>(arr: T[]): boolean {
  return arr.some((v, index) => {
    return arr.lastIndexOf(v) !== index;
  });
}

/**
 * 從原始陣列內刪除第一個一樣的元素
 * @param source 原始陣列
 * @param item 要被刪除的元素
 * @returns 如果有被刪除會回傳新陣列，否則為原始陣列
 */
export function removeFirst<T>(source: T[], item: T): T[] {
  const index = source.indexOf(item);
  return index === -1 ? source : removeAt(source, index);
}

/**
 * 從原始陣列內刪除指定位置的元素
 * @param source 原始陣列
 * @param index 要被刪除的位置
 * @returns 回傳新陣列
 */
export function removeAt<T>(source: T[], index: number): T[] {
  return source.slice(0, index).concat((source = source.slice(index + 1)));
}

/**
 * 從原始陣列內取代指定位置的元素
 * @param source 原始陣列
 * @param index 要被取代的位置
 * @param item 元素
 * @returns 回傳新陣列
 */
export function replaceAt<T>(source: T[], index: number, item: T): T[] {
  if (index === -1) {
    return source;
  }
  const newSource = [...source];
  newSource[index] = item;
  return newSource;
}

/**
 * 如果原始陣列沒有該元素就加入，有就刪除
 * @param source 原始陣列
 * @param item 元素
 * @returns 回傳新陣列
 */
export function toggleListItem<T>(source: T[], item: T): T[] {
  const index = source.indexOf(item);
  return index === -1 ? [...source, item] : removeAt(source, index);
}

/**
 * 如果原始陣列沒有該元素就加入
 * @param source 原始陣列
 * @param index 元素
 * @returns 有加入新元素就回傳新陣列，否則回傳原始陣列
 */
export function pushIfNotExist<T>(source: T[], item: T): T[] {
  const index = source.indexOf(item);
  return index === -1 ? [...source, item] : source;
}

/**
 * 檢查該物件有沒有該參數名稱
 * @param name 參數名稱
 * @param obj 物件
 */
export function propertyOf<T>(
  name: string,
  obj: T,
): name is Extract<keyof T, string> {
  return name in obj;
}

/**
 * 移除所有為 undefined 的元素
 * @param list 原始陣列
 */
export function truncateUndefined<T>(list: Array<T | undefined>): T[] {
  const newList: T[] = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item !== void 0) {
      newList.push(item);
    }
  }
  return newList;
}

/**
 * 移除所有為 undefined 或 null 的元素
 * @param list 原始陣列
 */
export function truncateNullable<T>(
  list: ReadonlyArray<T | undefined | null>,
): T[] {
  const newList: T[] = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item !== void 0 && item !== null) {
      newList.push(item);
    }
  }
  return newList;
}

/**
 * 取得 RefObject
 * @param ref
 */
export function getRefObject<T>(ref: Ref<T>): RefObject<T> | null {
  if (typeof ref === 'function') {
    ref(null);
    return null;
  }
  return ref;
}

export const typedMemo: <C>(c: C) => C = memo;

export function equals<T>(value: T, other: T, deep = false) {
  if (value === other) {
    return true;
  }

  if (!(value instanceof Object) || !(other instanceof Object)) {
    return false;
  }

  for (const key in value) {
    if (!{}.hasOwnProperty.call(value, key)) {
      continue;
    }
    if (!{}.hasOwnProperty.call(other, key)) {
      return false;
    }

    if (value[key] === other[key]) {
      continue;
    }

    if (deep && value[key] instanceof Object) {
      if (equals(value[key], other[key], deep)) {
        continue;
      }
    }
    return false;
  }

  for (const key in other) {
    if (!{}.hasOwnProperty.call(other, key)) {
      continue;
    }
    if (!{}.hasOwnProperty.call(value, key)) {
      return false;
    }
  }

  return true;
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}

export function isError(source: any): source is Error {
  return source instanceof Error;
}

export function isErrorArray(source: any): source is Error[] {
  return Array.isArray(source) && source.every(d => isError(d));
}

export interface ErrorLike {
  name: string;
  message: string;
}

export function isErrorLike(source: any): source is ErrorLike {
  return (
    typeof source === 'object' &&
    'name' in source &&
    typeof source.name === 'string' &&
    'message' in source &&
    typeof source.message === 'string'
  );
}

export function isErrorLikeArray(source: any): source is ErrorLike[] {
  return Array.isArray(source) && source.every(d => isErrorLike(d));
}

export function formatErrorMessage(source: unknown) {
  return isErrorLike(source)
    ? source.message
    : isErrorLikeArray(source)
    ? source.map(d => d.message).join('\n')
    : 'error occurred';
}

export async function waitPromisesFinish(promises: Array<Promise<unknown>>) {
  for (const promise of promises) {
    try {
      await promise;
    } catch {
      // Silent complete
    }
  }
}

export function isEnumValue<T>(
  source: any,
  enumType: EnumType<T>,
): source is T {
  return Object.values(enumType).includes(source);
}
