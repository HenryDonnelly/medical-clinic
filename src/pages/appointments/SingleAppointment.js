import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useAuth } from '../../utils/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';


const SingleAppointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [appointment, setAppointment] = useState([]);
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();
    const {token} = useAuth();
    const { id } = useParams();

    useEffect(()=>{
        const fetchDoctorsAndPatientsAndAppointments = async () => {
            try{
                const doctorResponse = await axios.get('https://fed-medical-clinic-api.vercel.app/doctors', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
            });
            setDoctors(doctorResponse.data);

                const patientResponse=await axios.get('https://fed-medical-clinic-api.vercel.app/patients',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            setPatients(patientResponse.data);

                const appointmentResponse = await axios.get(`https://fed-medical-clinic-api.vercel.app/appointments/${id}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                   },
               });
            setAppointment(appointmentResponse.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDoctorsAndPatientsAndAppointments();
    },[id, token]);


    if (!appointment) return 'Loading...'

    const doctor = doctors.find((d) => d.id === appointment.doctor_id);
    const patient = patients.find((p) => p.id === appointment.patient_id);                

                    return (
                    <div>
                        {doctor && patient && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
                        <h2>Appointment with Dr {doctor.first_name} {doctor.last_name}</h2>
                        <p><strong>Specialisation:</strong> {doctor.specialisation}</p>
                        <p><strong>Patient:</strong> {patient.first_name} {patient.last_name}</p>
                        <p><strong>Appointment Date:</strong> {new Date(appointment.appointment_date).toLocaleString()}</p>
                        <div>
                                        <Button
                                            variant="outline"
                                            color="blue"
                                            onClick={() => navigate(`/appointment/${appointment.id}/edit`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            color="blue"
                                            onClick={() => navigate(`/appointment/${appointment.id}/delete`)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                        </div>
                        )}
                      
                    </div>
                )   
};

export default SingleAppointment;