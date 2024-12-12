import { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import {Button} from '@mantine/core'
import { useNavigate } from 'react-router-dom';



const SingleDoctor = (props) => {
    // No longer pulling this directly from localStorage, the context does that for us, and stores it in its state
    const { token } = useAuth();

    const [doctor, setDoctor] = useState(null)

    const { id } = useParams();

    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res)
                setDoctor(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [id, token])

    return doctor && (
        <div style={{display: 'flex',flexDirection: 'column', alignItems:'center', height: '100vh', justifyContent:'center'}}>
            <h1>{doctor.first_name}</h1>
            <h2>{doctor.last_name}</h2>
            <h3>{doctor.specialisation}</h3>
            <p>{doctor.phone}</p>
            <p>{doctor.email}</p>

            <div>

            <Button
                variant="outline"
                color="blue"
                onClick={() => navigate(`/doctor/${doctor.id}/edit`)}
                >
                Edit
            </Button>
            <Button
                variant="outline"
                color="blue"
                onClick={() => navigate(`/doctor/${doctor.id}/delete`)}
                >
                Delete
            </Button>

            </div>

        </div>
    )
}

export default SingleDoctor;