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
            address: '',
            date_of_birth:''
           
        },
        validate: {
            first_name: (value) => value.length > 2 ? null : 'First name must be at least 3 characters',
            last_name: (value) => value.length > 2 ? null : 'Last name must be at least 3 characters',
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email address'),
            phone: (value) => value.length === 10 ? null : 'Phone number must be exactly 10 digits',
            address: (value) => value ? null : 'address is required',
            date_of_birth: (value) => value ? null : 'dob is required'

        },
    });

    const handleSubmit = () => {
        if (form.validate().hasErrors) {
            return;
        }

        axios.post('https://fed-medical-clinic-api.vercel.app/patients', form.values, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            console.log(res.data);
            navigate('/patients')})
        .catch((err) => {
            console.error(err);
        });
    };


    return (
        <div>
            <h1>Create a Patient</h1>
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
                <TextInput
                    label="address"
                    name="address"
                    value={form.values.address}
                    onChange={(e) => form.setFieldValue('address', e.currentTarget.value)}
                    error={form.errors.address}
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
                
                <Button type="submit" >Submit</Button>
            </form>
        </div>
    );
};

export default Create;
