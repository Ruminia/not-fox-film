// npm i zustand // label litte Global State Management Library
//or if u want u can implement this with reac context or redux :)
import { create } from 'zustand';

export interface ModalStoreInterface {
    movieId?: string;
    isOpen: boolean;
    openModal: ( movieId: string ) => void;
    closeModal: () => void;

};

const useInfoModal = create<ModalStoreInterface>((set) => ({
    movieId: undefined,
    isOpen: false,
    openModal: ( movieId: string ) => set({ isOpen: true, movieId: movieId }),
    closeModal: () => set({ isOpen: false, movieId: undefined }),
}));

export default useInfoModal;

// (): function
// {}: object
// []: array