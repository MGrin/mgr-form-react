export const compose = store => (fns = []) => val => transformToArray(fns).reduce((res, fn) => store.get(fn)(res), val);
export const transformToArray = (arr) => {
  let vals = arr;

  if (typeof(arr) === 'string') {
    vals = [arr];
  }

  return vals;
};

export const validateArrays = (store, arr, storename) => {
  const vals = transformToArray(arr);

  for (let j = 0; j < vals.length; j++) {
    if (!store.has(vals[j])) throw new Error(`Field on index ${j} requires unknow ${storename} ${vals[j]}. Did you registered it?`);
  }
};