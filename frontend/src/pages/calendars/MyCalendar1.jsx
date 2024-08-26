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
import { useSelector } from 'react-redux'
import interactionPlugin from '@fullcalendar/interaction';
import MyModal from '../../components/myModal/MyModal'
import { format, addHours } from "date-fns";

const MyCalendar1 = () => {
    const [events, setEvents] = useState([])
    const [statusOptions, setStatusOptions] = useState()
    const [selectedStatus, setSelectedStatus] = useState([])
    const [fromDate, setFromDate] = useState(null)
    const navigate = useNavigate()
    const { userInfo, user } = useSelector((state) => state.auth)

    const fromDateChange = (newDate) => {
        if (newDate != null) {
            setFromDate(newDate)
        }
    }

    const [formData, setFormData] = useState({
        id: undefined,
        "title": "",
        "classNames": "Available",
        "start": "",
        "end": "",
    })

    const {id, title, classNames, start, end } = formData

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        )
    }

    const [toDate, setToDate] = useState(null)

    const toDateChange = (newDate) => {
        setToDate(newDate)
    }

    const filteredEvents = events.filter((event) =>
        selectedStatus.includes(event.classNames) &&
        (!fromDate || dayjs(event.start).isAfter(fromDate, 'day')) &&
        (!toDate || dayjs(event.end).isBefore(toDate, 'day'))
    );

    const [loading, setLoading] = useState(true)

    const GetData = () => {
        AxiosInstance.get('appointments/').then((res) => {
            setEvents(res.data)
            setStatusOptions([...new Set(res.data.map((event) => event.classNames))])
            setSelectedStatus([...new Set(res.data.map((event) => event.classNames))])
            setLoading(false)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {start, end, ...values} = formData;
        const newAppointment  = await AxiosInstance.post('appointments/', {
            ...values,
        start: format(new Date(start), 'yyyy-MM-dd HH:mm:ss'),
        end: format(new Date(end), 'yyyy-MM-dd HH:mm:ss')
        },
          {
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${user.access}`
            }
          })
          .then(res => true)
          .catch(error => console.log(error));
          if(newAppointment){
            setLoading(true)
              GetData()
              setFormData({
                id: undefined,
                classNames: "Available",
                start: "",
                end: "",
                title: "",
              })
          }
    }

    useEffect(() => {
        GetData();
    }, [])

    const eventClickAction = (data) => {
        if (!userInfo.is_staff && (data.event.classNames.join().includes('Booked') || data.event.start < Date.now())) {
            navigate('/dashboard/:mycalendar')
        } else {
            navigate(`/eventdetails/${data.event.id}`)
        }
    }

    return (
        <React.Fragment>
            {loading ? <p>Loading the data...</p> :
                <>
                    <Box sx={{ boxShadow: 3, padding: "20px", display: 'flex', justifyContent: 'space-evenly', marginBottom: '20px' }}>
                        <Box sx={{ width: '30%' }}>
                            <MultiSelectForm
                                label={"Status"}
                                options={statusOptions}
                                setSelectedValue={setSelectedStatus}
                                selectedValue={selectedStatus}
                            />
                        </Box>

                        <Box sx={{ width: '30%' }}>
                            <DatePickerForm
                                label={"From date"} value={fromDate} onChange={fromDateChange} />
                        </Box>

                        <Box sx={{ width: '30%' }}>
                            <DatePickerForm label={"To date"} value={toDate} onChange={toDateChange} />
                        </Box>

                    </Box>

                    <Box sx={{ boxShadow: 3, padding: "10px", display: 'flex', justifyContent: 'space-evenly' }}>
                        <div>
                            <div>Legend</div>
                            <div className='legend-green'><div className='legend-green-1'></div><span>Available</span></div>
                            <div className='legend-orange'><div className='legend-orange-1'></div><span>In Progress</span></div>
                            <div className='legend-red'><div className='legend-red-1'></div><span>Booked</span></div>

                        </div>
                        <Box sx={{ width: '100%' }}>
                            <FullCalendar
                                plugins={[dayGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                events={filteredEvents}
                                eventClick={eventClickAction}
                                dateClick={(info) => {
                                    if (userInfo.is_staff) {
                                        setFormData(
                                        { 
                                            id:-1,
                                            title: "", 
                                            classNames: "Available", 
                                            start: format(info.date, 'yyyy-MM-dd\'T\'HH:mm', { awareOfUnicodeTokens: true }), 
                                            end: format(addHours(info.date, 1), 'yyyy-MM-dd\'T\'HH:mm', { awareOfUnicodeTokens: true }) 
                                        })

                                    }
                                }}
                            />
                        </Box>
                    </Box>
                    <MyModal open={!!id} onCloseModal={() => { 
                        setFormData({ 
                            id: undefined,
                            title: "", 
                            classNames: "Available", 
                            start: "", 
                            end: ""
                        })
                    }} >
                        <>

                            <form className="new-Appointment" onSubmit={handleSubmit}>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        name="title"
                                        onChange={handleChange}
                                        value={title}
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Status"
                                        name="classNames"
                                        onChange={handleChange}
                                        value={classNames}
                                        required
                                        disabled
                                    />
                                </div>

                                <div>
                                    <input
                                        type="datetime-local"
                                        placeholder="start date"
                                        name="start"
                                        onChange={handleChange}
                                        value={start}
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        type="datetime-local"
                                        placeholder="end date"
                                        name="end"
                                        onChange={handleChange}
                                        value={end}
                                        required
                                    />
                                </div>
                                <button className="create-button" type="submit">Create</button>
                            </form>

                        </>
                    </MyModal>
                </>

            }
        </React.Fragment>
    )
}

export default MyCalendar1