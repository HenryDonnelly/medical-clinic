import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../utils/useAuth";
import { useForm } from '@mantine/form';
import { TextInput, Select, Button } from '@mantine/core';

const Edit = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    {/*Initialize form with empty values (initially)*/}
    const form = useForm({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            specialisation: '',
        },
        validate: {
            first_name: (value) => value.length > 2 ? null : 'First name must be at least 3 characters',
            last_name: (value) => value.length > 2 ? null : 'Last name must be at least 3 characters',
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email address'),
            phone: (value) => value.length === 10 ? null : 'Phone number must be exactly 10 digits',
            specialisation: (value) => value ? null : 'Specialisation is required',
        },
    });

    {/*Fetch the doctor data when the component loads*/}
    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            {/*Populate the form with the fetched doctor data*/}
            form.setValues(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setError("Failed to load doctor data");
            setLoading(false);
        });
    }, [id, token, form]);

    const handleSubmit = () => {
        if (form.validate().hasErrors) {
            return;
        }

        {/*Prepare data to send in PATCH request*/}
        const updatedDoctorData = {
            first_name: form.values.first_name,
            last_name: form.values.last_name,
            email: form.values.email,
            phone: form.values.phone,
            specialisation: form.values.specialisation,
        };

        axios.patch(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, updatedDoctorData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            console.log(res.data);
            navigate('/doctors');
        })
        .catch((err) => {
            console.error(err);
            setError("Failed to update doctor data");
        });
    };

    const specialisations = [
        { value: 'Podiatrist', label: 'Podiatrist' },
        { value: 'Dermatologist', label: 'Dermatologist' },
        { value: 'Psychiatrist', label: 'Psychiatrist' },
        { value: 'Pediatrition', label: 'Pediatrition' },
        { value: 'General Practitioner', label: 'General Practitioner' }
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Edit Doctor</h1>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="First Name"
                    name="first_name"
                    value={form.values.first_name}
                    onChange={(e) => form.setFieldValue('first_name', e.currentTarget.value)}
                    error={form.errors.first_name}
                    required
                />
                <TextInput
                    label="Last Name"
                    name="last_name"
                    value={form.values.last_name}
                    onChange={(e) => form.setFieldValue('last_name', e.currentTarget.value)}
                    error={form.errors.last_name}
                    required
                />
                <TextInput
                    label="Email"
                    name="email"
                    value={form.values.email}
                    onChange={(e) => form.setFieldValue('email', e.currentTarget.value)}
                    error={form.errors.email}
                    required
                />
                <TextInput
                    label="Phone"
                    name="phone"
                    value={form.values.phone}
                    onChange={(e) => form.setFieldValue('phone', e.currentTarget.value)}
                    error={form.errors.phone}
                    required
                />
                <Select
                    label="Specialisation"
                    name="specialisation"
                    value={form.values.specialisation}  
                    onChange={(value) => form.setFieldValue('specialisation', value)}
                    data={specialisations}
                    error={form.errors.specialisation}
                    required
                />
                
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default Edit;
