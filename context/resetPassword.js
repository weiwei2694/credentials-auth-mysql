import { create } from 'zustand'

const useOtp = create((set) => ({
  otp: {email: '', otp: '', expired: ''},
  validOtp: false,
  setOtp: (data) => set((state) => ({ ...state, otp: data })),
  setValidOtp: () => set(state => ({ ...state, validOtp: !state.validOtp }))
}))

export {
    useOtp
}