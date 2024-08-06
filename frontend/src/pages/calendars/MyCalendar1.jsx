import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
// import { useParams } from 'react-router-dom'
import AxiosInstance from '../AxiosInstance'


const MyCalendar1 = () => {
    // const {mycalendar} = useParams()
    const [events, setEvents] = useState()

    const GetData = () => {
        AxiosInstance.get('appointments/').then((res) => {
            setEvents(res.data)
            console.log(res.data)
        })
    }

    useEffect(() =>{
        GetData();
    }, [])

    return (
        <React.Fragment>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={events}


                // events={[
                //     {title : 'Event #1', start : '2024-08-06'},
                //     {title : 'Event #2', start : '2024-08-18', end: '2024-08-20'},
                //     {title : 'Event #3', start : '2024-08-07T12:00:00', allDay: false},
                // ]}
            />
        
        </React.Fragment>
    )
}

export default MyCalendar1