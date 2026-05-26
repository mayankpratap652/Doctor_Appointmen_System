import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // 🔥 Date Format Fix
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')

        return (
            dateArray[0] +
            " " +
            months[Number(dateArray[1]) - 1] +
            " " +
            dateArray[2]
        )
    }

    // 🔥 Razorpay Payment
    const appointmentRazorpay = async (appointmentId) => {
        try {

            const { data } = await axios.post(
                backendUrl + '/api/user/payment-razorpay',
                { appointmentId },
                { headers: { token } }
            )

            if (data.success) {

                const options = {
                    key: data.order.key_id,
                    amount: data.order.amount,
                    currency: data.order.currency,
                    name: "Appointment Payment",
                    description: "Doctor Appointment Payment",
                    order_id: data.order.id,

                    handler: async function (response) {

                        const verifyData = await axios.post(
                            backendUrl + '/api/user/verifyRazorpay',
                            response,
                            { headers: { token } }
                        )

                        if (verifyData.data.success) {
                            toast.success("Payment Successful")
                            getUserAppointments()
                            navigate('/my-appointments')
                        } else {
                            toast.error("Payment Failed")
                        }
                    }
                }

                const rzp = new window.Razorpay(options)
                rzp.open()
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // 🔥 Get Appointments
    const getUserAppointments = async () => {
        try {

            const { data } = await axios.get(
                backendUrl + '/api/user/appointments',
                { headers: { token } }
            )

            // 🔥 Reverse Fix
            setAppointments([...data.appointments].reverse())

        } catch (error) {
            toast.error(error.message)
        }
    }

    // 🔥 Cancel Appointment
    const cancelAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(
                backendUrl + '/api/user/cancel-appointment',
                { appointmentId },
                { headers: { token } }
            )

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className='px-6 md:px-10'>

            {/* 🔥 Heading */}
            <h2 className='mt-10 text-2xl font-semibold text-gray-700 border-b pb-3'>
                My Appointments
            </h2>

            {/* 🔥 Appointment List */}
            <div className='mt-6 flex flex-col gap-6'>

                {appointments.length > 0 ? (
                    appointments.map((item, index) => (

                        <div
                            key={index}
                            className='bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col md:flex-row gap-6'
                        >

                            {/* 🔥 Doctor Image */}
                            <img
                                className='w-full md:w-40 h-40 object-cover rounded-xl bg-primary/10'
                                src={item.docData.image}
                                alt="doctor"
                            />

                            {/* 🔥 Doctor Info */}
                            <div className='flex-1 text-sm text-gray-600'>

                                <p className='text-lg font-semibold text-gray-800'>
                                    {item.docData.name}
                                </p>

                                <p className='text-primary font-medium'>
                                    {item.docData.speciality}
                                </p>

                                <p className='mt-2 text-gray-500'>
                                    {item.docData.address.line1},
                                    {" "}
                                    {item.docData.address.line2}
                                </p>

                                <p className='mt-2'>
                                    <span className='font-medium text-gray-700'>
                                        Date & Time:
                                    </span>
                                    {" "}
                                    {slotDateFormat(item.slotDate)}
                                    {" | "}
                                    {item.slotTime}
                                </p>

                            </div>

                            {/* 🔥 Actions */}
                            <div className='flex flex-col gap-2 justify-center md:items-end text-sm'>

                                {/* 🔥 Pay Button */}
                                {!item.cancelled &&
                                    !item.payment &&
                                    !item.isCompleted &&
                                    payment !== item._id && (

                                        <button
                                            onClick={() => setPayment(item._id)}
                                            className='px-6 py-2 rounded-full border hover:bg-primary hover:text-white transition'
                                        >
                                            Pay Online
                                        </button>
                                    )}

                                {/* 🔥 Razorpay Button Only */}
                                {!item.cancelled &&
                                    !item.payment &&
                                    !item.isCompleted &&
                                    payment === item._id && (

                                        <button
                                            onClick={() => appointmentRazorpay(item._id)}
                                            className='px-6 py-2 rounded-full border flex justify-center hover:bg-primary/10 transition'
                                        >
                                            <img
                                                className='h-5'
                                                src={assets.razorpay_logo}
                                                alt="razorpay"
                                            />
                                        </button>
                                    )}

                                {/* 🔥 Paid */}
                                {item.payment && !item.isCompleted && (
                                    <span className='px-6 py-2 rounded-full bg-primary/10 text-primary text-center'>
                                        Paid
                                    </span>
                                )}

                                {/* 🔥 Completed */}
                                {item.isCompleted && (
                                    <span className='px-6 py-2 rounded-full border border-green-500 text-green-500 text-center'>
                                        Completed
                                    </span>
                                )}

                                {/* 🔥 Cancelled */}
                                {item.cancelled && (
                                    <span className='px-6 py-2 rounded-full border border-red-500 text-red-500 text-center'>
                                        Cancelled
                                    </span>
                                )}

                                {/* 🔥 Cancel Button */}
                                {!item.cancelled && !item.isCompleted && (
                                    <button
                                        onClick={() => cancelAppointment(item._id)}
                                        className='px-6 py-2 rounded-full border hover:bg-red-500 hover:text-white transition'
                                    >
                                        Cancel
                                    </button>
                                )}

                            </div>

                        </div>
                    ))
                ) : (
                    <p className='text-gray-400 text-center mt-10'>
                        No appointments found
                    </p>
                )}

            </div>
        </div>
    )
}

export default MyAppointments