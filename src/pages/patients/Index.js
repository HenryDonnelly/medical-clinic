import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/useAuth';
import { useNavigate } from "react-router-dom";
import { TextInput, Select, Button, Card, Text, Badge, Group, Grid, Col } from '@mantine/core'; 



const Index = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();
    const {token} = useAuth();

    const getPatients= async () => {
        try {
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/patients/`);
            setPatients(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getPatients();
        }

        fetchData();
    }, []);

    if (!patients.length) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <Grid>
            {
                patients && patients.map((patient) => {
                    return (
                        <Col span={4}>
                        <Card style={{marginTop:20}}>
                            <Text weight={500}>
                        Dr {patient.first_name} {patient.last_name}
                        </Text>
                        <Text style={{marginTop:20, marginBottom:5}}>
                        </Text>
                        <Button
                                        variant="outline"
                                        color="blue"
                                        onClick={() => navigate(`/patient/${patient.id}`)}
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