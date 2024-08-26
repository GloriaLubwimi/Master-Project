import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import AxiosInstance from '../AxiosInstance'
import { format } from "date-fns"
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import MyModal from '../../components/myModal/MyModal'

const Community2 = ({ myEvents, onSuccess }) => {
    const { userInfo, user } = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        id: undefined,
        "comments": "",
        "date_field": "",
        "start_time": "",
    })

    const { id, comments, date_field, start_time } = formData

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let community = undefined;
        if (formData.id == -1) {
            community = await AxiosInstance.post('community/', formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user.access}`
                    }
                })
                .then(res => res.data)
                .catch(error => console.log(error));

        } else {
            community = await AxiosInstance.put(`community/${formData.id}/`, formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user.access}`
                    }
                })
                .then(res => res.data)
                .catch(error => console.log(error));
        }
        if (!!community) {
            setFormData({
                id: undefined,
                "comments": "",
                "date_field": "",
                "start_time": "",
            });
            onSuccess();
        }
    }

    const deleteCommunity = async () => {
        const community = await AxiosInstance.delete(`community/${formData.id}/`,
            {
                headers: {
                    "Authorization": `Bearer ${user.access}`
                }
            })
            .then(res => true)
            .catch(error => console.log(error));
        if (community) {
            setFormData({
                id: undefined,
                "comments": "",
                "date_field": "",
                "start_time": "",
            });
            onSuccess();
        }
    }

    return (<>
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView="listWeek"
            events={myEvents}
            eventClick={({ event }) => {
                setFormData(
                    {
                        id: event.id,
                        comments: event.title,
                        date_field: format(event.start, 'yyyy-MM-dd'),
                        start_time: format(event.start, 'HH:mm:ss')
                    }
                )
            }}

            headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'listWeek, timeGridWeek, dayGridMonth'
            }}
            dateClick={(info) => {
                if (userInfo.is_staff) {
                    setFormData(
                        {
                            id: -1,
                            comments: "",
                            date_field: format(info.date, 'yyyy-MM-dd'),
                            start_time: format(info.date, 'HH:mm:ss')
                        }
                    )
                }
            }}
        />
        <MyModal open={!!formData.id} onCloseModal={() => { setFormData({ id: undefined, comments: "", date_field: "", start_time: "" }) }} >
            <>

                <form className="new-Appointment">
                    <div>
                        <input
                            type="date"
                            placeholder="Date"
                            name="date_field"
                            onChange={handleChange}
                            value={date_field}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="time"
                            placeholder="Start Time"
                            name="start_time"
                            onChange={handleChange}
                            value={start_time}
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder="Comments"
                            name="comments"
                            onChange={handleChange}
                            value={comments}
                            required
                        />
                    </div>
                    {id == -1 && userInfo.is_staff && <button
                        className="create-button"
                        type="submit"
                        onClick={handleSubmit}
                        style={{
                            height: '2rem', width: '15rem', textAlign: 'center',
                            backgroundColor: 'red', color: 'white', fontSize: '1.5rem', borderRadius: '1rem',
                            border: '4px solid darkgreen', cursor: 'pointer'
                        }}
                    >Create</button>}
                    {!!id && id != -1 && userInfo.is_staff?
                        <>
                            <button
                                className="create-button"
                                type="submit"
                                onClick={handleSubmit}
                                style={{
                                    height: '2rem', width: '15rem', textAlign: 'center',
                                    backgroundColor: 'green', color: 'white', fontSize: '1.5rem', borderRadius: '1rem',
                                    border: '4px solid darkgreen', cursor: 'pointer'
                                }}
                            >
                                Update
                            </button>
                            <button
                                className="create-button"
                                onClick={(e)=>{
                                    e.preventDefault()
                                    console.log("TESTING")
                                    // e.stopPropagation()
                                    deleteCommunity()
                                }}
                                style={{
                                    height: '2rem', width: '15rem', textAlign: 'center',
                                    backgroundColor: 'red', color: 'white', fontSize: '1.5rem', borderRadius: '1rem',
                                    border: '4px solid darkred', cursor: 'pointer'
                                }}
                            >
                                Delete
                            </button>
                        </>
                        : null}
                </form>

            </>
        </MyModal>
    </>
    )
}

export default Community2
