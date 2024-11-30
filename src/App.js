import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FestivalsIndex from './pages/festivals/Index';
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProtectedRoute from './components/ProtectedRoute'
import Edit from './pages/doctors/Edit'
import Delete from './pages/doctors/Delete'
import SingleDoctor from './pages/doctors/SingleDoctor'
import Create from './pages/doctors/Create'
import DoctorIndex from './pages/doctors/Index'
import { AuthProvider } from "./utils/useAuth";
import { createContext } from "react";
import './index.css';
import { AppShell, MantineProvider, Header } from "@mantine/core";


export const UserContext = createContext();

export const Container = ({ children }) => {
    <div style={{ width: '1200px', margin: 'auto' }}>
        {children}
    </div>
}

const App = () => {
    // We wrap the entire app in the auth provider
    // We no longer need to pass the auth state down from here, all our routes can get it from the context instead
    return (
        <div>
            <AuthProvider>
                <MantineProvider withGlobalStyles withNormalizeCSS>
                <UserContext.Provider value={{
                    username: 'Joe Bloggs',
                    email: 'joe.bloggs@email.com'
                }}>
                    <Router>
                    <AppShell
      padding="md"
      navbar={<Navbar/>}
      header={<Header height={60} p="xs">Clinic Manager</Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />

                            {/* Festival routes */}
                            <Route path="/festivals" element={<FestivalsIndex />} />
                            
                            <Route path="/doctors" element={<DoctorIndex />} />

                            <Route path='/' element={<ProtectedRoute />}>
                                <Route path="/" element={<Home />} />
                                <Route path="/doctor/:id" element={<SingleDoctor />} />
                                
                                {/*add feedback for creating doctor*/}
                                <Route path="/doctor/create" element={<Create />} />


                                {/*help with patching old data*/}
                                <Route path='/doctor/:id/edit' element={<Edit />} />

                                <Route path='/doctor/:id/delete' element={<Delete />} />


                            </Route>
                            <Route path='/login' element={<LoginForm />} />
                            <Route path='/register' element={<RegisterForm />} />
                        </Routes>
                        </AppShell>
                    </Router>
                </UserContext.Provider>
                </MantineProvider>
            </AuthProvider>
        </div>
    );
};

export default App;