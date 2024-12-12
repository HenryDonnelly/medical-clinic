import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import {Card, Col,Grid,Text,Button} from '@mantine/core'

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
      <Grid>
      {
          prescriptions && prescriptions.map((prescription) => {
              return (
                  <Col span={4}>
                  <Card style={{marginTop:20}}>
                      <Text weight={500}>
                      {prescription.medication} for {prescription.patient_first_name} {prescription.patient_last_name}
                  </Text>
                  <Text style={{marginTop:20, marginBottom:5}}>
                  <p>Dosage: {prescription.dosage}</p>
            <p>Start Date: {new Date(prescription.start_date).toLocaleDateString()}</p>
            <p>End Date: {new Date(prescription.end_date).toLocaleDateString()}</p>
                  </Text>
                  <Button
                                  variant="outline"
                                  color="blue"
                                  onClick={() => navigate(`/prescription/${prescription.id}`)}
                              >
                                  View
                              </Button>
                      </Card>
                      </Col>
              )
          })
      }
      </Grid>
  </div>
);
};

export default Index;
