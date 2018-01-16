const numbersRegExp = /^\d+$/;
const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const numbers = val => val && !numbersRegExp.test(val) ? 'Should be a number' : null;
export const required = val => !val ? 'is required' : null;
export const email = val => val && !emailRegExp.test(val) ? 'Email format is wrong' : null;