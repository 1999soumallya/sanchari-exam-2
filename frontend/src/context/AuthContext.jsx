import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCookie } from '../helper/cookiesHelper'

const AuthContext = createContext({
    isAuthorized: false,
    userDetails: null,
    setIsAuthorized: () => { },
    setUserDetails: () => { },
})

const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [userDetails, setUserDetails] = useState(null)

    const value = { isAuthorized, userDetails, setIsAuthorized, setUserDetails }

    useEffect(() => {
        const auth_token = getCookie('auth_token')
        if (auth_token) {
            setUserDetails(JSON.parse(localStorage.getItem('user_details')))
            setIsAuthorized(true)
        } else {
            setIsAuthorized(false)
            setUserDetails(null)
        }
    }, [])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export function AuthState() {
    return useContext(AuthContext)
}