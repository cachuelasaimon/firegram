import React, { Fragment, useState, useEffect } from 'react'
import ProgressBar from './progressBar'
import ImageGrid from './imageGrid'
import './style.scss'

export default function Profile (props) {
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
                        Your Pictures
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                    <input 
                        className="upload-btn" 
                        type="file" 
                        onChange={uploadImg} 
                        />
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