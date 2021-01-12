import React, { useState, useEffect } from 'react'
import { firestore, storage } from '../firebase/utils'

export const useStorage = (file) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(()=>{
        // Set Refs 
        const storageRef = storage.ref(file.name)
        const collectionRef = firestore.collection('pictures')

        // Put File in Storage
        storageRef.put(file).on('state_changed',(snap)=>{
            // Percentage
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
            setProgress(percentage)
        }, (err) => { setError(err) }, async () => {
            // Get URl 
            let url = await storageRef.getDownloadURL()
            let timestamp = new Date()
            collectionRef.add({ url, createdAt: timestamp, name: file.name, })
            setUrl(url)
        })
    },[file])

    return {progress, error, url}
}

export const useFirestore = (collection) => {
    const [pictureList, setPictureList] = useState([])

    useEffect(()=>{
        const unsub = firestore.collection(collection)
        .orderBy('createdAt','desc')
        .onSnapshot((pictures)=>{
            let listOfPictures = []
            pictures.forEach((picture=>{
                listOfPictures.push({ id: picture.id, ...picture.data() })
            }))
        setPictureList(listOfPictures)
        })
        return () => unsub()
    },[collection])

    return { pictureList }
}