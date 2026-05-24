import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='relative flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 overflow-hidden'>

            {/* 🔥 BUBBLES BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
            </div>

            {/* --------- Left --------- */}
            <div className='md:w-1/2 relative z-10 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>

                <h1 className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight'>
                    Book Appointment <br />
                    <span className='text-white/90'>With Trusted Doctors</span>
                </h1>

                <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                    <img className='w-28' src={assets.group_profiles} alt="" />
                    <p>
                        Simply browse through our extensive list of trusted doctors,
                        <br className='hidden sm:block' />
                        schedule your appointment hassle-free.
                    </p>
                </div>

                <a 
                    href='#speciality' 
                    className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-primary text-sm m-auto md:m-0 hover:scale-105 hover:shadow-lg transition-all duration-300'
                >
                    Book appointment 
                    <img className='w-3' src={assets.arrow_icon} alt="" />
                </a>

            </div>

            {/* --------- Right --------- */}
            <div className='md:w-1/2 relative z-10'>
                <img 
                    className='w-full md:absolute bottom-0 h-auto rounded-lg drop-shadow-xl' 
                    src={assets.header_img} 
                    alt="" 
                />
            </div>
        </div>
    )
}

export default Header