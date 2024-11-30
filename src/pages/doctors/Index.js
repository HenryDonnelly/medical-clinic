import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/useAuth';
import { TextInput, Select, Button } from '@mantine/core'; 
import { useNavigate } from "react-router-dom";



const Index = () => {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate(); // Define navigate with useNavigate hook
    const {token} = useAuth();

    const getDoctors = async () => {
        try {
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/`);
            setDoctors(res.data);
        } catch (e) {
            console.error(e);
        }
    };


    useEffect(() => {
        // We can't make useEffect itself async, so we call an async function from inside it
        const fetchData = async () => {
            await getDoctors();
        }

        fetchData();
    }, []);


    if (!doctors.length) {
        return <div>Loading...</div>
    }

    return (
        <div>
        <div>
            
            {
                doctors && doctors.map((doctor) => {
                    return (
                        <div>
                            <div>
                                <h2>Dr {doctor.first_name} {doctor.last_name}</h2>
                                <p>Specialisation: {doctor.specialisation}</p>
                                <div >
                                <button onClick={() => navigate(`/doctor/${doctor.id}`)}>
                                View
                            </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
    );
};


export default Index;