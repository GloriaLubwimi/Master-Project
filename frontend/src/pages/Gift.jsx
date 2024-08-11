import React from 'react'
import swish from '../assets/swish.webp'

const Gift = () => {

    return (
        <div className='gift'>
            <div className='gift-img'>
                <h1 className='gift-title'>
                    Help us reach out
                </h1>
                <h2 className='text-shadow'>
                In Patmos Church, you can donate by swish. 
                </h2>
                <h2 className='text-shadow'>
                Your support helps us maintain our church and premises,
                </h2>
                <h2 className='text-shadow'>
                support our outreach workers and share the gospel with those who need it. 
                </h2>
                <h2 className='text-shadow'>
                Thank you for your support!
                </h2>
            </div>
    
            <div className='home-description'>
                <div className='swish-img'>
                    <img src={swish} alt='swish' style={{width: '30%'}}/>

                    <div style={{width: '10%', fontFamily: 'Georgia'}}>Indicate in the message field if it is a tithe, 
                        offering or what the payment is for.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gift