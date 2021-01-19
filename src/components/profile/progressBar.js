import React, { useEffect } from 'react'
import {useStorage} from '../../hooks'
// Redux
import { useSelector } from 'react-redux'
const mapState = ({user}) => ({
    currentUser: user.currentUser,
})

const ProgressBar = ({ file, setFile}) => {
    const { currentUser } = useSelector(mapState)
   const { progress, url } = useStorage(file, currentUser.id)

    useEffect(async()=>{
        // set File to null when upload finishes
        if (progress == 100 && url) {
            console.log(url)
            await setFile(null)
        }
    },[url])
    useEffect(()=>{
        console.log(currentUser)
    },[])

    useEffect (()=>{console.log(file)},[file])

    return(
        <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}>
        {Math.round(progress)}%</div>
    )
}

export default ProgressBar 