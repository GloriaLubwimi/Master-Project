import React, { useEffect, useState } from "react";
import AxiosInstance from "./AxiosInstance";
import { useParams } from 'react-router-dom'
import authService from "../features/auth/authService";
import { useDispatch, useSelector } from 'react-redux'

const YourBookings = () => {

    const [bookings, setYourBookings] = useState([])
    const { user } = useSelector((state) => state.auth)
    const [info, setInfo] = useState(undefined)
    const MyParam = useParams()
    const MyId = MyParam.id

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    const getUserBookingsInfo = (info) => {
        AxiosInstance.get(`booking/${info.id}/user_appointments/`).then((res) => {
            setYourBookings(res.data)
        })
    }

    const getAppointments = (info) => {
        AxiosInstance.get(`appointments/${info.id}/user_appointments/`).then((res) => {
            setEvents(res.data)
            setLoading(false)
        })

    }

    const deleteUserAppointment = (event) => {
        const booking = bookings.find((b)=>{return b.appointment == event.id})
        if (booking) {
            AxiosInstance.delete(`booking/${booking.id}/`).then((res) => {
              getAppointments(info)
            }) 
        }
    }

    useEffect(() => {
        const userInfo = async () => {
            const info = await authService.getUserInfo(user.access)
            setInfo(info)
        }
        userInfo()
    }, [user]
    )

    useEffect(() => {
        if (info) {
            getUserBookingsInfo(info)
            getAppointments(info)
        }
    }, [info])

    return (
        <div className="your-bookings">
            <h1> Your Bookings </h1>

            <div>
                <span className="your-bookings-label">Your email:  </span>

                <span className="your-bookings-details">{info?.email}</span>

            </div>
            <div>
                <span className="your-bookings-label">Your Name:  </span>

                <span className="your-bookings-details">{info?.name}</span>
            </div>

            <div>
                <span className="your-bookings-label">Your Phone:  </span>

                <span className="your-bookings-details">{info?.phone_number}</span>
            </div>

            {
                loading ? <p>Loading the data...</p> :
                    <div className="bookings">
                        {
                            events.map(ev => {
                                const booking = bookings.find(b=>b.appointment == ev.id)
                                return (
                                    <div key={ev.id}>
                                        <div>
                                            <span className="your-bookings-label">Title:  </span>

                                            <span className="your-bookings-details">{ev.title}</span>
                                        </div>

                                        <div>
                                            <span className="your-bookings-label">Your Status:  </span>

                                            <span className="your-bookings-details">{ev.classNames}</span>
                                        </div>

                                        <div>
                                            <span className="your-bookings-label">Start Date:  </span>

                                            <span className="your-bookings-details">{ev.start}</span>
                                        </div>

                                        <div>
                                            <span className="your-bookings-label">End Date:  </span>

                                            <span className="your-bookings-details">{ev.end}</span>
                                        </div>
                                        <div>
                                            <span className="your-bookings-label">Booking Status:  </span>

                                            <span className="your-bookings-details">{booking?.status ?? ""}</span>
                                        </div>
                                        <div>
                                        {!booking?.status.includes('accepted') && <button onClick = {()=> {deleteUserAppointment(ev)}} className="delete-bookings"> Delete </button>}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

            }


        </div>
    )
}

export default YourBookings
