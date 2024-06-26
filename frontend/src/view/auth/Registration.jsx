import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as YUP from 'yup'
import { setCookie } from '../../helper/cookiesHelper'
import { AuthState } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import axios from '../../config/axios'

export default function Registration() {

    const formSchema = YUP.object().shape({
        userName: YUP.string().required('Username is required'),
        email: YUP.string().required('Email is required').email('Provide valid email address'),
        password: YUP.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        confirmPassword: YUP.string().oneOf([YUP.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(formSchema), mode: 'all' })

    const { setIsAuthorized, setUserDetails } = AuthState()

    const onSubmit = (data) => {
        axios.post('/api/auth/registration', data).then(({ data }) => {
            if (data.success) {
                toast.success(data.message)
                localStorage.setItem('user_details', JSON.stringify(data.data))
                setCookie('auth_token', data.token)
                setIsAuthorized(true)
                setUserDetails(data.data)
            } else {
                toast.error(data.message)
            }
        }).catch((error) => {
            toast.error(error.response ? error.response.data.message : error.toString())
        })
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input id="username" name="username" type="text" {...register('userName')} autoComplete="username" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                        </div>
                        {errors.userName && <p className='text-red-500 font-mono text-sm absolute'>{errors.userName.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" {...register('email')} autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                        </div>
                        {errors.email && <p className='text-red-500 font-mono text-sm absolute'>{errors.email.message}</p>}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="relative rounded-md shadow-sm mt-2">
                            <input id="password" name="password" type="password" {...register('password')} autoComplete="current-password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                        </div>
                        {errors.password && <p className='text-red-500 font-mono text-sm absolute'>{errors.password.message}</p>}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="confirm_password" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input id="confirm_password" name="confirm_password" type="password" {...register('confirmPassword')} autoComplete="current-password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                        </div>
                        {errors.confirmPassword && <p className='text-red-500 font-mono text-sm absolute'>{errors.confirmPassword.message}</p>}
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="mt-10 absolute text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}
