
export const getLocalStorageItem = (key) => {
    const item = window.localStorage.getItem(key);
    return item;
}

export const setLocalStorageItem = (key, value) => {
    window.localStorage.setItem(key, value);
}