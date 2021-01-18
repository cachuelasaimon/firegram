import { authActions } from '../Types'

export const loginStart = ({ email, password}) => ({
    type: authActions.LOGIN_START,
    payload: {email, password}
})

export const loginSuccess = (user) => ({
    type: authActions.LOGIN_SUCCESS,
    payload: user
})

export const logout = () => ({
    type: authActions.LOGOUT_START,
})
export const logoutSuccess = () => ({
    type: authActions.LOGOUT_SUCCESS,
})

// export const signUpStart = ({email, password, displayName}) => ({
//     type: authActions.SIGN_UP_START,
//     payload: { email, password, displayName }
// })

export const signUpStart = ({email, password, displayName}) => ({
    type: authActions.SIGN_UP_START,
    payload: {email, password, displayName},
})

export const checkUserSession = () => ({
    type: authActions.CHECK_USER_SESSION,
})