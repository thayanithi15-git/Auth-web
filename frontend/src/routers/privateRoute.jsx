import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem('authToken'); // or use a context or state to check authentication

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />
    }

    return element;
}

export default PrivateRoute;
