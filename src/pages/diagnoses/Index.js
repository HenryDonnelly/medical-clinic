import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../utils/useAuth';
import { useNavigate } from "react-router-dom";
import { TextInput, Select, Button, Card, Text, Badge, Group, Grid, Col } from '@mantine/core'; 


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


    return (
        <div>
            <div>
            <Grid>
                {
                    diagnoses.map((diagnosis) => {
                        return (
                            <Col span={4}>
                            <Card style={{marginTop:20}}>
                                <Text weight={500}>
                                <h2>Condition: {diagnosis.condition}</h2>
                                    <p>Patient ID: {diagnosis.patient_id}</p>
                                    <p>Diagnosis Date: {new Date(diagnosis.diagnosis_date).toLocaleDateString()}</p>
                            </Text>
                            <Text style={{marginTop:20, marginBottom:5}}>
                            </Text>
                            <Button
                                            variant="outline"
                                            color="blue"
                                            onClick={() => navigate(`/diagnoses/${diagnosis.id}`)}
                                        >
                                            View
                                        </Button>
                                </Card>
                                </Col>
                        );
                    })
                }
                </Grid>
            </div>
            
        </div>
    );

};

export default DiagnosesIndex;
