import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

  const navigate = useNavigate()

  return (
    <div className='bg-gray-50 mt-40 px-6 md:px-10 pt-14'>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm'>

        {/* 🔥 LOGO + ABOUT */}
        <div>
          <img 
            onClick={() => navigate('/')} 
            className='w-36 cursor-pointer rounded-xl bg-primary/10 p-2 mb-4 transition-all duration-300 hover:scale-105 hover:shadow-md' 
            src={assets.logo} 
            alt="Logo" 
          />
          <p className='text-gray-600 leading-6'>
            CareConnect is your trusted platform to connect with experienced doctors anytime, anywhere. Book appointments easily and manage your healthcare digitally.
          </p>
        </div>

        {/* 🔥 COMPANY */}
        <div>
          <p className='text-lg font-semibold mb-4 text-gray-800'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='hover:text-primary cursor-pointer'>Home</li>
            <li className='hover:text-primary cursor-pointer'>About Us</li>
            <li className='hover:text-primary cursor-pointer'>Delivery</li>
            <li className='hover:text-primary cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        {/* 🔥 CONTACT */}
        <div>
          <p className='text-lg font-semibold mb-4 text-gray-800'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='hover:text-primary'>+91 7060864499</li>
            <li className='hover:text-primary'>careconnect123@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* 🔥 BOTTOM */}
      <div className='mt-10 border-t pt-5'>
        <p className='text-center text-gray-500 text-sm'>
          © 2024 CareConnect. All Rights Reserved.
        </p>
      </div>

    </div>
  )
}

export default Footer