import { authActions } from '../Types'
import { takeLatest, all, call, put } from 'redux-saga/effects'
import { auth, handleProfile, getCurrentUser } from '../../firebase/utils'
import { loginSuccess, logoutSuccess } from '../Actions'

// Firestore Helper
export function* getUserDataFromFirestoreDB(userAuth, additionalData) {
    try {
        const userRef = yield call(handleProfile, {userAuth, additionalData})
        const user = yield userRef.get()
        yield put(loginSuccess({
            id: user.id,
            ...user.data(),
        }))
    } catch (err) { console.log(err) }
} 

// Email Sign
export function* emailSignIn ({ payload: {email, password} }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getUserDataFromFirestoreDB(user)
    } catch (err) { console.log(err) }
}
export function* onEmailSignIn () {
    yield takeLatest(authActions.LOGIN_START, emailSignIn)
}

// Sign Up / Register
export function* createUser ({ payload: {email, password, displayName} }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password)
        yield getUserDataFromFirestoreDB(user)
    } catch (err) { console.log(err) }
}
export function* onSignUp () {
    yield takeLatest(authActions.SIGN_UP_START, createUser)
}

// Persist User Login
export function* isAuthenticated () {
    try {
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
        call(onSignUp),
        call(onCheckUserSession),
        call(onLogout),
    ])
}