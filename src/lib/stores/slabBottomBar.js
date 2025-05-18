import { writable } from 'svelte/store';

const initialState = {
  show: false,
  slabName: '',
  collectionName: ''
};

const { subscribe, set, update } = writable(initialState);

export const slabBottomBar = {
  subscribe,
  show: (slabName, collectionName) => {
    set({ show: true, slabName, collectionName });
  },
  hide: () => {
    set(initialState);
  }
}; 