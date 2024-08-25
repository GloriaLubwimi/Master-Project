import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


const Dashboard = () => {
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.auth)
    useEffect(()=>{
        if(userInfo.is_staff) {
            navigate('/dashboard/:mycalendar')
        }
    },[userInfo])

    return (
        <div className='dashboard'>
           <div className='col-1'>
            <div className='bg-1'>
                <h1 className='testing-1'>The perfect place to get married</h1>
                <h2 className='testing-1'>In addition, when you book your have access to our side room.</h2>
                <h2 className='testing-1'>It can accommodate 200 people</h2>
                <Link to="/dashboard/:mycalendar" className='booking-title-1'><h1>Book It Now</h1></Link> 
            </div>
           </div>
           <div className='col-2'>
            <div className='bg-2'>
                <h1 className='testing-1'> The place for your celebration! </h1>
                <h2 className='testing-1'>Her you can celebratte your birthday with a beautifule view.</h2>
                <h2 className='testing-1'>It can accommodate 50 people</h2>
                <Link to="/dashboard/:mycalendar" className='booking-title-1'><h1>Book It Now</h1></Link>
            </div>
           </div>
        </div>
    )
}

export default Dashboard