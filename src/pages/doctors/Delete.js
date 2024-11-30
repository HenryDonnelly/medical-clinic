import { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../utils/useAuth";

const DeleteDoctor = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = () => {
        setLoading(true);
        axios.delete(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            console.log("Doctor deleted successfully");
            navigate('/doctors'); 
        })
        .catch((err) => {
            console.error(err);
            setError("Failed to delete doctor");
            setLoading(false);
        });
    };

    return (
        <div>
            <h1>Are you sure you want to delete this doctor?</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}  
            <div>
                <button onClick={handleDelete} disabled={loading}>
                    {loading ? "Deleting..." : "Yes, delete doctor"}
                </button>
                <button onClick={() => navigate('/doctors')}>Cancel</button>  {/* Redirect to doctors list without deleting */}
            </div>
        </div>
    );
};

export default DeleteDoctor;
