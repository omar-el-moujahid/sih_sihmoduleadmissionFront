import React, { useContext, useRef, useState } from 'react';
import '../../Style/PatientProfile.css';
import axios from 'axios';
import UpdateAdmine from './UpdateAdmin'
import AuthContext from '../../context/Authprovider'

function PatientProfile() {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const { user } = useContext(AuthContext);
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const dateOfBirthRef = useRef();
    const contactRef = useRef();
    const addressRef = useRef();
    const emailRef = useRef();
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const [passwordError, setPasswordError] = useState("");
    const [backendErrors, setBackendErrors] = useState({});
    const [customError, setCustomError] = useState("");
    const [modalShow, setModalShow] = React.useState(false);
    const handleClickChangePassword = (e) => {
        e.preventDefault();
        setShowChangePassword(!showChangePassword);
    }

    const handleChangePassword = async (e) => {
        setPasswordError("");
        e.preventDefault();
        if (oldPasswordRef.current.value === "" || newPasswordRef.current.value === "") {
            setPasswordError("None of the fields should be empty");
        } else {
            try {
                setBackendErrors({});
                setCustomError("");
                await axios.post("http://localhost:8080/doctor/Updatepassword", null, {
                    params: {
                        CIN: user.cne,
                        Oldpassword: oldPasswordRef.current.value,
                        Newpassword: newPasswordRef.current.value,
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setShowChangePassword(false);
            } catch (error) {
                setShowChangePassword(true);
                if (error.response && error.response.data) {
                    const errorData = error.response.data;
                    if (errorData.type === "validation") {
                        setBackendErrors(errorData.errors || {});
                    } else if (errorData.type === "custom") {
                        setCustomError(errorData.message);
                    }
                } else {
                    console.error("Error changing password:", error);
                }
            }
        }
    }

    return (
        <>
            <div className={"main"}>
                <div className="container-fluid">
                    <div className={'row ms-1 me-1'}>
                            <div className={"row"}>
                                <div className="col-md-12">
                                    <div className="support-box">
                                        <div className="">
                                            <h3>Your infos</h3>
                                            <form className="">
                                                <div className="row">
                                                    <div className="col">
                                                        <input type="text" className="form-control" value={user.firstname} readOnly />
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" placeholder={user.lastname} ref={lastnameRef} />
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-md-6">
                                                        <label>Date of birth</label>
                                                        <input type="text" className="form-control" placeholder={user.dateofbirth} ref={dateOfBirthRef} />
                                                    </div>
                                                    <div className="col-md-6 ">
                                                        <label>Gender</label>
                                                        <input type="text" className="form-control" value={user.gender === 'M' ? 'male' : 'female'} readOnly />
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-md-6">
                                                        <label htmlFor="cin" className={'form-label'}> CIN </label>
                                                        <input type="tel" className="form-control" value={user.cne} readOnly />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label htmlFor="contact" className={'form-label'}> Contact </label>
                                                        <input type="tel" className="form-control" placeholder={user.contact} ref={contactRef} />
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <label htmlFor="roles" className={'form-label'}>Roles</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={user.roleApps.join(', ')}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor="address"
                                                               className={'form-label'}> Address </label>
                                                        <input type="text" className="form-control"
                                                               placeholder={user.adress} ref={addressRef}/>
                                                    </div>
                                                </div>
                                                <div className="inputGroup mt-3">
                                                    <label htmlFor="email">Email </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        autoComplete="off"
                                                        placeholder={user.mail}
                                                        className={'form-control'}
                                                        ref={emailRef}
                                                    />
                                                    <UpdateAdmine user={user}></UpdateAdmine>
                                                </div>
                                            </form>
                                            <div className="login mt-3">
                                                <p> Change password? </p>
                                                <button type="submit" className="btn btn-primary" onClick={handleClickChangePassword}>
                                                    Change password
                                                </button>
                                            </div>
                                            {showChangePassword &&
                                                <div>
                                                    <div className="row mt-5">
                                                        <div className="col">
                                                            <input type="password" className="form-control" placeholder="Old Password" ref={oldPasswordRef} />
                                                            <p className={'text-danger'}>{customError}</p>
                                                        </div>
                                                        <div className="col">
                                                            <input type="password" className="form-control" placeholder="New Password" ref={newPasswordRef} />
                                                        </div>
                                                    </div>
                                                    <p className={'text-danger'}>{passwordError}</p>
                                                    <button type="submit" className="btn btn-success mt-2" onClick={handleChangePassword}>
                                                        Change
                                                    </button>
                                                </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}

export default PatientProfile;
