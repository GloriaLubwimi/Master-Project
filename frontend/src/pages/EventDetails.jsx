import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AxiosInstance from './AxiosInstance'
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { format } from 'date-fns';


const EventDetails = () => {
  const { userInfo, user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const MyParam = useParams()
  const appointmentId = MyParam.id
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState()
  const [bookings, setBookings] = useState([])
  const [bookingId, setBookingId] = useState("")
  const [bookedUser, setBookedUser] = useState()

  const GetData = () => {
    AxiosInstance.get(`appointments/${appointmentId}`).then((res) => {
      setEvents(res.data)
      setLoading(false)
    })

    AxiosInstance.get(`appointments/${appointmentId}/users/`).then((res) => {
      setBookings(res.data)
    })
    AxiosInstance.get(`appointments/${appointmentId}/users/`).then((res) => {
      setBookings(res.data)
    })

  }

  const sendData = async (e) => {
    e?.preventDefault()

    await AxiosInstance.post('/booking/', {
      'user': userInfo.id,
      'appointment': appointmentId
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

  const addBooking = async (e) => {
    e?.preventDefault();
    if (bookingId) {
      await AxiosInstance.get(`/booking/${bookingId}/book/`, 
        {
          headers: {
            "Authorization": `Bearer ${user.access}`
          }
        }
      )
        .then(res => {
          GetData();
          return res.data;
        })
        .catch(error => console.log(error));
    }
  }

  useEffect(()=>{
    const userBooking = bookings.find(booking => booking.appointment === events?.id)
    if(events?.classNames.includes('Booked') && !!userBooking){
      AxiosInstance.get(`api/v1/auth/users/${userBooking.user}`, 
        {
          headers: {
            "Authorization": `Bearer ${user.access}`
          }
        }
      )
        .then(res => {
          setBookedUser(res.data);
          return res.data;
        })
        .catch(error => console.log(error));
    }
  },[events, bookings, user])

  useEffect(() => {
    GetData();
  }, [])

  const myBooking = bookings.find(booking => booking.user === userInfo?.id)

  return (
    <div>
      {loading ? <p>Loading the data...</p> :
        <>
          <Box sx={{ boxShadow: 10, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
            <Box sx={{ fontWeight: 'bold' }}>Name: </Box>
            <Box sx={{ marginLeft: '10px' }}>{events.title}</Box>
          </Box>

          <Box sx={{ boxShadow: 10, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
            <Box sx={{ fontWeight: 'bold' }}>Status: </Box>
            <Box sx={{ marginLeft: '10px' }}>{events.classNames}</Box>
          </Box>

          <Box sx={{ boxShadow: 10, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
            <Box sx={{ fontWeight: 'bold' }}>Start date: </Box>
            <Box sx={{ marginLeft: '10px' }}>{format(new Date(events.start), 'yyyy-MM-dd HH:mm:ss')}</Box>
          </Box>

          <Box sx={{ boxShadow: 10, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
            <Box sx={{ fontWeight: 'bold' }}>End date: </Box>
            <Box sx={{ marginLeft: '10px' }}>{format(new Date(events.end), 'yyyy-MM-dd HH:mm:ss')}</Box>
          </Box>

          {!userInfo?.is_staff ?
            <>
              <Box sx={{ boxShadow: 10, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                <Box sx={{ fontWeight: 'bold' }}>Your email: </Box>
                <Box sx={{ marginLeft: '10px' }}>{userInfo?.email ?? ""}</Box>
              </Box>
              {myBooking &&<Box sx={{ boxShadow: 10, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                <Box sx={{ fontWeight: 'bold' }}>Admin message: </Box>
                <Box sx={{ marginLeft: '10px' }}>{myBooking?.status ?? ""}</Box>
              </Box>}
            </>
            : null}
        </>
      }

      <form style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column' }} onSubmit={sendData} >

        {!myBooking && !userInfo?.is_staff ? <button type='submit'
          style={{
            height: '2rem', width: '15rem', textAlign: 'center',
            backgroundColor: 'green', color: 'white', fontSize: '1.5rem', borderRadius: '1rem',
            border: '4px solid darkgreen', cursor: 'pointer'
          }}
        >
          {!(bookings.length > 0) ? 'Book' : 'Queu'}
        </button> : null}
      </form>
      {userInfo.is_staff && !events?.classNames.includes('Booked') ?
        <form onSubmit={addBooking}>
          <div>
            <label>Choose a Booking:</label>
            <select name="booking" value={bookingId} onChange={(e) => {
              setBookingId(e.currentTarget.value)
            }}>
              <option value="">--Select a Booking--</option>
              {bookings.map((booking) => (
                <option key={booking.id} value={booking.id}>{booking.user} - {format(new Date(booking.created_at), 'yyyy-MM-dd HH:mm:ss')}</option>
              ))}
            </select>
          </div>
          <div>
            <button type='submit'
              style={{
                height: '2rem', width: '15rem', textAlign: 'center',
                backgroundColor: 'green', color: 'white', fontSize: '1.5rem', borderRadius: '1rem',
                border: '4px solid darkgreen', cursor: 'pointer'
              }}
            >
              Book
            </button>
          </div>
        </form>
        : null}

      {userInfo.is_staff && events?.classNames.includes('Booked') ? 
      <div>
        <Box sx={{ boxShadow: 10, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                <Box sx={{ fontWeight: 'bold' }}>Client Email: </Box>
                <Box sx={{ marginLeft: '10px' }}>{bookedUser?.email ?? ""}</Box>
              </Box>
              <Box sx={{ boxShadow: 10, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                <Box sx={{ fontWeight: 'bold' }}>Client Name: </Box>
                <Box sx={{ marginLeft: '10px' }}>{bookedUser?.name ?? ""}</Box>
              </Box>
              <Box sx={{ boxShadow: 10, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                <Box sx={{ fontWeight: 'bold' }}>Client Phone: </Box>
                <Box sx={{ marginLeft: '10px' }}>{bookedUser?.phone_number ?? ""}</Box>
              </Box>
              
      </div>
      : null}
    </div>
  )
}

export default EventDetails