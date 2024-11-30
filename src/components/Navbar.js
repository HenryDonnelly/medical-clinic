import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../utils/useAuth';
import { Navbar as MantineNavbar } from '@mantine/core';

const Navbar = () => {
    const { logout } = useAuth();
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await axios.get('https://fed-medical-clinic-api.vercel.app/doctors/');
                setDoctors(res.data);
            } catch (e) {
                console.error(e);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <MantineNavbar width={{ base: 300 }} height={500} p="xs">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Medical Clinic</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/festivals'>Festivals</Link></li>
                        <li><Link to='/register'>Register</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/doctors'>doctors</Link></li>
                        <button onClick={() => {
                            logout();
                            navigate('/login', { replace: true });
                        }}>Logout</button>

                        <button onClick={() => navigate('/doctor/create')}>
                            Create Doctor
                        </button>
                    </ul>
                </div>
            </div>
        </MantineNavbar>
    );
};

export default Navbar;
