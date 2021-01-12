import React from 'react'
import './style.scss'

export default function Nav (props) { 
    return (
        <div className="navigation">
            <div className="nav-container">
                <div className="logo">
                    Firegram
                </div>
                <div className="links">
                    <a href="#">Login</a>
                    <a href="#">SignUp</a>
                </div>
            </div>
        </div>
    )
} 
