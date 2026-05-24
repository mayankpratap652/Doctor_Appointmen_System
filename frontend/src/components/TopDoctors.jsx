import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-4 my-20 px-6 md:px-10 text-[#262626]'>

            {/* 🔥 Heading */}
            <h1 className='text-3xl font-semibold'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm text-gray-500'>
                Browse through our trusted doctors and book appointments easily.
            </p>

            {/* 🔥 Cards */}
            <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-8'>

                {doctors.slice(0, 10).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                        className='bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group'
                    >

                        {/* 🔥 Image */}
                        <div className='bg-primary/10 flex items-center justify-center'>
                            <img 
                                className='w-full h-44 object-cover group-hover:scale-105 transition duration-300' 
                                src={item.image} 
                                alt="" 
                            />
                        </div>

                        {/* 🔥 Content */}
                        <div className='p-4'>

                            {/* Status */}
                            <div className={`flex items-center gap-2 text-xs mb-1 ${item.available ? 'text-green-500' : "text-gray-400"}`}>
                                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-400"}`}></span>
                                {item.available ? 'Available' : "Not Available"}
                            </div>

                            {/* Name */}
                            <p className='text-base font-semibold text-gray-800 group-hover:text-primary'>
                                {item.name}
                            </p>

                            {/* Speciality */}
                            <p className='text-sm text-gray-500'>
                                {item.speciality}
                            </p>

                        </div>
                    </div>
                ))}

            </div>

            {/* 🔥 Button */}
            <button 
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                className='bg-primary text-white px-10 py-3 rounded-full mt-10 hover:scale-105 transition-all duration-300 shadow-md'
            >
                View More
            </button>

        </div>
    )
}

export default TopDoctors