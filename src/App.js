import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProtectedRoute from './components/ProtectedRoute';
import Edit from './pages/doctors/Edit';
import Delete from './pages/doctors/Delete';
import SingleDoctor from './pages/doctors/SingleDoctor';
import Create from './pages/doctors/Create';
import DoctorIndex from './pages/doctors/Index';

import PatientIndex from './pages/patients/Index';
import PatientCreate from './pages/patients/Create';
import SinglePatient from './pages/patients/SinglePatient';
import PatientEdit from './pages/patients/Edit';
import PatientDelete from './pages/patients/Delete';

import AppointmentIndex from './pages/appointments/Index';
import AppointmentCreate from './pages/appointments/Create';
import SingleAppointment from './pages/appointments/SingleAppointment';
import AppointmentEdit from './pages/appointments/Edit';
import AppointmentDelete from './pages/appointments/Delete';

import DiagnosesIndex from './pages/diagnoses/Index';
import DiagnosesCreate from './pages/diagnoses/Create';
import SingleDiagnoses from './pages/diagnoses/SingleDiagnoses';
import DiagnosesEdit from './pages/diagnoses/Edit';
import DiagnosesDelete from './pages/diagnoses/Delete';

import PrescriptionIndex from './pages/prescriptions/Index';
import PrescriptionCreate from './pages/prescriptions/Create';
import SinglePrescription from './pages/prescriptions/SinglePrescription';
import PrescriptionEdit from './pages/prescriptions/Edit';
import PrescriptionDelete from './pages/prescriptions/Delete';

import { AuthProvider } from "./utils/useAuth";
import { createContext } from "react";
import './index.css';
import { AppShell, MantineProvider, Header } from "@mantine/core";
import { Notifications } from '@mantine/notifications';



export const UserContext = createContext();



const App = () => {
    // We wrap the entire app in the auth provider
    // We no longer need to pass the auth state down from here, all our routes can get it from the context instead
    return (
        <div>
            <AuthProvider>
                <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
                <Notifications />
                    <Router>
                    {/* passing toggle as prop to navbar */}
                
                <UserContext.Provider value={{ username: 'Joe Bloggs', email: 'joe.bloggs@email.com' }}>

                    <AppShell
                    padding="0px"
                    navbar={<Navbar/>}
                    >
                        <Routes>
                            <Route path="/" element={<Home />} />


                            
                            <Route path="/doctors" element={<DoctorIndex />} />
                            <Route path="/patients" element={<PatientIndex />} />
                            <Route path="/appointments" element={<AppointmentIndex />} />
                            <Route path="/diagnoses" element={<DiagnosesIndex />} />
                            <Route path="/prescriptions" element={<PrescriptionIndex />} />



                            <Route path='/' element={<ProtectedRoute />}>
                                <Route path="/" element={<Home />} />
                                <Route path="/doctor/:id" element={<SingleDoctor />} />
                                
                                {/*add feedback for creating doctor*/}
                                <Route path="/doctor/create" element={<Create />} />


                                {/*help with patching old data*/}
                                <Route path='/doctor/:id/edit' element={<Edit />} />

                                <Route path='/doctor/:id/delete' element={<Delete />} />


                                <Route path="/doctor/:id" element={<SingleDoctor />} />

                                <Route path="/patient/create" element={<PatientCreate />} />
                                <Route path="/patient/:id" element={<SinglePatient />} />
                                <Route path='/patient/:id/edit' element={<PatientEdit />} />
                                <Route path='/patient/:id/delete' element={<PatientDelete />} />

                                <Route path="/appointment/create" element={<AppointmentCreate />} />
                                <Route path="/appointment/:id" element={<SingleAppointment />} />
                                <Route path='/appointment/:id/edit' element={<AppointmentEdit />} />
                                <Route path='/appointment/:id/delete' element={<AppointmentDelete />} />

                                <Route path="/diagnoses/create" element={<DiagnosesCreate />} />
                                <Route path="/diagnoses/:id" element={<SingleDiagnoses />} />
                                <Route path='/diagnoses/:id/edit' element={<DiagnosesEdit />} />
                                <Route path='/diagnoses/:id/delete' element={<DiagnosesDelete />} />

                                <Route path="/prescription/create" element={<PrescriptionCreate />} />
                                <Route path="/prescription/:id" element={<SinglePrescription />} />
                                <Route path='/prescription/:id/edit' element={<PrescriptionEdit />} />
                                <Route path='/prescription/:id/delete' element={<PrescriptionDelete />} />





                            </Route>
                            <Route path='/login' element={<LoginForm />} />
                            <Route path='/register' element={<RegisterForm />} />
                        </Routes>
                        </AppShell>
                </UserContext.Provider>
                </Router>
                </MantineProvider>
            </AuthProvider>
        </div>
    );
};

export default App;