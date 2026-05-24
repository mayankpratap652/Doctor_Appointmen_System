import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData()

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            if (image) formData.append('image', image)

            const { data } = await axios.post(
                backendUrl + '/api/user/update-profile',
                formData,
                { headers: { token } }
            )

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return userData ? (
        <div className='px-6 md:px-10 py-6 flex justify-center'>

            <div className='w-full max-w-3xl bg-white rounded-2xl shadow-md p-6'>

                {/* 🔥 Profile Top */}
                <div className='flex flex-col md:flex-row items-center gap-6'>

                    {/* Image */}
                    <div>
                        {isEdit ? (
                            <label htmlFor='image' className='cursor-pointer relative'>
                                <img 
                                    className='w-32 h-32 object-cover rounded-full opacity-80 border-2 border-primary/30' 
                                    src={image ? URL.createObjectURL(image) : userData.image} 
                                    alt="" 
                                />
                                <img 
                                    className='w-8 absolute bottom-2 right-2' 
                                    src={assets.upload_icon} 
                                    alt="" 
                                />
                                <input 
                                    type="file" 
                                    id="image" 
                                    hidden 
                                    onChange={(e) => setImage(e.target.files[0])} 
                                />
                            </label>
                        ) : (
                            <img 
                                className='w-32 h-32 object-cover rounded-full border-2 border-primary/20' 
                                src={userData.image} 
                                alt="" 
                            />
                        )}
                    </div>

                    {/* Name */}
                    <div className='text-center md:text-left'>
                        {isEdit ? (
                            <input 
                                className='text-2xl font-semibold border-b outline-none'
                                value={userData.name}
                                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                            />
                        ) : (
                            <h2 className='text-2xl font-semibold text-gray-800'>
                                {userData.name}
                            </h2>
                        )}
                        <p className='text-gray-500 text-sm'>{userData.email}</p>
                    </div>

                </div>

                {/* 🔥 Info Sections */}
                <div className='grid md:grid-cols-2 gap-8 mt-8 text-sm'>

                    {/* Contact */}
                    <div>
                        <p className='font-semibold text-gray-700 mb-3'>Contact Info</p>

                        <div className='flex flex-col gap-3'>
                            <div>
                                <span className='text-gray-500'>Phone:</span><br />
                                {isEdit ? (
                                    <input 
                                        className='border rounded px-2 py-1 w-full'
                                        value={userData.phone}
                                        onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                    />
                                ) : (
                                    <p className='text-gray-700'>{userData.phone}</p>
                                )}
                            </div>

                            <div>
                                <span className='text-gray-500'>Address:</span><br />
                                {isEdit ? (
                                    <>
                                        <input 
                                            className='border rounded px-2 py-1 w-full mb-1'
                                            value={userData.address.line1}
                                            onChange={(e) => setUserData(prev => ({
                                                ...prev,
                                                address: { ...prev.address, line1: e.target.value }
                                            }))}
                                        />
                                        <input 
                                            className='border rounded px-2 py-1 w-full'
                                            value={userData.address.line2}
                                            onChange={(e) => setUserData(prev => ({
                                                ...prev,
                                                address: { ...prev.address, line2: e.target.value }
                                            }))}
                                        />
                                    </>
                                ) : (
                                    <p className='text-gray-700'>
                                        {userData.address.line1}, {userData.address.line2}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div>
                        <p className='font-semibold text-gray-700 mb-3'>Basic Info</p>

                        <div className='flex flex-col gap-3'>

                            <div>
                                <span className='text-gray-500'>Gender:</span><br />
                                {isEdit ? (
                                    <select 
                                        className='border rounded px-2 py-1 w-full'
                                        value={userData.gender}
                                        onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                    >
                                        <option>Not Selected</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                ) : (
                                    <p className='text-gray-700'>{userData.gender}</p>
                                )}
                            </div>

                            <div>
                                <span className='text-gray-500'>Birthday:</span><br />
                                {isEdit ? (
                                    <input 
                                        type='date'
                                        className='border rounded px-2 py-1 w-full'
                                        value={userData.dob}
                                        onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                    />
                                ) : (
                                    <p className='text-gray-700'>{userData.dob}</p>
                                )}
                            </div>

                        </div>
                    </div>

                </div>

                {/* 🔥 Buttons */}
                <div className='mt-8 flex justify-end gap-3'>
                    {isEdit ? (
                        <>
                            <button 
                                onClick={() => setIsEdit(false)}
                                className='px-6 py-2 border rounded-full'
                            >
                                Cancel
                            </button>

                            <button 
                                onClick={updateUserProfileData}
                                className='px-6 py-2 bg-primary text-white rounded-full hover:scale-105 transition'
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={() => setIsEdit(true)}
                            className='px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition'
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

            </div>
        </div>
    ) : null
}

export default MyProfile