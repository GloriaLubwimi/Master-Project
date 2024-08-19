import {React} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'

const Community2 = ({myEvents}) => {
 
    return (
        <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin, listPlugin ]}
            initialView="listWeek"
            events={myEvents}
            eventClick={({event})=>{ 
                alert(event.title)
            }}

            headerToolbar = {{
                left: 'prev,next' ,
                center: 'title',
                right: 'listWeek, timeGridWeek, dayGridMonth'
             }}

        />
      )
    }

export default Community2
