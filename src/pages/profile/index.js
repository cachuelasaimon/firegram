import React, { Fragment, useState } from 'react'
import Grid from '../../components/profile'
import Modal from '../../components/profile/modal'

export default function Profile (props) {
    const [selectedImg, setSelectedImg] = useState(null)

    return (
        <Fragment>
            <Grid 
                setSelectedImg={setSelectedImg}/>
            {selectedImg && 
            <Modal 
                selectedImg={selectedImg} 
                setSelectedImg={setSelectedImg} />}
        </Fragment>
    )
}