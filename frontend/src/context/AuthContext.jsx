import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext({ isAuthorized: false, userDetails: null, });

const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [userDetails, setUserDetails] = useState(null)

    const value = { isAuthorized, userDetails, setIsAuthorized, setUserDetails }

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