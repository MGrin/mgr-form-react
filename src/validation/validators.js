const numbersRegExp = /^\d+$/;
const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const numbers = val => numbersRegExp.test(val) ? null : 'Should be a number';
export const required = val => !val ? 'is required' : null;
export const email = val => emailRegExp.test(val) ? null : 'Email format is wrong';