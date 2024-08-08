import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AxiosInstance from '../AxiosInstance'
import '../../index.css'
import MultiSelectForm from '../forms/MultiSelectForm'
import { Box } from '@mui/material'

const MyCalendar1 = () => {
    const [events, setEvents] = useState([])
    const [statusOptions, setStatusOptions] = useState()
    const [selectedStatus, setSelectedStatus] = useState([])
    console.log(selectedStatus)

    const filteredEvents = events.filter((event) => 
        selectedStatus.includes(event.classNames)
      );


    const [loading, setLoading] = useState(true)

    const GetData = () => {
        AxiosInstance.get('appointments/').then((res) => {
            setEvents(res.data)
            setStatusOptions([...new Set(res.data.map((event) => event.classNames))])
            setSelectedStatus([...new Set(res.data.map((event) => event.classNames))])
            setLoading(false)
            console.log(res.data)
        })
    }

    useEffect(() =>{
        GetData();
    }, [])

    return (
        <React.Fragment>
            { loading ? <p>Loading the data...</p> :
            <>
            <Box sx={{boxShadow:3,padding:"20px", display:'flex', justifyContent:'space-evenly', marginBottom:'20px'}}>
                <Box sx={{width:'30%'}}>
                    <MultiSelectForm
                    label = {"Status"}
                    options = {statusOptions}
                    setSelectedValue={setSelectedStatus}
                    selectedValue = {selectedStatus}

                    />
                </Box>
                <Box sx={{width:'30%'}}></Box>
                <Box sx={{width:'30%'}}></Box>
            </Box>

            <Box sx={{boxShadow:3,padding:"20px"}}>
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    events={filteredEvents}
                />
            </Box>
            </>

            }
        
        </React.Fragment>
    )
}

export default MyCalendar1