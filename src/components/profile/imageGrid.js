import React, { useState, useEffect } from 'react'
import Image from './image'
import { motion } from 'framer-motion'
import { useFirestore } from '../../hooks'
//Redux
import { useSelector } from 'react-redux'  
const mapState = ({user}) => ({
    currentUser: user.currentUser
})

export default function ImageGrid (props) {
    const { currentUser } = useSelector(mapState)
    const { setSelectedImg } = props
    const [picture, setPicture] = useState(null)
    const [collection, setCollection] = useState(`pictures`)
    const { pictureList } = useFirestore(collection)    

    useEffect(()=>{
       let list = []
       pictureList.forEach(pic => {
           list.push(pic.url)
       })
       if(list && list.length === pictureList.length) {
           setPicture(list)
       }
      
    },[pictureList])
    useEffect(() => {
        if(currentUser) {
            setCollection(`users/${currentUser.id}/pictures`)
        } else {
            setCollection(`pictures`)
        }
    },[currentUser])

    return (
        <div className ="pictures">
            {currentUser && picture && picture.length === pictureList.length && picture.map((link, i)=> (
                    <motion.div  
                        key={i}          
                        className="picture"
                        onClick={()=>setSelectedImg(link)}
                    >
                        <img src={link} alt={`pic no. ${i+1}`}/>
                    </motion.div>
            ))}
        </div>
    )
}