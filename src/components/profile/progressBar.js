import React, { useEffect } from 'react'
import {useStorage} from '../../hooks'

const ProgressBar = ({ file, setFile}) => {
   const { progress, url } = useStorage(file)

    useEffect(async()=>{
        // set File to null when upload finishes
        if (progress == 100 && url) {
            console.log(url)
            await setFile(null)
        }
    },[url])

    useEffect (()=>{console.log(file)},[file])

    return(
        <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}>
        {Math.round(progress)}%</div>
    )
}

export default ProgressBar 