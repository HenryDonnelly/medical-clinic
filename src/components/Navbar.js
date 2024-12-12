import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../utils/useAuth';
import { Navbar as MantineNavbar, ScrollArea, Button, Switch, Group, Divider } from '@mantine/core';
import { GiMedicines } from "react-icons/gi";
import { BsFillPersonFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { FaClipboard } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { CiSun } from "react-icons/ci";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { BiCommentError } from "react-icons/bi";




const Navbar = () => {
    const { logout } = useAuth();
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);



    //toggle 
    const handleToggleCollapse = () => setCollapsed(!collapsed);

    // testing collapsable navbar

    return (

        <MantineNavbar width={{ base: collapsed ? 80 : 300 }} height="100vw" p="xs" style={{ position: 'fixed', top: 0 }}>
            <div className="navbar bg-base-100" style={{ justifyContent: 'space-between', width: '100%', height:'100%' }}>

                <div className="flex-1" style={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-start', alignItems: 'center' }}>
                    {!collapsed && <a>Wicklow Medical Clinic</a>}
                    <Button
                        onClick={handleToggleCollapse}
                        style={{ marginLeft: collapsed ? '0' : 'auto' }} // pushing button to rightmost part of navbar
                    >
                        {collapsed ? '>' : '<'}
                    </Button>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1" style={{ listStyle: 'none', paddingLeft: collapsed ? '15px' : '40px', paddingTop: '20px' }}>
                        <li style={{ paddingBottom: '16px' }}><Link to='/' style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            // this was to stop text being coloured and underlined when clicked
                        }}><FaHome style={{ marginRight: '8px', fontSize: '24px', verticalAlign: 'middle' }} />{!collapsed && <span>Home</span>}</Link></li>
                        <li style={{ paddingBottom: '16px' }}><Link to='/doctors' style={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}><FaUserDoctor style={{ marginRight: '8px', fontSize: '24px', verticalAlign: 'middle' }} />{!collapsed && <span style={{ margin: 0 }}>Doctors</span>}</Link></li>
                        <li style={{ paddingBottom: '16px' }}><Link to='/patients' style={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}><BsFillPersonFill style={{ marginRight: '8px', fontSize: '24px', verticalAlign: 'middle' }} />{!collapsed && <span>Patients</span>}</Link></li>
                        <li style={{ paddingBottom: '16px' }}><Link to='/appointments' style={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}><FaClock style={{ marginRight: '8px', fontSize: '24px', verticalAlign: 'middle' }} />{!collapsed && <span>Appointments</span>}</Link></li>
                        <li style={{ paddingBottom: '16px' }}><Link to='/diagnoses' style={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}><FaClipboard style={{ marginRight: '8px', fontSize: '24px', verticalAlign: 'middle' }} />{!collapsed && <span>Diagnoses</span>}</Link></li>
                        <li style={{ paddingBottom: '16px' }}><Link to='/prescriptions' style={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}><GiMedicines style={{ marginRight: '8px', fontSize: '24px', verticalAlign: 'middle' }} />{!collapsed && <span>Prescriptions</span>}</Link></li>

                        <Divider my="md" style={{marginRight:'40px'}} />
                        <div >
                        <li style={{ paddingBottom: '16px' }}>
                            <a href="/doctor/create" style={{
                                color: "white",
                                padding: "5px",
                                fontFamily: "Arial",
                                textDecoration: 'none'
                            }}>
                                <CiCirclePlus stroke={1.5} style={{verticalAlign: 'middle', fontSize: '18px'}} />
                                {!collapsed &&<span>Create Doctor</span>}
                            </a>
                        </li>
                        <li style={{ paddingBottom: '16px' }}>
                            <a href="/patient/create" style={{
                                color: "white",
                                padding: "5px",
                                fontFamily: "Arial",
                                textDecoration: 'none'
                            }}>
                                <CiCirclePlus stroke={1.5} style={{verticalAlign: 'middle', fontSize: '18px'}} />
                                {!collapsed &&<span>Create Patient</span>}
                            </a>
                        </li>
                        <li style={{ paddingBottom: '16px' }}>
                            <a href="/appointment/create" style={{
                                color: "white",
                                padding: "5px",
                                fontFamily: "Arial",
                                textDecoration: 'none'
                            }}>
                                <CiCirclePlus stroke={1.5} style={{verticalAlign: 'middle', fontSize: '18px'}} />
                                {!collapsed &&<span>Create Appointment</span>}
                            </a>
                        </li>
                        <li style={{ paddingBottom: '16px' }}>
                            <a href="/diagnoses/create" style={{
                                color: "white",
                                padding: "5px",
                                fontFamily: "Arial",
                                textDecoration: 'none'
                            }}>
                                <CiCirclePlus stroke={1.5} style={{verticalAlign: 'middle', fontSize: '18px'}} />
                                {!collapsed &&<span>Create Diagnoses</span>}
                            </a>
                        </li>
                        <li style={{ paddingBottom: '16px' }}>
                            <a href="/prescription/create" style={{
                                color: "white",
                                padding: "5px",
                                fontFamily: "Arial",
                                textDecoration: 'none'
                            }}>
                                <CiCirclePlus stroke={1.5} style={{verticalAlign: 'middle', fontSize: '18px'}} />
                                {!collapsed &&<span>Create Presciption</span>}
                            </a>
                        </li>
                        </div>
                        <div style={{alignItems:'bottom'}}>
                        <Divider my="md" style={{marginRight:'40px'}}/>
                        <li style={{ paddingBottom: '16px' }}>
                            <a href="#" onClick={(event) => event.preventDefault()} style={{
                                color: "white",
                                padding: "5px",
                                fontFamily: "Arial",    
                                textDecoration: 'none'
                            }}>
                                <BiCommentError  stroke={1.5} style={{verticalAlign: 'middle'}} />
                                {!collapsed &&<span>Register</span>}
                            </a>
                        </li>
                        <li style={{ paddingBottom: '16px' }}>
                            <a href="#" onClick={(event) => event.preventDefault()} style={{
                                color: "white",
                                padding: "5px",
                                fontFamily: "Arial",
                                textDecoration: 'none'
                            }}>
                                <CiLogout  stroke={1.5} style={{verticalAlign: 'middle'}} />
                                {!collapsed &&<span>Logout</span>}
                            </a>
                        </li>
                        </div>
                    </ul>

                </div>
            </div>
        </MantineNavbar>
    );
};

export default Navbar;
