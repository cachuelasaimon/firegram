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
    const { setPage } = props 
    const history = useHistory()
    const dispatch = useDispatch()
    const { currentUser } = useSelector(mapState)

    const handleClick =async(page) => {
       await setPage(page)
    }

    useEffect(()=>{
       dispatch(checkUserSession())
    },[])
    
    return (
        <div className="navigation">
            <div className="nav-container">
                <div className="logo" onClick={()=>setPage('/firegram')}>
                    Firegram
                </div>
                <div className="links">
                   { !currentUser && (
                    <Fragment>
                        <span onClick={()=>setPage('/login')}>Login</span>
                        <span onClick={()=>setPage('/sign-up')} >SignUp</span>
                    </Fragment>
                   )}
                   {currentUser && (
                    <Fragment>
                      <span onClick={()=>console.log('profile-page')} >{currentUser.displayName}</span>
                      <span onClick={()=>dispatch(logout())}>Logout</span>
                    </Fragment>
                   )}
                </div>
            </div>
        </div>
    )
} 
