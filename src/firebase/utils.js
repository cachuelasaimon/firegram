import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import { firebaseConfig } from './config'
import { useState, useEffect } from 'react'

// initialize App 
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
} else { firebase.app() }

// export Auth, Firestore, Storage
export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()

// Google Auth Provider SignIn
const GoogleAPI = new firebase.auth.GoogleAuthProvider()
GoogleAPI.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(GoogleAPI)

//handleProfile 
export const handleProfile = async (userAuth, additionalData) =>{
    if (!userAuth) { return }
    // take UID from userAuth (Google Sign In credentials)
    const { uid } = userAuth
    const userRef = firestore.doc(`users/${uid}`)
    // Check if user exists on firestore DB
    const user = await userRef.get()
    if (!user.exists) {
        // if user doesn't exist create one using Google Sign In Data
        const { displayName, email } = userAuth
        const timestamp = new Date()

        try { 
            // Create user 
            userRef.set({
                displayName,
                email,
                createdAt: timestamp,
                ...additionalData,
            })
        } catch (err) { console.log(err) }
    }
    return userRef
}

// Storage 
export const StoreImg = (file) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)
    
    useEffect(()=>{
        // Set Ref
        const storageRef = storage.ref(file.name)
        // Put File in the firebase storage
        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage)
        }, (err)=>{
            setError(err)
        }, async () => {
            // get url of image
            const url = await storageRef.getDownloadURL()
            setUrl(url)
        })
    },[file])
    return { progress, url, error }
}
