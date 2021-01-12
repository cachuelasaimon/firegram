import { useState, useEffect } from 'react'
import { firestore } from '../firebase/utils'

export default function useFirestore (collection) {
    const [docs, setDocs]= useState([])

    useEffect(()=>{
        const unsub = firestore.collection(collection)
        .orderBy('createdAt','desc')
        .onSnapshot((pictures)=>{
            let doc = []
            pictures.forEach(picture => {
                doc.push({ id: picture.id, ...picture.data(), })
            })
            setDocs(doc)
        })
        
    },[collection])

    return { docs }
}