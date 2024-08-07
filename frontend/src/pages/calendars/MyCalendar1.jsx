import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AxiosInstance from '../AxiosInstance'
import '../../index.css'


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
                // eventBackgroundColor = {'#A020F0'}

            />
        
        </React.Fragment>
    )
}

export default MyCalendar1