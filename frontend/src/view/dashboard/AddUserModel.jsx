import React, { Fragment } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from '../../config/axios'
import { toast } from 'react-toastify'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as YUP from 'yup'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'


const roles = [
    {
        id: 1,
        value: 'admin'
    },
    {
        id: 2,
        value: 'user'
    },
    {
        id: 3,
        value: 'manager'
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}




export default function AddUserModel({ show, handleClose, getDetails }) {

    const formSchema = YUP.object().shape({
        userName: YUP.string().required('Username is required'),
        email: YUP.string().required('Email is required').email('Provide valid email address'),
        password: YUP.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        role: YUP.string().required('Role is required').default('user')
    })

    const { register, handleSubmit, formState: { errors }, reset, control, setError } = useForm({ resolver: yupResolver(formSchema), mode: 'all' })

    const handleReset = () => {
        handleClose()
        reset()
    }

    const onSubmit = (data) => {
        axios.post('/api/auth/add-user', data).then(({ data }) => {
            if (data.success) {
                toast.success(data.message)
                handleReset()
                getDetails()
            } else {
                toast.error(data.message)
            }
        }).catch((error) => {
            toast.error(error.response ? error.response.data.message : error.toString())
            if (error.response && error.response.data.errors) {
                error.response.data.errors.forEach((error) => {
                    setError(error.path, { message: error.msg, type: 'required' })
                })
            }
        })
    }

    return (
        <Modal show={show} onHide={handleReset}>
            <Modal.Header closeButton>
                <Modal.Title>Create a user</Modal.Title>
            </Modal.Header>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body className="flex min-h-full flex-1 flex-col justify-center">
                    <div className='mb-4'>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input id="username" name="username" type="text" {...register('userName')} autoComplete="username" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                        </div>
                        {errors.userName && <p className='text-red-500 font-mono text-sm absolute'>{errors.userName.message}</p>}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" {...register('email')} autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                        </div>
                        {errors.email && <p className='text-red-500 font-mono text-sm absolute'>{errors.email.message}</p>}
                    </div>

                    <div className='mb-4'>
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

                    <div className='mb-4'>
                        <Controller control={control} name='role' render={({ field: { onChange, value, ref } }) => (
                            <Listbox ref={ref} value={value} onChange={(value) => onChange(value)}>
                                {
                                    ({ open }) => (
                                        <>
                                            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Select Role</Listbox.Label>
                                            <div className="relative mt-2">
                                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                                    <span className="flex items-center">
                                                        <span className="ml-3 block truncate">{value || 'user'}</span>
                                                    </span>
                                                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </span>
                                                </Listbox.Button>

                                                <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {
                                                            roles.map((role) => (
                                                                <Listbox.Option key={role.id} className={({ active }) => classNames(active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9')} value={role.value}>
                                                                    {
                                                                        ({ selected, active }) => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                                        {role.value}
                                                                                    </span>
                                                                                </div>

                                                                                {
                                                                                    selected ? (
                                                                                        <span className={classNames(active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4')}>
                                                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                        </span>
                                                                                    ) : null
                                                                                }
                                                                            </>
                                                                        )
                                                                    }
                                                                </Listbox.Option>
                                                            ))
                                                        }
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </>
                                    )
                                }
                            </Listbox>
                        )}
                        />
                        {errors.role && <p className='text-red-500 font-mono text-sm absolute'>{errors.role.message}</p>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleReset}>
                        Cancel
                    </Button>
                    <Button type='submit' className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Add User
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
