export const transformToArray = (arr) => {
  if (!arr) return [];

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

export const registerToStore = (store, storename, name, fn) => {
  if (!name) throw new Error(`Provide a ${storename} name`);
  if (!fn) throw new Error(`Provide a ${storename} function`);
  if (typeof(fn) !== 'function') throw new Error(`${storename} should be a function`);
  if (store.has(name)) console.warn(`${storename} called ${name} is already registered and will be overrided`);

  store.set(name, fn);
};

export const compose =
  store =>
    (fns = []) =>
      val => transformToArray(fns)
              .reduce((res, fn) => store.get(fn)(res), val);
