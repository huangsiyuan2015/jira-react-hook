import { useEffect, useState } from "react";

const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "" || value === 0;

export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };

  Object.keys(result).forEach((key) => {
    let value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });

  return result;
};

// 自定义 hook
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
