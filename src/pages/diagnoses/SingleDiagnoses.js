import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from "../../utils/useAuth";
import { Button } from '@mantine/core';

const SingleDiagnoses = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const [diagnosis, setDiagnosis] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDiagnosis = async () => {
            try {
                const response = await axios.get(`https://fed-medical-clinic-api.vercel.app/diagnoses/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Log the response to inspect the data structure
                console.log(response.data);
                setDiagnosis(response.data);
            } catch (err) {
                console.error("Error fetching diagnosis data:", err);
                setError("Failed to fetch diagnosis details");
            }
        };

        fetchDiagnosis();
    }, [id, token]);

    if (error) return <div>{error}</div>;

    if (!diagnosis) return <div>Loading...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
            
                <h1>Diagnosis Details</h1>
                {/* Make sure patient_id matches the actual response field */}
                <p>Patient ID: {diagnosis.patient_id || diagnosis.patient?.id}</p> 
                <p>Condition: {diagnosis.condition}</p>
                <p>Diagnosis Date: {new Date(diagnosis.diagnosis_date).toLocaleDateString()}</p>

            <div>
                <Button
                    variant="outline"
                    color="blue"
                    onClick={() => navigate(`/diagnoses/${diagnosis.id}/edit`)}
                >
                    Edit
                </Button>
                <Button
                    variant="outline"
                    color="blue"
                    onClick={() => navigate(`/diagnoses/${diagnosis.id}/delete`)}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default SingleDiagnoses;
