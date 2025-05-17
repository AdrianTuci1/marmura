import { writable } from 'svelte/store';

// Initialize the store with data from localStorage if available
const storedWishlist = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('wishlist') || '[]') : [];
export const wishlist = writable(storedWishlist);

// Subscribe to store changes and update localStorage
if (typeof window !== 'undefined') {
    wishlist.subscribe(value => {
        localStorage.setItem('wishlist', JSON.stringify(value));
    });
}

// Helper functions to manage the wishlist
export const addToWishlist = (item) => {
    wishlist.update(items => {
        if (!items.find(i => i.id === item.id)) {
            return [...items, item];
        }
        return items;
    });
};

export const removeFromWishlist = (itemId) => {
    wishlist.update(items => items.filter(item => item.id !== itemId));
};

export const isInWishlist = (itemId) => {
    let found = false;
    wishlist.subscribe(items => {
        found = items.some(item => item.id === itemId);
    })();
    return found;
}; 