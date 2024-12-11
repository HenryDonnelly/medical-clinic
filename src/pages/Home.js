import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { BackgroundImage, Center, Text, Box, Switch, Group, useMantineTheme } from '@mantine/core';






const Home = () => {
    const [doctors, setDoctors] = useState([])
    const [doctorAppointments, setDoctorAppointments] = useState([])
    const [doctorPrescriptions, setDoctorPrescriptions] = useState([])
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate(); // Define navigate with useNavigate hook



    return (
        // stop side scrolling
        
        
        <div style={{ overflowX: 'hidden', position: 'relative' }}>
      <div>
        <Box style={{height:'100vh', width:'100vw'}}>
        <BackgroundImage
        src="/Wicklow-healthCare-Centre-0.jpg"
        style={{height:'100%', width:'100%'}}>
        </BackgroundImage>
        </Box>
        </div>
    </div>
    );
};

export default Home;