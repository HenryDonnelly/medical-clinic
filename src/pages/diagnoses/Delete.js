import { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../utils/useAuth";

const Delete = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`https://fed-medical-clinic-api.vercel.app/diagnoses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Diagnosis deleted successfully");
            navigate('/diagnoses');
        } catch (err) {
            setError("Failed to delete diagnosis");
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Are you sure you want to delete this diagnosis?</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <button onClick={handleDelete} disabled={loading}>
                    {loading ? "Deleting..." : "Yes, delete diagnosis"}
                </button>
                <button onClick={() => navigate('/diagnoses')}>Cancel</button>
            </div>
        </div>
    );
};

export default Delete;
