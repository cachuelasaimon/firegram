import React, { Fragment } from 'react'

export default function Image ({link, setSelectedImg}) {
    const selectImage = async () => {
        setSelectedImg(link)
        console.log(link)
    }
    return (
        <Fragment>
            <div                
                className="picture"
                onClick={selectImage}
                style={{ 
                    backgroundImage: `url(${link})`
                }}
            />
        </Fragment>
    )
}