import { create } from 'zustand'

const useOtp = create((set) => ({
  currentPage: '',
  setCurrentPage: ({ newCurrentPage }) => set(state => ({ ...state, currentPage: newCurrentPage })),
}))

export {
    useOtp
}