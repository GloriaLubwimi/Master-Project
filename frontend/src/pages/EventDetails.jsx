import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import AxiosInstance from './AxiosInstance'
import Box from '@mui/material/Box';
import authService from "../features/auth/authService";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"

// import axios from 'axios';

const EventDetails = () =>{
    const [name, setName] = useState('')
    const [info, setInfo] = useState(undefined)
    const [phone_number, setPhone_Number] = useState('')
    const { user} = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const MyParam = useParams()
    const MyId = MyParam.id
    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState(true)

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
        // console.log(res.data)
      })
  
    }

    const GetEmail = () => {
      AxiosInstance.get(`/booking/${MyId}`).then((res) => {
        // console.log(res.data)
      })
    }

    const sendData = async (e) => {
      e?.preventDefault()

      const response = await AxiosInstance.post('/booking/', {
        'name': name,
        'phone_number': phone_number,
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
      // console.log(response)
      navigate('/eventdetails/:id/:yourbookings')
    }
  
    useEffect(() =>{
      GetData();
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
                    <Box sx={{marginLeft:'10px'}}>{info?.email??""}</Box>
                </Box>
              </>
            }

            <form style={{paddingLeft: '1rem', display:'flex', flexDirection: 'column'}} onSubmit={sendData} >
              <div>
                <label>Your Name And SurName :</label>&nbsp;&nbsp;
                <input type='text' placeholder='name' value={name} onChange={(ev) => setName(ev.target.value)} style={{height: '1.5rem', textAlign: 'center', borderRadius: '0.3rem'}}/>
              </div><br />
              
              <div>
                <label>Your own Phone Number:</label>&nbsp;&nbsp; 
                <input type='text' placeholder='phone' value={phone_number} onChange={(ev) => setPhone_Number(ev.target.value)} style={{height: '1.5rem', textAlign: 'center', borderRadius: '0.3rem'}}/>
              </div><br />

              <button type='submit' style={{height: '2rem', width: '15rem', textAlign: 'center', backgroundColor: 'green', color:'white', fontSize: '1.5rem', borderRadius: '1rem', border: '4px solid darkgreen', cursor:'pointer'}}>Book</button>
            </form>
        </div>
    )
}

export default EventDetails