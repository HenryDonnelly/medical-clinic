import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../utils/useAuth";
import { useForm } from '@mantine/form';
import { TextInput, Select, Button } from '@mantine/core';

const Create = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [diagnoses, setDiagnoses] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const patientsResponse = await axios.get('https://fed-medical-clinic-api.vercel.app/patients', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPatients(patientsResponse.data);

                const doctorsResponse = await axios.get('https://fed-medical-clinic-api.vercel.app/doctors', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDoctors(doctorsResponse.data);

                const diagnosesResponse = await axios.get('https://fed-medical-clinic-api.vercel.app/diagnoses', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDiagnoses(diagnosesResponse.data);

                const prescriptionsResponse = await axios.get('https://fed-medical-clinic-api.vercel.app/prescriptions', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPrescriptions(prescriptionsResponse.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [token]);

    const form = useForm({
        initialValues: {
            patient_id: '',
            doctor_id: '',
            diagnosis_id: '',
            medication: '',
            dosage: '',
            start_date: '',
            end_date: '',
        },
        validate: {
            patient_id: (value) => value ? null : 'patient is required',
            doctor_id: (value) => value ? null : 'doctor is required',
            diagnosis_id: (value) => value ? null : 'diagnosis is required',
            medication: (value) => value ? null : 'medication is required',
            dosage: (value) => value ? null : 'eosage is required',
            start_date: (value) => value ? null : 'start date is required',
            end_date: (value) => value ? null : 'end date is required',
        },
    });

    const handleSubmit = async (values) => {
        try {
            await axios.post('https://fed-medical-clinic-api.vercel.app/prescriptions', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/prescriptions');
        } catch (err) {
            console.error(err);
        }
    };

    const patientOptions = patients.map(patient => ({
        value: patient.id,
        label: `${patient.first_name} ${patient.last_name}`,
    }));

    const doctorOptions = doctors.map(doctor => ({
        value: doctor.id,
        label: `${doctor.first_name} ${doctor.last_name}`,
    }));

    const diagnosisOptions = diagnoses.map(diagnosis => ({
        value: diagnosis.id,
        label: diagnosis.condition,
    }));

    const medicationOptions = Array.from(
        new Set(prescriptions.map(prescription => prescription.medication))
    ).map(medication => ({
        value: medication,
        label: medication,
    }));

    return (
        <div>
            <h1>Create Prescription</h1>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Select
                    label="Select Patient"
                    name="patient_id"
                    value={form.values.patient_id}
                    onChange={(value) => form.setFieldValue('patient_id', value)}
                    data={patientOptions}
                    error={form.errors.patient_id}
                    required
                />
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
                    label="Select Diagnosis"
                    name="diagnosis_id"
                    value={form.values.diagnosis_id}
                    onChange={(value) => form.setFieldValue('diagnosis_id', value)}
                    data={diagnosisOptions}
                    error={form.errors.diagnosis_id}
                    required
                />
                <Select
                    label="Select Medication"
                    name="medication"
                    value={form.values.medication}
                    onChange={(value) => form.setFieldValue('medication', value)}
                    data={medicationOptions}
                    error={form.errors.medication}
                    required
                />
                <TextInput
                    label="Dosage"
                    name="dosage"
                    value={form.values.dosage}
                    onChange={(e) => form.setFieldValue('dosage', e.currentTarget.value)}
                    error={form.errors.dosage}
                    required
                />
                <TextInput
                    label="Start Date"
                    name="start_date"
                    type="date"
                    value={form.values.start_date}
                    onChange={(e) => form.setFieldValue('start_date', e.currentTarget.value)}
                    error={form.errors.start_date}
                    required
                />
                <TextInput
                    label="End Date"
                    name="end_date"
                    type="date"
                    value={form.values.end_date}
                    onChange={(e) => form.setFieldValue('end_date', e.currentTarget.value)}
                    error={form.errors.end_date}
                    required
                />
                <Button type="submit">Create Prescription</Button>
            </form>
        </div>
    );
};

export default Create;
