import React from 'react'
import Navbar from '../../include/compenent/nabarPatient'
import PatientProfile from '../../include/compenent/PatientProfile'
import NavbarPtient from '../../include/compenent/nabarPatient'

function PatientProfil(props) {
    return (
        <>
            <NavbarPtient></NavbarPtient>
            <PatientProfile></PatientProfile>
        </>

    )
}

export default PatientProfil