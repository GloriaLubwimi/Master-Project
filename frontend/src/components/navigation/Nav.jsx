import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset, getUserInfo } from '../../features/auth/authSlice'
import { useEffect } from 'react'


const Nav = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, userInfo } = useSelector((state) => state.auth)
    useEffect(()=>{
       if (user) {
        dispatch(getUserInfo())
       }
      },[user])

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate("/")
    }

    return (
        <nav className="navbar">
            
            <NavLink className="home-nav" to="/"> PATMOS CHURCH </NavLink>
            
            <ul className="nav-links">
                {user ?
                    <>
                        <NavLink className='nav-childs' to="/dashboard">Dashboard</NavLink>
                        {!userInfo?.is_staff?
                        <>
                        <NavLink className='nav-childs' to="/eventdetails/:id/:yourbookings">Your Bookings</NavLink>
                        </>
                        :
                        <NavLink className='nav-childs' to="/community">Community</NavLink>
                        }
                        <NavLink className='nav-childs' to="/" onClick={handleLogout}>Logout</NavLink>
                        
                    </>
                    :
                    <>
                        <NavLink className='nav-childs' to="/contact">Contact</NavLink>
                        <NavLink className='nav-childs' to="/history">History</NavLink>
                        <NavLink className='nav-childs' to="/community">Community</NavLink>
                        <NavLink className='nav-childs' to="/gift">Gift</NavLink>
                        <NavLink className="logo" to="/homepage">Bookings</NavLink>
                    </>
                }
            </ul>
        </nav>
    )
}

export default Nav