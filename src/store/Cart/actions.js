import { ADD, REMOVE, CLEAR } from './constants';

export const addItem = payload => ({
    type: ADD,
    payload,
});

export const removeItem = payload => ({
    type: REMOVE,
    payload,
});

export const clearItem = () => ({
    type: CLEAR,
});
