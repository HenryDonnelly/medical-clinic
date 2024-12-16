import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { Link } from "react-router-dom";
import {Button} from '@mantine/core'
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";


const SinglePrescription = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const navigate = useNavigate();


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


  return prescription && (
    <div style={{display: 'flex',flexDirection: 'column', alignItems:'center', height: '100vh', justifyContent:'center'}}>
              <h1>Prescription Details</h1>
      <p>Medication: {prescription.medication}</p>
      <p>Patient: {prescription.patient_first_name} {prescription.patient_last_name}</p>
      <p>Dosage: {prescription.dosage}</p>
      <p>Start Date: {dayjs.unix(prescription.start_date).format('DD/MM/YYYY')}</p>
      <p>End Date: {dayjs.unix(prescription.end_date).format('DD/MM/YYYY')}</p>
      

        <div>

        <Button
            variant="outline"
            color="blue"
            onClick={() => navigate(`/prescription/${prescription.id}/edit`)}
            >
            Edit
        </Button>
        <Button
            variant="outline"
            color="blue"
            onClick={() => navigate(`/prescription/${prescription.id}/delete`)}
            >
            Delete
        </Button>

        </div>

    </div>
)
};

export default SinglePrescription;
