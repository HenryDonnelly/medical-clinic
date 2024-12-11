import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/useAuth';
import { TextInput, Select, Button, Card, Text, Badge, Group, Grid, Col } from '@mantine/core'; 
import { useNavigate } from "react-router-dom";



const Index = () => {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate(); // Define navigate with useNavigate hook
    const {token} = useAuth();

    const getDoctors = async () => {
        try {
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/`);
            setDoctors(res.data);
        } catch (e) {
            console.error(e);
        }
    };


    useEffect(() => {
        // We can't make useEffect itself async, so we call an async function from inside it
        const fetchData = async () => {
            await getDoctors();
        }

        fetchData();
    }, []);


    if (!doctors.length) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Grid>
            {
                doctors && doctors.map((doctor) => {
                    return (
                        <Col span={4}>
                        <Card style={{marginTop:20}}>
                            <Text weight={500}>
                        Dr {doctor.first_name} {doctor.last_name}
                        </Text>
                        <Text style={{marginTop:20, marginBottom:5}}>
                        Specialisation: {doctor.specialisation}
                        </Text>
                        <Button
                                        variant="outline"
                                        color="blue"
                                        onClick={() => navigate(`/doctor/${doctor.id}`)}
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