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
