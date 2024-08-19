import {React, useEffect, useState}from 'react'
import Community2 from './calendars/Community2'
import AxiosInstance from './AxiosInstance'



const Community = () => {
    const [loading, setLoading] = useState(true)

    const [events, setEvents] = useState(true)
    

    const GetData = () => {
        AxiosInstance.get('community/').then((res) =>{
          setEvents(res.data.map(event=>({...event, title: event.comments, date:new Date(event.date_field + ' ' + event.start_time)})))
          console.log(res.data)
          setLoading(false)
        })
    
    }

    useEffect(() =>{
        GetData();
      },[] )
    

    return (
    
    <div>
        { loading ? <p>Loading the data...</p> :
            <>
        <div className='community'>
            <Community2
                myEvents={events}
            />
        </div>
        </>
         }
    </div>
    )
}

export default Community
