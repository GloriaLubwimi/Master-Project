import React from 'react'
import homeVideo from '../assets/homeVideo.mp4'
import { FaArrowRightLong } from "react-icons/fa6";

const Home = () => {


    return (
        <div className='home'>
            
            <div className='video-img'>
                <video src={homeVideo} autoPlay loop muted />
                <div className='video-content'>
                 <h1 style={{wordSpacing: '1rem'}}><span style={{fontWeight: 600, fontSize: '4rem'}}>WELCOME TO PATMOS</span><span style={{fontWeight:300, fontSize: '4rem'}}> CHURCH </span>  </h1>
                 <button style={{height: '1.8rem', width: '15rem', borderRadius: '2rem', fontSize: '1rem', fontFamily: 'Georgia', wordSpacing: '0.2rem'}}> WATCH SERVICE ONLINE <FaArrowRightLong /> </button>
                </div>
                
            </div>

            <div className='home-description'>
                <h1> Welcome to patmos church </h1>
            </div>

        </div>
    )
} 

export default Home