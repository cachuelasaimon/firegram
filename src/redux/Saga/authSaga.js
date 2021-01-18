import { authActions, LOGOUT } from '../Types'
import { takeLatest, all, call, put } from 'redux-saga/effects'
import { auth, handleProfile, getCurrentUser } from '../../firebase/utils'
import { loginSuccess, logoutSuccess } from '../Actions'

export function* getUserDataFromFirestoreDB(userAuth, additionalData) {
    try {
        const userRef = yield call(handleProfile, { userAuth, additionalData })
        const user = yield userRef.get()
        yield put( 
            loginSuccess({
                id: user.id,
                ...user.data()
            })
        )
    } catch (err) { console.log(err) }
}

// Login
export function* emailLogin ({ payload: {email, password} }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getUserDataFromFirestoreDB(user)
    } catch (err) { console.log(err) }
} 
export function* onEmailSignIn () {
    yield takeLatest(authActions.LOGIN_START, emailLogin)
}

// User sign up
export function* createUser ({ payload: {email, password, displayName} }) {
    try {
        console.log('authSaga/createUser')
        const { user } = yield auth.createUserWithEmailAndPassword(email, password)
        yield getUserDataFromFirestoreDB(user, {displayName} )
    } catch (err) { console.log(err) }
}
export function* onUserSignUp () {
    yield takeLatest(authActions.SIGN_UP_START, createUser)
}

// Check for logged-in user
export function* isAuthenticated () {
    try {
        console.log('authSaga/isAuthenticated')
        const user = yield getCurrentUser()
        if(!user) return
        yield getUserDataFromFirestoreDB(user)
    } catch (err) { console.log(err) }
}
export function* onCheckUserSession () {
    yield takeLatest(authActions.CHECK_USER_SESSION, isAuthenticated)
}

// Logout 
export function* logout () {
    try {
        yield auth.signOut()
        yield put(logoutSuccess())
    } catch (err) { console.log(err) }
}
export function* onLogout () {
    yield takeLatest(authActions.LOGOUT_START, logout)
}

export default function* authSaga () {
    yield all([
        call(onEmailSignIn),
        call(onUserSignUp),
        call(onLogout),
        call(onCheckUserSession),
    ])
}