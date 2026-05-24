import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Login = () => {

  const [state, setState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)


  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      setLoading(true)

      if (state === 'Sign Up') {
        const { data } = await axios.post(
          backendUrl + '/api/user/register',
          { name, email, password }
        )

        if (data.success) {
          localStorage.setItem('token', data.token)
          toast.success("Registration Successful ✅")
          setToken(data.token)
        } else {
          toast.error(data.message)
        }

      } else {
        const { data } = await axios.post(
          backendUrl + '/api/user/login',
          { email, password }
        )

        if (data.success) {
          localStorage.setItem('token', data.token)
          toast.success("Login Successful ✅")
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error("Something went wrong ❌")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className='min-h-screen flex items-center justify-center 
    bg-gradient-to-r from-indigo-100 via-blue-100 to-purple-100 px-4'>

      <div className='w-full max-w-5xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl'>

        {/* 🔥 Left Side */}
        <div className='hidden md:flex flex-col justify-center items-center 
        bg-primary text-white p-10 relative'>

          <img src={assets.logo} className='w-40 mb-6' alt="" />

          <h1 className='text-3xl font-bold text-center leading-snug'>
            Welcome to CareConnect
          </h1>

          <p className='text-white/80 mt-4 text-center'>
            Book appointments with trusted doctors easily and quickly.
          </p>

          <img 
            src={assets.appointment_img} 
            className='w-72 mt-8 drop-shadow-xl' 
            alt="" 
          />
        </div>

        {/* 🔥 Right Side */}
        <form onSubmit={onSubmitHandler} 
        className='bg-white/80 backdrop-blur-md p-8 sm:p-10 flex flex-col justify-center'>

          <h2 className='text-2xl font-bold text-gray-800'>
            {state === 'Sign Up' ? 'Create Account' : 'Welcome Back 👋'}
          </h2>

          <p className='text-gray-500 mb-6 text-sm'>
            {state === 'Sign Up' 
              ? 'Sign up to get started' 
              : 'Login to continue'}
          </p>

          {/* Name */}
          {state === 'Sign Up' && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-primary outline-none'
              required
            />
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-primary outline-none'
            required
          />

          {/* Password */}
          <div className='relative'>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border rounded-lg px-3 py-2 w-full mb-4 focus:ring-2 focus:ring-primary outline-none'
              required
            />
            <span 
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-2 cursor-pointer text-sm text-gray-500'
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>

          {/* Button */}
          <button 
            disabled={loading}
            className='bg-primary text-white py-2 rounded-full font-medium 
            hover:scale-105 transition-all duration-300 shadow-md'
          >
            {loading 
              ? "Please wait..." 
              : state === 'Sign Up' 
                ? 'Create Account' 
                : 'Login'}
          </button>

          {/* Toggle */}
          {state === 'Sign Up' ? (
            <p className='mt-4 text-sm text-gray-600'>
              Already have an account?{" "}
              <span 
                onClick={() => setState('Login')} 
                className='text-primary cursor-pointer underline'
              >
                Login
              </span>
            </p>
          ) : (
            <>
              <p className='mt-4 text-sm text-gray-600'>
                Don’t have an account?{" "}
                <span 
                  onClick={() => setState('Sign Up')} 
                  className='text-primary cursor-pointer underline'
                >
                  Sign Up
                </span>
              </p>

              <p className='text-primary text-sm mt-2 cursor-pointer'>
                Forgot Password?
              </p>
            </>
          )}

        </form>
      </div>
    </div>
  )
}

export default Login