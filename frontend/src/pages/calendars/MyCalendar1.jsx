import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AxiosInstance from '../AxiosInstance'
import '../../index.css'
import dayjs from 'dayjs'
import MultiSelectForm from '../forms/MultiSelectForm'
import { Box } from '@mui/material'
import DatePickerForm from '../forms/DatePickerForm'
import { useNavigate } from 'react-router-dom'

const MyCalendar1 = () => {
    const [events, setEvents] = useState([])
    const [statusOptions, setStatusOptions] = useState()
    const [selectedStatus, setSelectedStatus] = useState([])
    const [fromDate, setFromDate] = useState(null)
    const navigate = useNavigate()

    const fromDateChange = (newDate) =>{
        setFromDate(newDate)
        console.log("Selected from date", newDate.format('DD-MM-YYYY'))
     }

     const [toDate, setToDate] = useState(null)

     const toDateChange = (newDate) =>{
       setToDate(newDate)
        console.log("Selected to date", newDate.format('DD-MM-YYYY'))
     }

    console.log(selectedStatus)

    const filteredEvents = events.filter((event) => 
        selectedStatus.includes(event.classNames) &&
    (!fromDate || dayjs(event.start).isAfter(fromDate,'day')) &&
    (!toDate || dayjs(event.end).isBefore(toDate,'day'))
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

    const eventClickAction = (data) => {
        navigate(`/eventdetails/${data.event.id}`)
    }

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

                <Box sx={{width:'30%'}}>
                    <DatePickerForm 
                        label ={"From date"} value={fromDate} onChange={fromDateChange} />
                </Box>

                <Box sx={{width:'30%'}}>
                     <DatePickerForm  label ={"To date"} value={toDate} onChange={toDateChange}/>
                </Box>

            </Box>

            <Box sx={{boxShadow:3,padding:"20px"}}>
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    events={filteredEvents}
                    eventClick={eventClickAction}
                />
            </Box>
            </>

            }
        
        </React.Fragment>
    )
}

export default MyCalendar1