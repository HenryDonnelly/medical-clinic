import { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../utils/useAuth";

const DeleteAppointment = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = () => {
        setLoading(true);
        axios.delete(`https://fed-medical-clinic-api.vercel.app/appointments/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            console.log("Appointment deleted successfully");
            navigate('/appointments'); 
        })  
        .catch((err) => {
            console.error(err);
            setError("Failed to delete appointment");
            setLoading(false);
        });
    };

    return (
        <div>
            <h1>Are you sure you want to delete this appointment?</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}  
            <div>
                <button onClick={handleDelete} disabled={loading}>
                    {loading ? "Deleting..." : "Yes, delete appointment"}
                </button>
                <button onClick={() => navigate('/apppointments')}>Cancel</button>  {/* Redirect to appointment list without deleting */}
            </div>
        </div>
    );
};

export default DeleteAppointment;
