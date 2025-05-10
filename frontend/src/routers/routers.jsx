import React from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import SignIn from '../pages/signin/signin'
import SignUp from '../pages/signup/signup'
import ForgotPassword from '../pages/forgot-password/forgot-pass'
import Home from '../pages/home/home'

export default function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate to="/signin" replace />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}
