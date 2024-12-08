import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

const Index = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(
          "https://fed-medical-clinic-api.vercel.app/prescriptions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPrescriptions(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrescriptions();
  }, [token]);

  if (!prescriptions.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Prescriptions List</h1>
      <div>
        {prescriptions.map((prescription) => (
          <div key={prescription.id}>
            <h2>
              {prescription.medication} for{" "}
              {prescription.patient_first_name} {prescription.patient_last_name}
            </h2>
            <p>Dosage: {prescription.dosage}</p>
            <p>Start Date: {new Date(prescription.start_date).toLocaleDateString()}</p>
            <p>End Date: {new Date(prescription.end_date).toLocaleDateString()}</p>
            <div>
              <button onClick={() => navigate(`/prescription/${prescription.id}`)}>
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
