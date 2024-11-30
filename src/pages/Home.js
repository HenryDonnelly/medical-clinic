import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [doctors, setDoctors] = useState([])
    const [doctorAppointments, setDoctorAppointments] = useState([])
    const [doctorPrescriptions, setDoctorPrescriptions] = useState([])
    const navigate = useNavigate(); // Define navigate with useNavigate hook


    const getDoctors = async () => {
        try {
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/`);
            setDoctors(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    const getDoctorAppointments = async (id) => {
        try {
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/appointments`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImVtYWlsIjoiam9lLmJsb2dnc0BlbWFpbC5jb20ifQ.0kNJGun8HEfA4JHeSy3PYSg-JkQodmi89F3cYJdzwoM`
                }
            });
            setDoctorAppointments(res.data.filter((appointment) => appointment.doctor_id === id));
        } catch (e) {
            console.error(e);
        }
    };


    const getDoctorPrescriptions = async (id) => {
        try {
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/prescriptions`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImVtYWlsIjoiam9lLmJsb2dnc0BlbWFpbC5jb20ifQ.0kNJGun8HEfA4JHeSy3PYSg-JkQodmi89F3cYJdzwoM`
                }
            });
            setDoctorPrescriptions(res.data.filter((prescription) => prescription.doctor_id === id));
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

export default Home;