    import { useEffect, useState } from "react"
    import axios from 'axios'
    import { useNavigate } from 'react-router-dom';
    import { useParams } from "react-router-dom";
    import { useAuth } from "../../utils/useAuth";
    import { useForm } from '@mantine/form';
    import { TextInput, Select, Button } from '@mantine/core'; 


    const Edit = () => {
        const [doctors, setDoctors] = useState([]);
        const [patients, setPatients] = useState([]);
        const [appointment, setAppointment] = useState(null); // Store the appointment details
        const [appointmentDate, setAppointmentDate] = useState('');
        const [selectedDoctor, setSelectedDoctor] = useState('');
        const [selectedPatient, setSelectedPatient] = useState('');
        const navigate = useNavigate();
        const { token } = useAuth();
        const { id } = useParams();

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


        useEffect(() => {
            const fetchDetails = async () => {
                try {
                    const doctorResponse = await axios.get('https://fed-medical-clinic-api.vercel.app/doctors', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setDoctors(doctorResponse.data);

                    const patientResponse = await axios.get('https://fed-medical-clinic-api.vercel.app/patients', {
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

                    // Ensuring form values are set only once when appointment data is fetched
                    form.setValues({
                        doctor_id: appointmentResponse.data.doctor_id,
                        patient_id: appointmentResponse.data.patient_id,
                        appointment_date: new Date(appointmentResponse.data.appointment_date).toISOString().slice(0, 10),
                    });
                } catch (err) {
                    console.error(err);
                }
            };

            fetchDetails();
        }, [id, token, form]);  // Avoid re-triggering too many times


        const handleSubmit = async (values) => {
            try {
                const updatedAppointment = {
                    appointment_date: values.appointment_date,
                    doctor_id: values.doctor_id,
                    patient_id: values.patient_id,
                };

                await axios.put(`https://fed-medical-clinic-api.vercel.app/appointments/${id}`, updatedAppointment, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                navigate('/appointments');
            } catch (err) {
                console.error(err);
            }
        };
        
        if (!appointment) return 'Loading...';

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
            <h1>Edit an appointment</h1>
            <form onSubmit={form.onSubmit(handleSubmit)}>

                <Select
                    label="Select Doctor"
                    name="doctor_id"
                    value={form.values.doctor_id}
                    onChange={(value) => form.setFieldValue('doctor_id',value)}
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
                    onChange={(value) => form.setFieldValue('appointment_date', value)}
                    error={form.errors.appointment_date}
                    required
                />
                <Button type="submit">Submit</Button>

            </form>
        </div>
    )
    }

    export default Edit;