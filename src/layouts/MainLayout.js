import React, { Fragment } from 'react'
import Navigation from '../components/navigation'

export default function MainLayout ( props ) {
    return (
        <Fragment>
            <Navigation />
            { props.children }
        </Fragment>
    )
}