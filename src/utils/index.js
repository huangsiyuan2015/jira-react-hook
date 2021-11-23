import { useEffect, useState } from "react";

const isFalsy = (value) => (value === 0 ? false : !value); // 排除 0

export const cleanObject = (obj) => {
  const result = { ...obj };

  Object.keys(result).forEach((key) => {
    if (isFalsy(result[key])) {
      delete result[key];
    }
  });

  return result;
};

// 自定义 hook
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value]);

  return debouncedValue;
};
