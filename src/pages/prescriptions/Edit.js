import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { useForm } from '@mantine/form';
import { TextInput, Select, Button } from '@mantine/core';

const Edit = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [prescription, setPrescription] = useState(null);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [diagnoses, setDiagnoses] = useState([]);
    const [medications, setMedications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const prescriptionResponse = await axios.get(
                    `https://fed-medical-clinic-api.vercel.app/prescriptions/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setPrescription(prescriptionResponse.data);

                const patientsResponse = await axios.get(
                    "https://fed-medical-clinic-api.vercel.app/patients",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setPatients(patientsResponse.data);

                const doctorsResponse = await axios.get(
                    "https://fed-medical-clinic-api.vercel.app/doctors",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setDoctors(doctorsResponse.data);

                const diagnosesResponse = await axios.get(
                    "https://fed-medical-clinic-api.vercel.app/diagnoses",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setDiagnoses(diagnosesResponse.data);

                // Extract medications from prescriptions (optional if medications are tied to prescriptions)
                const medicationsResponse = await axios.get(
                    "https://fed-medical-clinic-api.vercel.app/prescriptions",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setMedications(
                    [...new Set(medicationsResponse.data.map(item => item.medication))] // Ensuring unique medications
                );
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [id, token]);

    // Initialize the form with the prescription data (if available)
    const form = useForm({
        initialValues: {
            patient_id: prescription ? prescription.patient_id : '',
            doctor_id: prescription ? prescription.doctor_id : '',
            diagnosis_id: prescription ? prescription.diagnosis_id : '',
            medication: prescription ? prescription.medication : '',
            dosage: prescription ? prescription.dosage : '',
            start_date: prescription ? prescription.start_date : '',
            end_date: prescription ? prescription.end_date : '',
        },
        validate: {
            patient_id: (value) => value ? null : 'Patient is required',
            doctor_id: (value) => value ? null : 'Doctor is required',
            diagnosis_id: (value) => value ? null : 'Diagnosis is required',
            medication: (value) => value ? null : 'Medication is required',
            dosage: (value) => value ? null : 'Dosage is required',
            start_date: (value) => value ? null : 'Start date is required',
            end_date: (value) => value ? null : 'End date is required',
        },
    });

    const handleSubmit = async (values) => {
        try {
            await axios.put(
                `https://fed-medical-clinic-api.vercel.app/prescriptions/${id}`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate('/prescriptions');
        } catch (err) {
            console.error(err);
        }
    };

    if (!prescription) {
        return <div>Loading...</div>;
    }

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

    const medicationOptions = medications.map((medication) => ({
        value: medication,
        label: medication,
    }));

    return (
        <div>
            <h1>Update Prescription</h1>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Select
                    label="Select Patient"
                    name="patient_id"
                    value={form.values.patient_id}
                    onChange={(value) => form.setFieldValue('patient_id', value)}
                    data={patientOptions}
                    required
                />
                <Select
                    label="Select Doctor"
                    name="doctor_id"
                    value={form.values.doctor_id}
                    onChange={(value) => form.setFieldValue('doctor_id', value)}
                    data={doctorOptions}
                    required
                />
                <Select
                    label="Select Diagnosis"
                    name="diagnosis_id"
                    value={form.values.diagnosis_id}
                    onChange={(value) => form.setFieldValue('diagnosis_id', value)}
                    data={diagnosisOptions}
                    required
                />
                <Select
                    label="Select Medication"
                    name="medication"
                    value={form.values.medication}
                    onChange={(value) => form.setFieldValue('medication', value)}
                    data={medicationOptions}
                    required
                />
                <TextInput
                    label="Dosage"
                    name="dosage"
                    value={form.values.dosage}
                    onChange={(e) => form.setFieldValue('dosage', e.currentTarget.value)}
                    required
                />
                <TextInput
                    label="Start Date"
                    name="start_date"
                    type="date"
                    value={form.values.start_date}
                    onChange={(e) => form.setFieldValue('start_date', e.currentTarget.value)}
                    required
                />
                <TextInput
                    label="End Date"
                    name="end_date"
                    type="date"
                    value={form.values.end_date}
                    onChange={(e) => form.setFieldValue('end_date', e.currentTarget.value)}
                    required
                />
                <Button type="submit">Update Prescription</Button>
            </form>
        </div>
    );
};

export default Edit;