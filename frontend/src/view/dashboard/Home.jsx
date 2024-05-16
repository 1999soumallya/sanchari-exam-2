import React from 'react'
import { Button } from 'react-bootstrap'
import { removeCookie } from '../../helper/cookiesHelper'
import { AuthState } from '../../context/AuthContext'

export default function HomeView() {

    const { setIsAuthorized, setUserDetails } = AuthState()

    const handleLogout = () => {
        removeCookie('auth_token')
        setIsAuthorized(false)
        setUserDetails(null)
    }

    return (
        <div className='d-flex justify-content-center h-100 align-items-center'>
            This is my home
            <Button type='button' variant="outline-success" onClick={() => handleLogout()}>Logout</Button>
        </div>
    )
}
