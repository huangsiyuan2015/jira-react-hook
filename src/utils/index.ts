import { useEffect, useState } from "react";

const isFalsy = (value: any) => (value === 0 ? false : !value); // 排除 0

export const cleanObject = (obj: object) => {
  const result = { ...obj };

  Object.keys(result).forEach((key) => {
    // @ts-ignore
    if (isFalsy(result[key])) {
      // @ts-ignore
      delete result[key];
    }
  });

  return result;
};

// 自定义 hook
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value: any, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
