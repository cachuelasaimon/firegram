import React, { Fragment, useState, useEffect } from 'react'
import ProgressBar from './progressBar'
import ImageGrid from './imageGrid'
import './style.scss'
// Redux 
import { useSelector } from 'react-redux'
const mapState = ({user}) => ({
    currentUser: user.currentUser,
})

export default function Profile (props) {
    const { currentUser } = useSelector(mapState)
    const { setSelectedImg } = props
    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)


    useEffect(async ()=>{
        if(file) {
        }
    },[file])

    const acceptedFiles = ['image/png','image/jpeg','image/jpeg']

    const uploadImg = async (e) => {
        let selectedFile = e.target.files[0]
        
        if(selectedFile && acceptedFiles.includes(selectedFile.type)) { 
            setFile(selectedFile)
            setError(null)
        } else {
            setFile(null)
            setError('Please select an image file(png/jpg/jpeg)')
        }
    }
    return (
        <Fragment>
            <div className="container">
                <div className="title">
                       {currentUser ? `Your Pictures ${currentUser.displayName}` : `Please login to upload pictures`}
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                   {currentUser && <input 
                        className="upload-btn" 
                        type="file" 
                        onChange={uploadImg} 
                        />}
                    {error && 
                        <p className="error">{error}</p>}
                    {file && <Fragment>
                        <p className="file-name">{file.name}</p>
                        <ProgressBar file={file} setFile={setFile} /> </Fragment>}
                    {!file && 
                        <div className="spacer" >{" "}</div>}
                </div>

               <ImageGrid setSelectedImg={setSelectedImg}/>

            </div>
        </Fragment>
    )
}