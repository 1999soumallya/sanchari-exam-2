import React from "react";
import { Navigate, Outlet } from 'react-router-dom'
import { AuthState } from "../context/AuthContext";

export const BeforeLogin = () => {
    const { isAuthorized } = AuthState()

    return isAuthorized ? <Navigate to="/dashboard" /> : <Outlet />
}

export const AfterLogin = () => {
    const { isAuthorized } = AuthState()

    return isAuthorized ? <Outlet /> : <Navigate to="/" />
}