import React, { useContext } from 'react'
import Navbar from '../../include/compenent/nabarPatient'
import PatientProfile from '../../include/compenent/PatientProfile'
import NavbarPtient from '../../include/compenent/nabarPatient'
import AuthContext from '../../include/context/Authprovider'
import NotAuthorize from '../../include/compenent/notAuthorize'
import DoctorProfile from '../../include/compenent/DoctorProfile'
import NotAuthorizeDoctor from '../../include/compenent/notAuthorizeDoctor'

function MedcineProfile(props) {
    const {user} = useContext(AuthContext)

    return (
        <>
            {user!=null ?
                <>
                    <NavbarPtient></NavbarPtient>
                    <DoctorProfile></DoctorProfile>
                </>
                :
                <NotAuthorizeDoctor>
                </NotAuthorizeDoctor>
            }

        </>

    )
}

export default MedcineProfile