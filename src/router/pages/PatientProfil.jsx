import React, { useContext } from 'react'
import Navbar from '../../include/compenent/nabarPatient'
import PatientProfile from '../../include/compenent/PatientProfile'
import NavbarPtient from '../../include/compenent/nabarPatient'
import AuthContext from '../../include/context/Authprovider'
import NotAuthorize from '../../include/compenent/notAuthorize'

function PatientProfil(props) {
    const {user} = useContext(AuthContext)

    return (
        <>
            {user!=null ?
                <>
                    <NavbarPtient></NavbarPtient>
                    <PatientProfile></PatientProfile>
                </>
                :
                <NotAuthorize>
                </NotAuthorize>
            }

        </>

    )
}

export default PatientProfil