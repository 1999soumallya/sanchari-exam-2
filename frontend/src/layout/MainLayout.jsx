import React from 'react'
import Header from '../components/header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'

export default function MainLayout() {
    return (
        <>
            <Header />
            <div className='p-9'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
