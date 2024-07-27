import React, { useContext, useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap';
import '../../Style/slidbar.css'
import logo from '../../pictures/user.png';
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/Authprovider'

function Sidebar(props) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isManagementOpen, setIsManagementOpen] = useState(false);
    const { signOut } = useContext(AuthContext); // Destructure signOut from context
    const history=useNavigate();
    const [showWithc, setShowWithc] = useState('ProfileDetails');
    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleManagementClick = () => {
        setIsManagementOpen(!isManagementOpen);
    };

    useEffect(() => {
        props.props(showWithc)
    }, [showWithc]);

    return (
        <div className="sidebar bg-dark text p-3">
            <div
                className="sidebar-header d-flex align-items-center"
                onClick={handleProfileClick}
            >
                <img src={logo} alt="User" className="logo"/>
                <h4 className="ms-2 mt-3"> Profile </h4>
            </div>
            {isProfileOpen && (
                <div className="profile-options">
                    <a href="#" className="text-50" onClick={() => setShowWithc('ProfileDetails')}>Profile</a>
                    <a href="#" className="text-50" onClick={(e)=>{
                        e.preventDefault()
                        signOut()
                        history("/chu/admin-login")
                    }} >  Logout</a>
                </div>
            )}
            <Nav className="flex-column mt-4">
                <div
                    className="nav-item text"
                    onClick={handleManagementClick}
                >
                    <Nav.Link href="#" className="text"> Management</Nav.Link>

                </div>
                {isManagementOpen && (
                    <div className="management-options">
                        <Nav.Link href="#" className="text" onClick={() => setShowWithc('StaffManagement')}>Staff
                            Management</Nav.Link>
                        <Nav.Link href="#" className="text" onClick={() => setShowWithc('DoctorManagement')}>Doctor
                            Management</Nav.Link>
                        <Nav.Link href="#" className="text" onClick={() => setShowWithc('PlanningManagement')}>Planning
                            Management</Nav.Link>
                        <Nav.Link href="#" className="text" onClick={() => setShowWithc('ResourceManagement')}>Resource
                            Management</Nav.Link>
                    </div>
                )}
            </Nav>
            <div className="nav-item text mt-5">
                <Nav.Link href="#" className="text" onClick={() => setShowWithc('Performances')}>Performances</Nav.Link>
            </div>
        </div>
    );
}

export default Sidebar;
