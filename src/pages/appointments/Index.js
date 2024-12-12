import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/useAuth';
import { useNavigate } from 'react-router-dom';
import { TextInput, Select, Button, Card, Text, Badge, Group, Grid, Col } from '@mantine/core'; 
    


const Index = () => {
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();
    const {token} = useAuth();

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

                const appointmentResponse = await axios.get('https://fed-medical-clinic-api.vercel.app/appointments', {
                    headers: {
                      Authorization: `Bearer ${token}`,
                   },
               });
            setAppointments(appointmentResponse.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDoctorsAndPatientsAndAppointments();
    },[token]);


    if (!appointments) return 'Loading...'

    return (
        <div>
            <Grid>
            {
            appointments && appointments.map((appointment) => {
                // error with this code, instead i find doc/patient by id to ensure they exist
                // const doctor = appointment.doctor;
                // const patient = appointment.patient;
                const doctor = doctors.find((d) => d.id === appointment.doctor_id);
                const patient = patients.find((p) => p.id === appointment.patient_id);
                return (
                        <Col span={4}>
                        <Card style={{marginTop:20}}>
                            <Text weight={500}>
                            <h2>Appointment with Dr {doctor.first_name} {doctor.last_name}</h2>
                        <p><strong>Specialisation:</strong> {doctor.specialisation}</p>
                        <p><strong>Patient:</strong> {patient.first_name} {patient.last_name}</p>
                        <p><strong>Appointment Date:</strong> {new Date(appointment.appointment_date).toLocaleString()}</p>
                        </Text>
                        <Text style={{marginTop:20, marginBottom:5}}>
                        </Text>
                        <Button
                                        variant="outline"
                                        color="blue"
                                        onClick={() => navigate(`/patient/${patient.id}`)}
                                    >
                                        View
                                    </Button>
                            </Card>
                            </Col>
                    )
                })
            }
            </Grid>
        </div>
    );
};

export default Index;