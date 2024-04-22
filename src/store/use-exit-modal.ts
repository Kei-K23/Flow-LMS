import { create } from 'zustand'

type ExistModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useExistModal = create<ExistModalState>(set => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}))