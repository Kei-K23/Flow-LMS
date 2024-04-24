import { create } from 'zustand'

type NoEnoughHeartsModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useNoEnoughHeartsModal = create<NoEnoughHeartsModalState>(set => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}))