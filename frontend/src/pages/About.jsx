import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='px-6 md:px-10'>

      {/* 🔥 Heading */}
      <div className='text-center text-3xl pt-12 text-gray-600'>
        <p>ABOUT <span className='text-primary font-semibold'>US</span></p>
      </div>

      {/* 🔥 Content Section */}
      <div className='my-12 flex flex-col md:flex-row gap-12 items-center'>

        {/* Image */}
        <img 
          className='w-full md:max-w-[400px] rounded-2xl shadow-lg' 
          src={assets.about_image} 
          alt="" 
        />

        {/* Text */}
        <div className='flex flex-col justify-center gap-6 md:w-1/2 text-sm text-gray-600 leading-6'>
          <p>
            Welcome to <span className='font-semibold text-gray-800'>CareConnect</span>, your trusted partner in managing healthcare needs efficiently. We simplify the process of booking doctor appointments and managing health records.
          </p>

          <p>
            We continuously improve our platform using modern technology to provide a smooth and reliable experience. Whether it's your first appointment or ongoing care, CareConnect is here to support you.
          </p>

          <div>
            <p className='text-lg font-semibold text-gray-800 mb-1'>Our Vision</p>
            <p>
              To create a seamless healthcare experience by connecting patients with the right doctors anytime, anywhere.
            </p>
          </div>
        </div>

      </div>

      {/* 🔥 Why Choose Us */}
      <div className='text-2xl my-6 text-gray-700 font-semibold'>
        WHY CHOOSE US
      </div>

      {/* 🔥 Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20'>

        {/* Card 1 */}
        <div className='bg-white border rounded-2xl p-8 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer'>
          <b className='text-lg text-gray-800 group-hover:text-primary'>Efficiency</b>
          <p className='text-gray-600 group-hover:text-gray-700'>
            Streamlined appointment scheduling that fits into your busy lifestyle.
          </p>
        </div>

        {/* Card 2 */}
        <div className='bg-white border rounded-2xl p-8 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer'>
          <b className='text-lg text-gray-800 group-hover:text-primary'>Convenience</b>
          <p className='text-gray-600 group-hover:text-gray-700'>
            Access to a network of trusted healthcare professionals near you.
          </p>
        </div>

        {/* Card 3 */}
        <div className='bg-white border rounded-2xl p-8 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer'>
          <b className='text-lg text-gray-800 group-hover:text-primary'>Personalization</b>
          <p className='text-gray-600 group-hover:text-gray-700'>
            Tailored recommendations and reminders to keep your health on track.
          </p>
        </div>

      </div>

    </div>
  )
}

export default About