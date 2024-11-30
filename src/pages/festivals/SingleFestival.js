import { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../utils/useAuth";
import { useForm } from '@mantine/form';
import { TextInput, Select, Button } from '@mantine/core';

const Edit = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();  // Get the doctor ID from the URL params

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

    const handleSubmit = () => {
        if (form.validate().hasErrors) {
            // Form validation failed
            return;
        }

        // If validation passes, make the API call to update doctor
        axios.patch(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, form.values, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            console.log(res.data);
            navigate('/doctors');  // Redirect to doctors list after successful update
        })
        .catch((err) => {
            console.error(err);
            // You can display an error message here if needed
        });
    };

    const specialisations = [
        { value: 'Podiatrist', label: 'Podiatrist' },
        { value: 'Dermatologist', label: 'Dermatologist' },
        { value: 'Psychiatrist', label: 'Psychiatrist' },
        { value: 'Pediatrition', label: 'Pediatrition' },
        { value: 'General Practitioner', label: 'General Practitioner' }
    ];

    return (
        <div>
            <h1>Edit Doctor</h1>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="First Name"
                    name="first_name"
                    value={form.values.first_name}  // Ensures value is tied to form state
                    onChange={(e) => form.setFieldValue('first_name', e.currentTarget.value)}  // Update form state on change
                    error={form.errors.first_name}
                    required
                />
                <TextInput
                    label="Last Name"
                    name="last_name"
                    value={form.values.last_name}  // Ensures value is tied to form state
                    onChange={(e) => form.setFieldValue('last_name', e.currentTarget.value)}  // Update form state on change
                    error={form.errors.last_name}
                    required
                />
                <TextInput
                    label="Email"
                    name="email"
                    value={form.values.email}  // Ensures value is tied to form state
                    onChange={(e) => form.setFieldValue('email', e.currentTarget.value)}  // Update form state on change
                    error={form.errors.email}
                    required
                />
                <TextInput
                    label="Phone"
                    name="phone"
                    value={form.values.phone}  // Ensures value is tied to form state
                    onChange={(e) => form.setFieldValue('phone', e.currentTarget.value)}  // Update form state on change
                    error={form.errors.phone}
                    required
                />
                <Select
                    label="Specialisation"
                    name="specialisation"
                    value={form.values.specialisation}  // Ensures value is tied to form state
                    onChange={(value) => form.setFieldValue('specialisation', value)}  // Update form state on change
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
