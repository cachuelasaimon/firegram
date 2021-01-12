import React, { useState, useEffect } from 'react'
import { storage, firestore } from '../firebase/utils'

// Storage 
const useStorage = (file) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(async()=>{
       // Set Ref
        const storageRef = storage.ref(file.name)
        const collectionRef = firestore.collection("pictures")
        
        // Put File in the firebase storage
        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage)
        }, (err)=>{
            setError(err)
        }, async () => {
            // get url of image
            const url = await storageRef.getDownloadURL()
            let timestamp = new Date()
            collectionRef.add({url, createdAt: timestamp})
            setUrl(url)            
        })
    },[file])
    return { progress, url, error }
}

export default useStorage