import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { Link } from "react-router-dom";

const SinglePrescription = () => {
  const { token } = useAuth();
  const { id } = useParams();
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

  if (!prescription) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Link to={`/prescription/${id}/edit`}>
                Edit prescription
            </Link>
            <Link to={`/prescription/${id}/delete`}>
                Delete prescription
            </Link>
      <h1>Prescription Details</h1>
      <p>Medication: {prescription.medication}</p>
      <p>Patient: {prescription.patient_first_name} {prescription.patient_last_name}</p>
      <p>Dosage: {prescription.dosage}</p>
      <p>Start Date: {new Date(prescription.start_date).toLocaleDateString()}</p>
      <p>End Date: {new Date(prescription.end_date).toLocaleDateString()}</p>
    </div>
  );
};

export default SinglePrescription;
