import React, { Fragment, useState } from 'react'
import Nav from '../../components/navigation'
import Grid from '../../components/profile'
import Modal from '../../components/profile/modal'

export default function Profile (props) {
    const [selectedImg, setSelectedImg] = useState(null)

    return (
        <Fragment>
            <Nav />
            <Grid 
                setSelectedImg={setSelectedImg}/>
            {selectedImg && 
            <Modal 
                selectedImg={selectedImg} 
                setSelectedImg={setSelectedImg} />}
        </Fragment>
    )
}