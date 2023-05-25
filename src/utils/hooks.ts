import {
  Reducer,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';

import { equals, getRefObject } from './helpers';

export function useAlertError(error?: Error) {
  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);
}

interface UseHoverOptions {
  onHover?: () => void;
  onBlur?: () => void;
}

export function useHover<E extends HTMLElement = HTMLElement>(
  options: UseHoverOptions = {},
) {
  const { onHover, onBlur } = options;

  const onHoverRef = useRef(onHover);
  onHoverRef.current = onHover;
  const onBlurRef = useRef(onBlur);
  onBlurRef.current = onBlur;

  const ref = useRef<E>(null);
  const [hover, setHover] = useState(false);

  const enterTimer = useRef<number>();
  const leaveTimer = useRef<number>();

  useEffect(() => {
    const refObject = getRefObject(ref);
    const element = refObject?.current;

    if (!element) {
      return;
    }
    const clearTimer = () => {
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      enterTimer.current = void 0;
      leaveTimer.current = void 0;
    };

    const handleMouseEnter = () => {
      clearTimer();
      enterTimer.current = window.setTimeout(() => {
        clearTimer();
        setHover(true);
        if (onHoverRef.current) {
          onHoverRef.current();
        }
      });
    };
    const handleMouseLeave = () => {
      clearTimer();
      leaveTimer.current = window.setTimeout(() => {
        clearTimer();
        setHover(false);
        if (onBlurRef.current) {
          onBlurRef.current();
        }
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimer();
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return [ref, hover] as const;
}

export function useActive<E extends HTMLElement>() {
  const ref = useRef<E>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const refObject = getRefObject(ref);
    const element = refObject?.current;
    if (!element) {
      return;
    }

    const handleMouseDown = () => setActive(true);
    const handleMouseUp = () => setActive(false);
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return [ref, active] as const;
}

/**
 * 只回傳最後一筆有資料的值
 * @param data
 */
export function useExistedData<T>(data: T) {
  const firstRunRef = useRef(true);
  const [state, dispatch] = useReducer<Reducer<T, T>, T>(
    existedDataReducer,
    data,
    existedDataInit,
  );

  useEffect(() => {
    if (firstRunRef.current) {
      firstRunRef.current = false;
      return;
    }
    dispatch(data);
  }, [data]);

  return [state, dispatch] as const;
}

function existedDataReducer<T>(state: T, action: T) {
  return action ?? state;
}

function existedDataInit<T>(action: T) {
  return action;
}

export function useEqual<T>(data: T) {
  const prevRef = useRef(data);

  const result = useMemo<T>(() => {
    if (!equals(prevRef.current, data)) {
      prevRef.current = data;
    }
    return prevRef.current;
  }, [data]);

  return [result] as const;
}

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 *
 * @param {function} fn
 */
export function useEventHandler<T extends unknown[]>(fn: (...args: T) => void) {
  const ref = useRef(fn);
  useLayoutEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args: T) => ref.current(...args), []);
}
