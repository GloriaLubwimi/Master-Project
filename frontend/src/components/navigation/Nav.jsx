import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'

const Nav = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate("/")
    }


    return (
        <nav className="navbar">
            <ul className='nav-home-links'>
                <NavLink className="home-nav" to="/">Home</NavLink>
                {/*<NavLink className="logo" to="/homepage">Bokings</NavLink>*/}
            </ul>
            <ul className="nav-links">
                {user ?
                    <>
                        <NavLink className='nav-childs' to="/dashboard">Dashboard</NavLink>
                        <NavLink className='nav-childs' to="/" onClick={handleLogout}>Logout</NavLink>
                    </>
                    :
                    <>
                        {/*<NavLink className='nav-childs' to="/dashboard">Dashboard</NavLink>*/}
                        <NavLink className='nav-childs' to="/contact">Contact</NavLink>
                        <NavLink className='nav-childs' to="/history">History</NavLink>
                        <NavLink className='nav-childs' to="/community">Community</NavLink>
                        <NavLink className='nav-childs' to="/gift">Gift</NavLink>
                        <NavLink className="logo" to="/homepage">Bokings</NavLink>
                    </>
                }
            </ul>
        </nav>
    )
}

export default Nav