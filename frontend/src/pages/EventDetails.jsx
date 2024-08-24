import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import AxiosInstance from './AxiosInstance'
import Box from '@mui/material/Box';
import authService from "../features/auth/authService";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"


const EventDetails = () =>{
    const [info, setInfo] = useState(undefined)
    const { user} = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const MyParam = useParams()
    const MyId = MyParam.id
    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState(true)
    const [bookings, setBookings] = useState([])

    useEffect(()=>{
      const userInfo = async ()=> {
        const info = await authService.getUserInfo(user.access)
        setInfo(info)
      } 
      userInfo()
    },[user])

    const GetData = () => {
      AxiosInstance.get(`appointments/${MyId}`).then((res) =>{
        setEvents(res.data)
        setLoading(false)
      })

      AxiosInstance.get(`appointments/${MyId}/users/`).then((res) =>{
        setBookings(res.data)
      })
  
    }

    const sendData = async (e) => {
      e?.preventDefault()

      await AxiosInstance.post('/booking/', {
        'user': info.id,
        'appointment': MyId
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.data)
      .catch(error => console.log(error));
      navigate('/eventdetails/:id/:yourbookings')
    }
  
    useEffect(() =>{
      GetData();
    },[] )

    const myBooking = bookings.find(booking => booking.user === info?.id)

    return(
        <div>
            { loading ? <p>Loading the data...</p> :
              <>
                <Box sx={{boxShadow:10, padding:'20px', display:'flex', flexDirection:'row', marginBottom:'20px'}}>
                    <Box sx={{fontWeight:'bold'}}>Name: </Box>
                    <Box sx={{marginLeft:'10px'}}>{events.title}</Box>
                </Box>

                <Box sx={{boxShadow:10, padding:'20px', display:'flex', flexDirection:'row', marginBottom:'20px'}}>
                    <Box sx={{fontWeight:'bold'}}>Status: </Box>
                    <Box sx={{marginLeft:'10px'}}>{events.classNames}</Box>
                </Box>

                <Box sx={{boxShadow:10, padding:'20px', display:'flex', flexDirection:'row', marginBottom:'20px'}}>
                    <Box sx={{fontWeight:'bold'}}>Start date: </Box>
                    <Box sx={{marginLeft:'10px'}}>{events.start}</Box>
                </Box>

                <Box sx={{boxShadow:10, padding:'20px', display:'flex', flexDirection:'row', marginBottom:'20px'}}>
                    <Box sx={{fontWeight:'bold'}}>End date: </Box>
                    <Box sx={{marginLeft:'10px'}}>{events.end}</Box>
                </Box>

                <Box sx={{boxShadow:10, padding:'20px', display:'flex', flexDirection:'row', marginBottom:'20px'}}>
                    <Box sx={{fontWeight:'bold'}}>Your email: </Box>
                    <Box sx={{marginLeft:'10px'}}>{info?.email??""}</Box>
                </Box>
              </>
            }

            <form style={{paddingLeft: '1rem', display:'flex', flexDirection: 'column'}} onSubmit={sendData} >

              { !myBooking ? <button type='submit' 
                style={{
                  height: '2rem', width: '15rem', textAlign: 'center', 
                  backgroundColor: 'green', color:'white', fontSize: '1.5rem', borderRadius: '1rem', 
                  border: '4px solid darkgreen', cursor:'pointer'
                }}
              >
                {!(bookings.length > 0) ? 'Book': 'Queu'}
              </button> : null}
            </form>
        </div>
    )
}

export default EventDetails