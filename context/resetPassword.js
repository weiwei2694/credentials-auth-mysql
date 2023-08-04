import { create } from 'zustand'

const useOtp = create((set) => ({
  validOtp: false,
  currentPage: '',
  setValidOtp: () => set(state => ({ ...state, validOtp: !state.validOtp })),
  setCurrentPage: ({ newCurrentPage }) => set(state => ({ ...state, currentPage: newCurrentPage })),
}))

export {
    useOtp
}