import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)
    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter(
                (doc) => doc.speciality === speciality && doc._id !== docId
            )
            setRelDoc(doctorsData.slice(0, 5)) // 🔥 limit for clean UI
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-4 my-20 px-6 md:px-10 text-[#262626]'>

            {/* 🔥 Heading */}
            <h1 className='text-3xl font-semibold'>Related Doctors</h1>
            <p className='sm:w-1/3 text-center text-sm text-gray-500'>
                Doctors similar to your selected speciality.
            </p>

            {/* 🔥 Cards */}
            <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-8'>

                {relDoc.length > 0 ? relDoc.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                        className='bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group'
                    >

                        {/* 🔥 Image */}
                        <div className='bg-primary/10 flex items-center justify-center'>
                            <img 
                                className='w-full h-40 object-cover group-hover:scale-105 transition duration-300' 
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
                )) : (
                    <p className='text-gray-400 text-sm'>No related doctors found</p>
                )}

            </div>

        </div>
    )
}

export default RelatedDoctors