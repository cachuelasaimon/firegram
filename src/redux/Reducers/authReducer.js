import { authActions } from '../Types'

const initialState = {
    currentUser: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case authActions.LOGIN_SUCCESS: 
        return {
            ...state,
            currentUser: action.payload
        }
        case authActions.LOGOUT_SUCCESS: 
        return {
            ...state,
            currentUser: null,
        }
        default: return state
    }
}