import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import AxiosInstance from './AxiosInstance'
import Box from '@mui/material/Box';
import axios from 'axios';

const EventDetails = () =>{
    const [name, setName] = useState('')
    const [phone_number, setPhone_Number] = useState('')

    const MyParam = useParams()
    const MyId = MyParam.id
    // console.log(MyId)
    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState(true)

    const GetData = () => {
      AxiosInstance.get(`appointments/${MyId}`).then((res) =>{
        setEvents(res.data)
        setLoading(false)
        // console.log(res.data)
      })
  
    }

    const GetEmail = () => {
      AxiosInstance.get(`/booking/${MyId}`).then((res) => {
        // console.log(res.data)
      })
    }

    const sendData = (e) => {
      e.preventDefault()
      axios.post('/booking', {
        'name': name,
        'phone_number': phone_number
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => console.log(res))
      .catch(error => console.log(error));
      
    }
  
    useEffect(() =>{
      GetData();
      // GetEmail();
    },[] )



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
                    <Box sx={{marginLeft:'10px'}}>{}</Box>
                </Box>
              </>
            }

            <form style={{paddingLeft: '1rem'}} onSubmit={sendData}>
              <div>
                <label>Your Name & Surname:</label>&nbsp;&nbsp;
                <input type='text' value={name} onChange={(ev) => setName(ev.target.value)} style={{height: '1.5rem', textAlign: 'center', borderRadius: '0.3rem'}}/>
              </div><br />
              
              <div>
                <label>Phone Number:</label>&nbsp;&nbsp; 
                <input type='text' value={phone_number} onChange={(ev) => setPhone_Number(ev.target.value)} style={{height: '1.5rem', textAlign: 'center', borderRadius: '0.3rem'}}/>
              </div><br />

              <button type='submit' style={{height: '2rem', width: '15rem', textAlign: 'center', backgroundColor: 'green', color:'white', fontSize: '1.5rem', borderRadius: '1rem', border: '4px solid darkgreen'}}>Book</button>
            </form>
        </div>
    )
}

export default EventDetails