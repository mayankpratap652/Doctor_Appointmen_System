import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='px-6 md:px-10'>

      {/* 🔥 Heading */}
      <div className='text-center text-3xl pt-12 text-gray-600'>
        <p>CONTACT <span className='text-primary font-semibold'>US</span></p>
      </div>

      {/* 🔥 Main Section */}
      <div className='my-14 flex flex-col md:flex-row items-center gap-12 mb-24'>

        {/* 🔥 Image */}
        <img 
          className='w-full md:max-w-[400px] rounded-2xl shadow-lg' 
          src={assets.contact_image} 
          alt="" 
        />

        {/* 🔥 Info Card */}
        <div className='bg-white rounded-2xl shadow-md p-8 flex flex-col gap-6 w-full md:w-1/2'>

          {/* Office */}
          <div>
            <p className='font-semibold text-lg text-gray-800 mb-1'>Our Office</p>
            <p className='text-gray-500 leading-6'>
              54709 Willms Station <br /> Suite 350, Washington, US
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className='text-gray-500'>
              📞 +91 7060864499 <br />
              ✉️ careconnect123@gmail.com
            </p>
          </div>

          {/* Careers */}
          <div>
            <p className='font-semibold text-lg text-gray-800 mb-1'>Careers at CareConnect</p>
            <p className='text-gray-500'>
              Learn more about our teams and job openings.
            </p>
          </div>

          {/* Button */}
          <button className='bg-primary text-white px-6 py-3 rounded-full w-fit hover:scale-105 hover:shadow-lg transition-all duration-300'>
            Explore Jobs
          </button>

        </div>

      </div>

    </div>
  )
}

export default Contact