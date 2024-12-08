import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from "../../utils/useAuth";
import { Link } from "react-router-dom";

const SingleDiagnoses = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const [diagnosis, setDiagnosis] = useState(null);
    const [error, setError] = useState(null);

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

    return (
        <div>
            <Link to={`/diagnoses/${id}/edit`}>
                Edit diagnoses
            </Link>
            <Link to={`/diagnoses/${id}/delete`}>
                Delete diagnoses
            </Link>
            {diagnosis ? (
                <>
                    <h1>Diagnosis Details</h1>
                    <p>Patient ID: {diagnosis.patient_id}</p>
                    <p>Condition: {diagnosis.condition}</p>
                    <p>Diagnosis Date: {new Date(diagnosis.diagnosis_date).toLocaleDateString()}</p>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default SingleDiagnoses;
