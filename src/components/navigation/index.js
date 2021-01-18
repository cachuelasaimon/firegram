import React, { Fragment, useEffect } from 'react'
import { auth } from '../../firebase/utils'
import { useHistory } from 'react-router-dom'
import './style.scss'
// Redux 
import { useSelector, useDispatch } from 'react-redux'
import { checkUserSession, logout } from '../../redux/Actions'
const mapState = ({user}) => ({
    currentUser: user.currentUser
})

export default function Nav (props) { 
    const history = useHistory()
    const dispatch = useDispatch()
    const { currentUser } = useSelector(mapState)

    useEffect(()=>{
       dispatch(checkUserSession())
    },[])
    
    return (
        <div className="navigation">
            <div className="nav-container">
                <div className="logo" onClick={()=>{history.push('/firegram')}}>
                    Firegram
                </div>
                <div className="links">
                   { !currentUser && (
                    <Fragment>
                        <a href="/login">Login</a>
                        <a href="/sign-up">SignUp</a>
                    </Fragment>
                   )}
                   {currentUser && (
                    <Fragment>
                      <a href="#">{currentUser.displayName}</a>
                      <span onClick={()=>dispatch(logout())}>Logout</span>
                    </Fragment>
                   )}
                </div>
            </div>
        </div>
    )
} 
