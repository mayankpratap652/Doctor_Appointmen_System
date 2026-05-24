import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='relative flex flex-col md:flex-row items-center justify-between 
        animated-bg rounded-2xl px-6 sm:px-10 md:px-14 lg:px-16 my-20 md:mx-10 shadow-xl overflow-hidden'>

            {/* 🫧 Bubbles */}
            <div className="absolute inset-0 z-0">
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
            </div>

            {/* 🔥 Glass Content */}
            <div className='relative z-10 flex flex-col md:flex-row items-center justify-between w-full'>

                {/* Left */}
                <div className='flex-1 py-10 md:py-16 lg:py-20'>

                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight 
                    bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent'>
                        Book Appointment <br />
                        With 100+ Trusted Doctors
                    </h1>

                    <p className='text-white/80 mt-4 text-sm sm:text-base max-w-md'>
                        Find experienced doctors, book appointments easily, and manage your healthcare anytime.
                    </p>

                    <button 
                        onClick={() => { navigate('/login'); scrollTo(0, 0) }} 
                        className='mt-6 bg-white text-primary font-medium px-8 py-3 rounded-full 
                        shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300'
                    >
                        Create Account
                    </button>
                </div>

                {/* Right */}
                <div className='hidden md:block md:w-1/2 lg:w-[400px] relative'>
                    <img 
                        className='w-full max-w-md mx-auto drop-shadow-2xl' 
                        src={assets.appointment_img} 
                        alt="" 
                    />
                </div>

            </div>

        </div>
    )
}

export default Banner