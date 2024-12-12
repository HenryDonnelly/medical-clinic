import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from "../../utils/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {Button} from '@mantine/core'



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
                setDiagnosis(response.data);
            } catch (err) {
                setError("Failed to fetch diagnosis details");
            }
        };

        fetchDiagnosis();
    }, [id, token]);

    if (error) return <div>{error}</div>;


    return diagnosis && (
        <div style={{display: 'flex',flexDirection: 'column', alignItems:'center', height: '100vh', justifyContent:'center'}}>
            <>
                    <h1>Diagnosis Details</h1>
                    <p>Patient ID: {diagnosis.patient_id}</p>
                    <p>Condition: {diagnosis.condition}</p>
                    <p>Diagnosis Date: {new Date(diagnosis.diagnosis_date).toLocaleDateString()}</p>
                </>

            <div>

            <Button
                variant="outline"
                color="blue"
                onClick={() => navigate(`/diagnosis/${diagnosis.id}/edit`)}
                >
                Edit
            </Button>
            <Button
                variant="outline"
                color="blue"
                onClick={() => navigate(`/diagnosis/${diagnosis.id}/delete`)}
                >
                Delete
            </Button>

            </div>

        </div>
    )
};

export default SingleDiagnoses;
