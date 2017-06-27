// TODO: Define localStorage to avoid lint errors

export function getItem(key) {
  return new Promise((resolve, reject) => {
    resolve(localStorage.getItem(key));
  });
};

export function setItem(key, value) {
  return new Promise((resolve, reject) => {
    resolve(localStorage.setItem(key, value));
  });
};

export function removeItem(key) {
  return new Promise((resolve, reject) => {
    resolve(localStorage.removeItem(key));
  });
};

export function mergeItem(key) {
  throw new Error('Not implemented');
};

export function clear() {
  return new Promise((resolve, reject) => {
    resolve(localStorage.clear());
  });
};

export function getAllKeys() {
  return new Promise((resolve, reject) => {
    resolve(Object.keys(localStorage));
  });
};

export function flushGetRequests() {
  // No op
};

export function multiGet(keys) {
  return new Promise((resolve, reject) => {
    const pairs = [];

    keys.forEach(k => {
      pairs.push([k, localStorage.get(k)]);
    });

    resolve(pairs);
  });

};

export function multiSet(keyValuePairs) {
  return new Promise((resolve, reject) => {
    keyValuePairs.forEach(pair => {
      localStorage.set(pair[0], pair[1]);
    });
    resolve();
  });
};

export function multiRemove(keys) {
  return new Promise((resolve, reject) => {
    keys.forEach(localStorage.removeItem);
    resolve();
  });
};

export function multiMerge(keyValuePairs) {
  throw new Error('Not implemented');
};

export default {
  getItem,
  setItem,
  removeItem,
  mergeItem,
  clear,
  getAllKeys,
  flushGetRequests,
  multiGet,
  multiSet,
  multiRemove,
  multiMerge,
};
