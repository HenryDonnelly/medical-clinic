import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

const Delete = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axios.get(
          `https://fed-medical-clinic-api.vercel.app/prescriptions/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPrescription(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrescription();
  }, [id, token]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://fed-medical-clinic-api.vercel.app/prescriptions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/prescriptions");
    } catch (err) {
      console.error(err);
    }
  };

  if (!prescription) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Delete Prescription</h1>
      <p>Are you sure you want to delete this prescription?</p>
      <p>Medication: {prescription.medication}</p>
      <p>Patient: {prescription.patient_first_name} {prescription.patient_last_name}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate("/prescriptions")}>Cancel</button>
    </div>
  );
};

export default Delete;
