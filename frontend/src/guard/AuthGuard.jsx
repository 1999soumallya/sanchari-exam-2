import React from "react";
import { Navigate, Outlet } from 'react-router-dom'
import { getCookie } from "../helper/cookiesHelper";

export const BeforeLogin = () => {
    return getCookie('auth_token') ? <Navigate to="/dashboard" /> : <Outlet />
}

export const AfterLogin = () => {
    return getCookie('auth_token') ? <Outlet /> : <Navigate to="/" />
}