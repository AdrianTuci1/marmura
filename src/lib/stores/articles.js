import { writable } from 'svelte/store';

export const showFilters = writable(false);
export const gridView = writable('box');
export const selectedCategory = writable('all');
export const searchQuery = writable('');

export function toggleFilters() {
  showFilters.update(value => !value);
}

export function setCategory(category) {
  selectedCategory.set(category);
}

export function setGridView(view) {
  gridView.set(view);
} 