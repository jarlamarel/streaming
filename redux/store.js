import { configureStore } from '@reduxjs/toolkit'
import { authenticationSlice } from './reducers/authentication'

export const store = configureStore({
    reducer: authenticationSlice.reducer
})