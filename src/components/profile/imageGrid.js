import React, { useState, useEffect } from 'react'
import Image from './image'
import { motion } from 'framer-motion'
import { useFirestore } from '../../hooks'

export default function ImageGrid (props) {
    const { setSelectedImg } = props
    const { pictureList } = useFirestore('pictures')
    const [picture, setPicture] = useState(null)

    useEffect(()=>{
       let list = []
       pictureList.forEach(pic => {
           list.push(pic.url)
       })
       if(list && list.length === pictureList.length) {
           setPicture(list)
       }
      
    },[pictureList])

    return (
        <div className ="pictures">
            {picture && picture.length === pictureList.length && picture.map((link, i)=> (
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