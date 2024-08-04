import React from 'react'
import { useSelector } from 'react-redux'


const Dashboard = () => {

    const { userInfo } = useSelector((state) => state.auth)


    return (
        <div className='dashboard'>
           <div className='col-1'>
            <div className='bg-1'>
                <h1>The perfect place to get married</h1>
                <h2>In addition, when you book your have access to our side room.</h2>
                <h2>It can accommodate 200 people</h2>
                <h1 className='booking-title-1'>Book It Now</h1>
            </div>
           </div>
           <div className='col-2'>
            <div className='bg-2'>
                <h1 className='booking-title-2'> The place for your celebration! </h1>
                <h2>Her you can celebratte your birthday with a beautifule view.</h2>
                <h2>It can accommodate 50 people</h2>
                <h1 className='booking-title-1'>Book It Now</h1>
            </div>
           </div>
        </div>
    )
}

export default Dashboard