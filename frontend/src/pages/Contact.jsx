import React from 'react'
//import { useSelector } from 'react-redux'


const Contact = () => {

    //const { userInfo } = useSelector((state) => state.auth)


    return (
        <div className='contact-bottom'>

            <div className='contact'>
                <div className='contact-left'>
                    <p className='contact-title'>Contact</p>
                    <p className='contact-email'>kyrkanpatmos@gmail.com</p>
                    <p className='contact-address'>Address: Bredängs allé 55 127 61 Skärholmen </p>
                </div>

                <div className='contact-message'>

                    <div className='contact-prayer'>
                        <p className='contact-prayer-title'>Do you need intercession?</p>
                        <p className='contact-prayer-description'> Have you prayed the salvation prayer and want to continue contact with us? <br/> 
                            We want to help you further, give you a Bible and tell you how you can get to <br/> know Jesus even better! 
                            Contact us for more information! 
                        </p>
                        <p className='contact-prayer-email'>kyrkanpatmos@gmail.com</p>
                    </div>

                    <div>
                        <p className='contact-gospel-title'>Received Jesus?</p>
                        <p className='contact-gospel-description'>If you need prayer support, write to us and we will pray for you during <br/> the weekend services.
                        God is good and hears us when we pray!</p>
                        <p className='contact-gospel-email'>kyrkanpatmos@gmail.com</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Contact