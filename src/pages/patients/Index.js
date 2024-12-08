import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/useAuth';
import { useNavigate } from "react-router-dom";



const Index = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();
    const {token} = useAuth();

    const getPatients= async () => {
        try {
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/patients/`);
            setPatients(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getPatients();
        }

        fetchData();
    }, []);

    if (!patients.length) {
        return <div>Loading...</div>
    }
    return (
            <div>
                <div>
                {
                patients && patients.map((patient) => {
                    return (
                        <div>
                            <div>
                                <h2>{patient.first_name} {patient.last_name}</h2>
                                <div >
                                <button onClick={() => navigate(`/patient/${patient.id}`)}>
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
                
    )
};

export default Index;