import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Layout from './pages/layout'
import Home from './pages/home'
import Navbar from '../include/compenent/nabar'
import Patientlogin from './pages/Patientlogin'
import Patientsignup from './pages/Patientsignup'
import PatientSignup from './pages/Patientsignup'
import PatientProfil from './pages/PatientProfil'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Medcinelogin from './pages/Medcinelogin'
import MedcineProfile from './pages/Medcineprofile'
import Administration from './pages/Administration'
import Adminlogin from './pages/Adminlogin'
export default  function Sih() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/chu/*" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="patient-login" element={<Patientlogin />} />
                    <Route path="patient-logup" element={<PatientSignup />} />
                    <Route path="PatientProfil" element={<PatientProfil />} />
                    <Route path="medcine-login" element={<Medcinelogin />} />
                    <Route path="Medcineprofile" element={<MedcineProfile />} />
                    <Route path="admin-login" element={<Adminlogin />} />
                    <Route path="Administration" element={<Administration />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

