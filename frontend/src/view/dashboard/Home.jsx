import React from 'react'
import { Button } from 'react-bootstrap'
import { removeCookie } from '../../helper/cookiesHelper'
import { AuthState } from '../../context/AuthContext'
import axios from '../../config/axios'
import { toast } from 'react-toastify'

export default function HomeView() {

    const { setIsAuthorized, setUserDetails } = AuthState()

    const handleLogout = () => {
        axios.get('/api/auth/logout').then(({ data }) => {
            if (data.success) {
                toast.success(data.message)
                removeCookie('auth_token')
                setIsAuthorized(false)
                setUserDetails(null)
            } else {
                toast.error(data.message)
            }
        }).catch((error) => {
            toast.error(error.response ? error.response.data.message : error.toString())
        })
    }

    return (
        <div className='d-flex justify-content-center h-100 align-items-center'>
            This is my home
            <Button type='button' variant="outline-success" onClick={() => handleLogout()}>Logout</Button>
        </div>
    )
}
