import React from 'react'
import { useSelector } from 'react-redux'


const Dashboard = () => {

    const { userInfo } = useSelector((state) => state.auth)


    return (
        <div className='dashboard'>
            <h1>Welcome </h1>
        </div>
    )
}

export default Dashboard