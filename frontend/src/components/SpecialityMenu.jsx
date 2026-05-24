import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-4 py-16 px-6 md:px-10 text-[#262626]'>

            {/* 🔥 Heading */}
            <h1 className='text-3xl font-semibold'>Find by Speciality</h1>
            <p className='sm:w-1/3 text-center text-sm text-gray-500'>
                Simply browse through our extensive list of trusted doctors and book your appointment easily.
            </p>

            {/* 🔥 Scroll Cards */}
            <div className='flex sm:justify-center gap-6 pt-8 w-full overflow-x-auto scrollbar-hide'>

                {specialityData.map((item, index) => (
                    <Link
                        to={`/doctors/${item.speciality}`}
                        onClick={() => scrollTo(0, 0)}
                        key={index}
                        className='flex flex-col items-center min-w-[100px] sm:min-w-[130px] bg-white rounded-xl p-4 shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-2 group'
                    >

                        {/* 🔥 Image */}
                        <img 
                            className='w-14 sm:w-20 mb-3 transition-all duration-300 group-hover:scale-110' 
                            src={item.image} 
                            alt="" 
                        />

                        {/* 🔥 Text */}
                        <p className='text-xs sm:text-sm font-medium text-gray-700 group-hover:text-primary text-center'>
                            {item.speciality}
                        </p>
                    </Link>
                ))}

            </div>
        </div>
    )
}

export default SpecialityMenu