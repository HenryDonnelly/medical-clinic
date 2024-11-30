import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../utils/useAuth";
import { useForm } from '@mantine/form';
import { TextInput, Select, Button } from '@mantine/core'; 

const Create = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

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
            specialisation: (value) => value ? null : 'Specialisation is required'
        },
    });

    const handleSubmit = () => {
        if (form.validate().hasErrors) {
            return;
        }

        axios.post('https://fed-medical-clinic-api.vercel.app/doctors', form.values, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            console.log(res.data);
            navigate('/doctors')})
        .catch((err) => {
            console.error(err);
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
            <h1>Create a Doctor</h1>
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
                
                <Button type="submit" >Submit</Button>
            </form>
        </div>
    );
};

export default Create;
