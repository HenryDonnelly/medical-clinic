    import { useState } from "react"
    import axios from 'axios'
    import { useNavigate } from 'react-router-dom';
    import { useAuth } from "../../utils/useAuth";
    import { useForm } from '@mantine/form';
    import { useEffect } from "react";
    import { TextInput, Select, Button } from '@mantine/core'; 


    const Create = () => {
        const {token} = useAuth();
        const navigate = useNavigate();

        const [doctors, setDoctors] = useState([]);
        const [patients, setPatients] = useState([]);

        const form = useForm({
            initialValues: {
                doctor_id: '',
                patient_id: '',
                appointment_date: null,
            },
            validate: {
                doctor_id: (value) => value ? null : 'Doctor is required',
                patient_id: (value) => value ? null : 'Patient is required',
                appointment_date: (value) => value ? null : 'Appointment date is required',
            },
        });

        useEffect(()=>{
            const fetchDoctorsAndPatients = async () => {
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
                } catch (err) {
                    console.error(err);
                }
            };
            fetchDoctorsAndPatients();
        },[token]);

        const handleSubmit = () => {
            if (form.validate().hasErrors) {
                return;
            }

            const appointmentData = {
                doctor_id: form.values.doctor_id,
                patient_id: form.values.patient_id,
                appointment_date: form.values.appointment_date
            };

            axios.post('https://fed-medical-clinic-api.vercel.app/appointments', appointmentData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                navigate('/appointments');  // Redirect to appointments list after successful creation
            })
            .catch((err) => {
                console.error(err);
            });
        };

        const doctorOptions = doctors.map((doctor) => ({
            value: doctor.id,
            label: `${doctor.first_name} ${doctor.last_name}`,
        }));

        const patientOptions = patients.map((patient) => ({
            value: patient.id,
            label: `${patient.first_name} ${patient.last_name}`,
        }));

        return (
            <div>
                <h1>Create an appointment</h1>
                <form onSubmit={form.onSubmit(handleSubmit)}>

                    <Select
                        label="Select Doctor"
                        name="doctor_id"
                        value={form.values.doctor_id}
                        onChange={(value) => form.setFieldValue('doctor_id', value)}
                        data={doctorOptions}
                        error={form.errors.doctor_id}
                        required
                    />

                    <Select
                        label="Select Patient"
                        name="patient_id"
                        value={form.values.patient_id}
                        onChange={(value) => form.setFieldValue('patient_id', value)}
                        data={patientOptions}
                        error={form.errors.patient_id}
                        required
                    />
                    <TextInput
                        label="Appointment Date"
                        name="appointment_date"
                        type="date"
                        value={form.values.appointment_date}
                        onChange={(e) => form.setFieldValue('appointment_date', e.currentTarget.value)}
                        error={form.errors.appointment_date}
                        required
                    />
                    <Button type="submit">Submit</Button>

                </form>
            </div>
        )
    }

    export default Create;