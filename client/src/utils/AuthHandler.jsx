import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('id');
        if (token) {
            localStorage.setItem('crsftoken', token);
            toast.success("Login Successfull")
            navigate('/home');
        } else {
            navigate('/login');
        }
    }, [location, navigate]);

    return <div className='flex items-start justify-center'><CircularProgress /></div>;
};

export default AuthHandler;
