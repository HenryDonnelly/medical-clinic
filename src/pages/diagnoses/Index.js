import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../utils/useAuth';
import { useNavigate } from "react-router-dom";

const DiagnosesIndex = () => {
    const [diagnoses, setDiagnoses] = useState([]);
    const navigate = useNavigate();
    const { token } = useAuth();

    const getDiagnoses = async () => {
        try {
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/diagnoses`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDiagnoses(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getDiagnoses();
        };

        fetchData();
    }, []);

    if (!diagnoses.length) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div>
                {
                    diagnoses.map((diagnosis) => {
                        return (
                            <div key={diagnosis.id}>
                                <div>
                                    <h2>Condition: {diagnosis.condition}</h2>
                                    <p>Patient ID: {diagnosis.patient_id}</p>
                                    <p>Diagnosis Date: {new Date(diagnosis.diagnosis_date).toLocaleDateString()}</p>
                                    <div>
                                        <button onClick={() => navigate(`/diagnoses/${diagnosis.id}`)}>
                                            View
                                        </button>
                                        
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default DiagnosesIndex;
