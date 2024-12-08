import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../utils/useAuth";
import { useForm } from '@mantine/form';
import { TextInput, Select, Button } from '@mantine/core';

const EditDiagnosis = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [patients, setPatients] = useState([]);
    const [diagnosis, setDiagnosis] = useState(null);

    useEffect(() => {
        const fetchDiagnosisAndPatients = async () => {
            try {
                const diagnosisResponse = await axios.get(`https://fed-medical-clinic-api.vercel.app/diagnoses/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDiagnosis(diagnosisResponse.data);

                const patientsResponse = await axios.get('https://fed-medical-clinic-api.vercel.app/patients', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPatients(patientsResponse.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchDiagnosisAndPatients();
    }, [id, token]);

    const form = useForm({
        initialValues: {
            patient_id: '',
            condition: '',
            diagnosis_date: '',
        },
        validate: {
            patient_id: (value) => value ? null : 'Patient is required',
            condition: (value) => value ? null : 'Condition is required',
            diagnosis_date: (value) => value ? null : 'Diagnosis date is required',
        },
    });

    useEffect(() => {
        if (diagnosis) {
            form.setValues({
                patient_id: diagnosis.patient_id,
                condition: diagnosis.condition,
                diagnosis_date: new Date(diagnosis.diagnosis_date).toISOString().slice(0, 10),
            });
        }
    }, [diagnosis, form]);

    const handleSubmit = async (values) => {
        try {
            await axios.put(`https://fed-medical-clinic-api.vercel.app/diagnoses/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/diagnoses');
        } catch (err) {
            console.error(err);
        }
    };

    if (!diagnosis) return <div>Loading...</div>;

    const patientOptions = patients.map(patient => ({
        value: patient.id,
        label: `${patient.first_name} ${patient.last_name}`,
    }));

    return (
        <div>
            <h1>Edit Diagnosis</h1>
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
                <TextInput
                    label="Condition"
                    name="condition"
                    value={form.values.condition}
                    onChange={(e) => form.setFieldValue('condition', e.currentTarget.value)}
                    error={form.errors.condition}
                    required
                />
                <TextInput
                    label="Diagnosis Date"
                    name="diagnosis_date"
                    type="date"
                    value={form.values.diagnosis_date}
                    onChange={(e) => form.setFieldValue('diagnosis_date', e.currentTarget.value)}
                    error={form.errors.diagnosis_date}
                    required
                />
                <Button type="submit">Update Diagnosis</Button>
            </form>
        </div>
    );
};

export default EditDiagnosis;
