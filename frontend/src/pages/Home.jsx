import React from 'react'
import homeVideo from '../assets/homeVideo.mp4'
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Home = () => {


    return (
        <div className='home'>
            
            <div className='video-img'>
                <video src={homeVideo} autoPlay loop muted />

                <div className='video-content'>
                 <h1 style={{wordSpacing: '1rem'}}><span style={{fontWeight: 600, fontSize: '4rem'}}> 
                    PATMOS </span> <span style={{fontWeight:300, fontSize: '4rem'}}> CHURCH </span>  
                </h1>
                
                 <Link to='https://www.youtube.com/@patmoskyrka6619' target='_blank'>
                    <button style={{height: '1.8rem', width: '15rem', borderRadius: '2rem', 
                        fontSize: '1rem', fontFamily: 'Georgia', wordSpacing: '0.2rem', cursor: 'pointer'}}>
                             WATCH SERVICE ONLINE <FaArrowRightLong />
                    </button>
                 </Link>
                </div>
                
            </div>

            <div className='praying'>
                <p className='service'>
                    <span className='description-title'>Welcome to our home </span>
                    <span className='description-intro'> We are a congregation that is open to all, whether you are new to the area or looking for a new church,<br /> 
                        we invite you to visit us and experience God's love and grace. 
                    </span>
                    
                    <span className='description-service'> Service on Sunday: 3pm - 5pm<br /> Place: <br />Bredängs allé<br /> 55 127 61 Skärholmen</span>
                </p>
            </div>

        </div>
    )
} 

export default Home