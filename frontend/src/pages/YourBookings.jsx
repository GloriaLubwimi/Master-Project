import React, { useEffect, useState } from "react";
import AxiosInstance from "./AxiosInstance";
import { useParams } from 'react-router-dom'

const YourBookings = () => {

    const [yourBookings, setYourBookings] = useState([])

    const MyParam = useParams()
    const MyId = MyParam.id

    const getUserBookingsInfo = () => {
        // AxiosInstance.get(`booking/${MyId}`).then((res) => {
        //     console.log(res.data)
        // })

        AxiosInstance.get('booking/7').then((res) => {
            console.log(res.data)
            setYourBookings(res.data)
        })
    }

    useEffect(() => {
        getUserBookingsInfo()
    }, [])

    return(
        <div className="your-bookings">
            <h1> Your Bookings </h1>
            <div>
                Your Name: {yourBookings.name}
            </div>

            <div>
                Your Phone number: {yourBookings.phone_number}
            </div>
        </div>
    )
}

export default YourBookings
