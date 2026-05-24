import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist"
  ]

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }, [doctors, speciality])

  return (
    <div className='px-6 md:px-10 py-6'>

      {/* 🔥 Heading */}
      <p className='text-gray-500 text-sm mb-4'>
        Browse through our specialist doctors and book appointments easily.
      </p>

      <div className='flex flex-col md:flex-row gap-8'>

        {/* 🔥 FILTER SIDEBAR */}
        <div className='md:w-1/4'>

          <button 
            onClick={() => setShowFilter(!showFilter)} 
            className={`mb-4 px-4 py-2 border rounded-md text-sm md:hidden ${showFilter ? 'bg-primary text-white' : ''}`}
          >
            Filters
          </button>

          <div className={`flex flex-col gap-3 ${showFilter ? 'flex' : 'hidden md:flex'}`}>
            {specialities.map((item, index) => (
              <p
                key={index}
                onClick={() => speciality === item ? navigate('/doctors') : navigate(`/doctors/${item}`)}
                className={`px-4 py-2 rounded-lg border cursor-pointer transition-all text-sm
                ${speciality === item 
                  ? 'bg-primary text-white border-primary shadow-sm' 
                  : 'bg-white hover:bg-primary/10 border-gray-200'}`}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* 🔥 DOCTORS GRID */}
        <div className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>

          {filterDoc.length > 0 ? filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
              className='bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group'
            >

              {/* Image */}
              <div className='bg-primary/10 flex items-center justify-center'>
                <img 
                  className='w-full h-40 object-cover group-hover:scale-105 transition duration-300' 
                  src={item.image} 
                  alt="" 
                />
              </div>

              {/* Content */}
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
            <p className='text-gray-400 text-sm col-span-full text-center'>
              No doctors found for this speciality
            </p>
          )}

        </div>

      </div>
    </div>
  )
}

export default Doctors