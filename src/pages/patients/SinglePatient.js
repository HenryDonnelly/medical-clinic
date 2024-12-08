import { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import dayjs from 'dayjs'; // fix american - european dates

const SinglePatient = (props) => {
    // No longer pulling this directly from localStorage, the context does that for us, and stores it in its state
    const { token } = useAuth();

    const [patient, setPatient] = useState(null)

    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/patients/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res)
                setPatient(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [id, token])

    return patient && (
        <div>
            <Link to={`/patient/${id}/edit`}>
                Edit patient
            </Link>
            <Link to={`/patient/${id}/delete`}>
                Delete patient
            </Link>

            <h1>{patient.first_name}</h1>
            <h2>{patient.last_name}</h2>
            <h3>{patient.email}</h3>
            <p>{patient.phone}</p>
            <p>{dayjs.unix(patient.date_of_birth).format('DD/MM/YYYY')}</p> {/* Formatting the date */}
            <p>{patient.address}</p>

        </div>
    )
}

export default SinglePatient;