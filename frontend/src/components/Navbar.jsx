import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-4 mb-5 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm'>

      {/* 🔥 LOGO */}
      <img 
        onClick={() => navigate('/')} 
        className='w-40 cursor-pointer rounded-xl bg-primary/10 p-2 transition-all duration-300 hover:scale-105 hover:shadow-lg' 
        src={assets.logo} 
        alt="Logo" 
      />

      {/* 🔥 DESKTOP MENU */}
      <ul className='md:flex items-center gap-8 font-medium hidden'>
        {[
          { name: "HOME", path: "/" },
          { name: "ALL DOCTORS", path: "/doctors" },
          { name: "ABOUT", path: "/about" },
          { name: "CONTACT", path: "/contact" }
        ].map((item, index) => (
          <NavLink key={index} to={item.path} className='group'>
            <li className='py-1 transition-all duration-300 group-hover:text-primary'>
              {item.name}
            </li>
            <hr className='h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300 border-none' />
          </NavLink>
        ))}
      </ul>

      {/* 🔥 RIGHT SECTION */}
      <div className='flex items-center gap-4'>

        {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-9 h-9 rounded-full border-2 border-primary/30' src={userData.image} alt="" />
            <img className='w-2.5 group-hover:rotate-180 transition-all duration-300' src={assets.dropdown_icon} alt="" />

            {/* Dropdown */}
            <div className='absolute top-0 right-0 pt-14 text-sm font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-white rounded-xl shadow-lg flex flex-col gap-3 p-4'>
                <p onClick={() => navigate('/my-profile')} className='hover:text-primary cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className='hover:text-primary cursor-pointer'>My Appointments</p>
                <p onClick={logout} className='hover:text-red-500 cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/login')} 
            className='bg-primary text-white px-6 py-2.5 rounded-full text-sm hover:scale-105 transition-all duration-300 shadow-md hidden md:block'
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img 
          onClick={() => setShowMenu(true)} 
          className='w-6 md:hidden cursor-pointer' 
          src={assets.menu_icon} 
          alt="" 
        />

        {/* 🔥 MOBILE MENU */}
        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          
          <div className='flex items-center justify-between px-5 py-6 border-b'>
            <img src={assets.logo} className='w-32' alt="" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7 cursor-pointer' alt="" />
          </div>

          <ul className='flex flex-col items-center gap-4 mt-8 text-lg font-medium'>
            {["/", "/doctors", "/about", "/contact"].map((path, i) => (
              <NavLink key={i} onClick={() => setShowMenu(false)} to={path}>
                <p className='px-6 py-2 rounded-full hover:bg-primary/10 transition'>
                  {["HOME", "ALL DOCTORS", "ABOUT", "CONTACT"][i]}
                </p>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar