import React, { useEffect, useState } from "react";
import AxiosInstance from "./AxiosInstance";
import { useParams } from 'react-router-dom'
import authService from "../features/auth/authService";
import { useDispatch, useSelector } from 'react-redux'

const YourBookings = () => {

    const [yourBookings, setYourBookings] = useState([])
    const { user} = useSelector((state) => state.auth)
    const [info, setInfo] = useState(undefined)

    const MyParam = useParams()
    const MyId = MyParam.id

    const getUserBookingsInfo = (info) => {
        // AxiosInstance.get(`booking/${MyId}`).then((res) => {
        //     console.log(res.data)
        // })

        AxiosInstance.get(`booking/${info.id}/user_appointments/`).then((res) => {
            console.log(res.data)
            setYourBookings(res.data)
        })
    }

    useEffect(()=>{
        const userInfo = async ()=> {
          const info = await authService.getUserInfo(user.access)
          setInfo(info)
        } 
        userInfo()
      },[user])

    useEffect(() => {
        if(info) {
            getUserBookingsInfo(info)
        }
    }, [info])

    return(
        <div className="your-bookings">
            <h1> Your Bookings </h1>
            {
                yourBookings.map(yourBooking => {
                    return(
                        <div key={yourBooking.id}>
                            <div>
                                Your Name: { yourBooking.name }
                            </div>

                            <div>
                                Your Phone: { yourBooking.phone_number }
                            </div>

                            <div>
                                Your status: { yourBooking.status }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default YourBookings
