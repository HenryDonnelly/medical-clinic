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
        src="/medical05.jpg"
        style={{height:'100%', width:'100%'}}>
        </BackgroundImage>
        <Box style={{position:'absolute', top:'50%', left:'20%', padding: '10px',transform:'translate(-50%,-50%)', backgroundColor:'rgba(0, 0, 0, 0.7)', zIndex: 1}}>
            <Text style={{color:"white", padding: '10px', fontSize:'30px'}}>
                 Welcome to the clinics new app
            </Text>
            <Text style={{color:"white", padding: '10px', fontSize:'20px'}}>
                 Make sure to login before trying to <br /> change sensitive data!
            </Text>
            </Box>
        </Box>
        </div>
    </div>
    );
};

export default Home;