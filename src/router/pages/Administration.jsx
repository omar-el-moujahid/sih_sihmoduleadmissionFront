import React, { useContext, useState } from 'react'
import AuthContext from '../../include/context/Authprovider'
import NotAuthorizeAdmin from '../../include/compenent/Admin/NotAuthorizeAdmin'
import ProfileAdmin from '../../include/compenent/Admin/ProfileAdmin'
import StaffManagement from '../../include/compenent/Admin/StaffManagement'
import DoctorManagement from '../../include/compenent/Admin/DoctorManagement'
import PlanningManagement from '../../include/compenent/Admin/PlanningManagement'
import ResourceManagement from '../../include/compenent/Admin/ResourceManagement'
import Sidebar from '../../include/compenent/Admin/sidebar'
import Performances from '../../include/compenent/Admin/Perfarmances/Performances'


function Administration(props) {
    const [showWithc, setShowWithc] = useState('ProfileDetails');
    const show=(data)=>{
        setShowWithc(data)
        console.log(data)
    }

    const { user } = useContext(AuthContext);
    if (user==null) {
        return (
            <NotAuthorizeAdmin/>
        )
    }
    return (
        <div className="d-flex">
            <Sidebar props={show} />
            <div className="main-content p-3">
                {showWithc==='ProfileDetails'? <ProfileAdmin/>:""}
                {showWithc==='StaffManagement'? <StaffManagement/>:""}
                {showWithc==='DoctorManagement'? <DoctorManagement/>:""}
                {showWithc==='PlanningManagement'? <PlanningManagement/>:""}
                {showWithc==='ResourceManagement'? <ResourceManagement/>:""}
                {showWithc==='Performances'? <Performances/>:""}
            </div>
        </div>
    )
}

export default Administration