import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../utils/useAuth";
import { useForm } from '@mantine/form';
import { TextInput, Button } from '@mantine/core';
import dayjs from 'dayjs'; // Imported dayjs for date formatting

const Edit = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize form with empty values (initially)
    const form = useForm({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            date_of_birth: '',  // date will be handled as string in format 'YYYY-MM-DD'
        },
        validate: {
            first_name: (value) => value.length > 2 ? null : 'First name must be at least 3 characters',
            last_name: (value) => value.length > 2 ? null : 'Last name must be at least 3 characters',
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email address'),
            phone: (value) => value.length === 10 ? null : 'Phone number must be exactly 10 digits',
            address: (value) => value ? null : 'Address is required',
            date_of_birth: (value) => value ? null : 'Date of birth is required',
        },
    });

    // Fetch the patient data after the component loads, preventing form update bug
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/patients/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // sets the update form from empty to current patient data
                form.setValues(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load patient data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, token]);

    // Handle form submission
    const handleSubmit = () => {
        if (form.validate().hasErrors) {
            return;
        }

        // Prepare data to send in PATCH request
        const updatedPatientData = {
            first_name: form.values.first_name,
            last_name: form.values.last_name,
            email: form.values.email,
            phone: form.values.phone,
            address: form.values.address,
            date_of_birth: form.values.date_of_birth, // This is already in 'YYYY-MM-DD' format
        };

        axios.patch(`https://fed-medical-clinic-api.vercel.app/patients/${id}`, updatedPatientData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            console.log(res.data);
            navigate('/patients');
        })
        .catch((err) => {
            console.error(err);
            setError("Failed to update patient data");
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Edit Patient</h1>
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
                    label="Address"
                    name="address"
                    value={form.values.address}
                    onChange={(e) => form.setFieldValue('address', e.currentTarget.value)}
                    error={form.errors.address}
                    required
                />
                <TextInput
                    label="Date of Birth"
                    name="date_of_birth"
                    type="date"
                    value={form.values.date_of_birth} // Date is in 'YYYY-MM-DD' format
                    onChange={(e) => form.setFieldValue('date_of_birth', e.currentTarget.value)} // Keep it in 'YYYY-MM-DD' format
                    error={form.errors.date_of_birth}
                    required
                />
                
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default Edit;
