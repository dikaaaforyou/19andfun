import { writable } from 'svelte/store';

function createBgmStore() {
    const { subscribe, set, update } = writable({
        isPlaying: false, // Status musik (nyala/mati)
        isVisible: false  // Status tombol (muncul/sembunyi)
    });

    return {
        subscribe,
        play: () => update(s => ({ ...s, isPlaying: true })),
        pause: () => update(s => ({ ...s, isPlaying: false })),
        togglePlay: () => update(s => ({ ...s, isPlaying: !s.isPlaying })),
        showButton: () => update(s => ({ ...s, isVisible: true })),
        hideButton: () => update(s => ({ ...s, isVisible: false })),
        set // Biar bisa reset manual
    };
}

export const bgmStore = createBgmStore();