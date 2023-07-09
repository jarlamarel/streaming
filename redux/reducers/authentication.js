import { createSlice } from '@reduxjs/toolkit'
import { TOGGLE_AUTHENTICATION } from '../actions/authentication';

export const authenticationSlice = createSlice({
  name: 'isAuthenticatedValue',
  initialState: false,
  reducers: {
    toggleAuthentication(state, action) {
        switch(action.type){
            case TOGGLE_AUTHENTICATION:
                return{
                    ...state,
                    isAuthenticatedValue : !state.isAuthenticatedValue
                }
            default:
                    return {
                        ...state,
                        isAuthenticatedValue : !state.isAuthenticatedValue
                    }
        }
    }
  }
});


export const { toggleAuthentication } = authenticationSlice.actions





// import {TOGGLE_AUTHENTICATION} from '../actions/authentication'

// const initialState = {
//     isAuthenticatedValue: false
// }
// export default (state=initialState, action) => {
//     switch(action.type){
//         case TOGGLE_AUTHENTICATION:
//             return{
//                 ...state,
//                 isAuthenticatedValue : !state.isAuthenticatedValue
//             }
//         default:
//             return state
//     }
// }