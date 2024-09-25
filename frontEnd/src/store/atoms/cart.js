import { atom } from 'recoil';

export const cartAtom = atom({
    key: 'cartState', // unique ID (with respect to other atoms/selectors)
    default: [],      // default value (initial state)
  });
