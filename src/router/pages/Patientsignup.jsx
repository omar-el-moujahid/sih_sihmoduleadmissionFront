
import React, { useEffect, useRef, useState } from 'react'
import "../../include/Style/signup.css";
import { Link } from "react-router-dom";
import axios from 'axios'

function PatientSignup() {
    const firstnameref=useRef();
    const lasnameref=useRef();
    const dateofbirthref=useRef();
    const [gender, setGender] = useState(''); // State to hold selected gender
    const cinref=useRef();
    const contactref=useRef();
    const adressref=useRef();
    const mailfref=useRef();
    const passwordref=useRef();
    const passwordconfirmationref=useRef();
    const [accestopaswordconfirm , setaccestopaswordconfirm]=useState(false)
    const [errorsfronts,seterrorsfronts]=useState('');
    const [valide,setvalide]=useState(true);
    const [errorsbackend,seterrorsbackend]=useState({});
    const [customError, setCustomError] = useState(null);
    const handelgendergrnder = (e)=>{
        setGender(e.target.value);
    }
    const handelpassword=()=>{
        if(passwordref.current.value =="") setaccestopaswordconfirm(false)
        else setaccestopaswordconfirm(true)
    }
    const handelpasswordconfirmation=()=>{
        if(passwordref.current.value!=passwordconfirmationref.current.value){
            seterrorsfronts("the passwords are not match")
        }
        else
            seterrorsfronts("")
    }
    const checkvalide = (formData) => {
        if(formData.password === "" || formData.password_confirmation === ""
            || formData.firstName === "" || formData.lastName === "" ||
            formData.dateOfBirth === "" || formData.gender === "" ||
            formData.CIN === "" || formData.contact === "" ||
             formData.email === "") {
            return false;
        }
         return true;
    }

    const addPatient = async (fromData)=>{
        seterrorsbackend({})
        setCustomError(null)
        try {
            const  response = await axios.post("http://localhost:8080/patient/addPatient",{
                firstname: fromData.firstName,
                lastname: fromData.lastName,
                adress: fromData.address,
                contact: fromData.contact,
                mail: fromData.email,
                dateofbirth: fromData.dateOfBirth,
                gender: fromData.gender,
                cne: fromData.CIN,
                password:fromData.password
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Response from server:", response.data);
        }catch (error){
            // seterrorsbackend(error.response.data)
            // console.error(errorsbackend);
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                if (errorData.type === "validation") {
                    seterrorsbackend(errorData.errors || {});
                    console.log(errorData.errors )
                } else if (errorData.type === "custom") {
                    setCustomError(errorData.message);
                    console.log(errorData.message )
                }
            } else {
                console.error("Error adding patient:", error);
            }
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            firstName: firstnameref.current.value,
            lastName: lasnameref.current.value,
            dateOfBirth: dateofbirthref.current.value,
            gender: gender ,
            CIN: cinref.current.value,
            contact: contactref.current.value,
            address: adressref.current.value,
            email: mailfref.current.value,
            password: passwordref.current.value,
            passwordConfirmation: passwordconfirmationref.current.value
        };

        const isValid = checkvalide(formData);
        setvalide(isValid);
        if (isValid) {
            addPatient(formData);
        }

        console.log(formData);
        console.log(valide);
    };
    useEffect(() => {
        console.log(accestopaswordconfirm)
    }, [accestopaswordconfirm])
    return (
        <div className={"body"}>
        <div className="addUser">
            <h3>Sign Up</h3>
            <form className="addUserForm" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="First name" ref={firstnameref}/>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Last name" ref={lasnameref}/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <label>Date of birth</label>
                        <input type="date" className="form-control" placeholder="Date of birth" ref={dateofbirthref} />
                    </div>
                    <div className="col-md-6 mt-4">
                        <label className="form-label">Gender :</label>
                        <div className="form-check form-check-inline ms-3">
                            <input className="form-check-input" type="radio" name="gender" id="M" value="M"  onChange={handelgendergrnder}/>
                            <label className="form-check-label" htmlFor="M">M</label>
                        </div>
                        <div className="form-check form-check-inline ms-3">
                            <input className="form-check-input" type="radio" name="gender" id="F" value="F" onChange={handelgendergrnder}/>
                            <label className="form-check-label" htmlFor="F">F</label>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <label htmlFor="adress" className={'form-label'}> CIN <span
                            className={'text-danger'}>*</span> </label>
                        <input type="tel" className="form-control" placeholder="CNI" ref={cinref}/>
                        <p className={'text-danger'}>{errorsbackend['CNE']}</p>
                        <p className={'text-danger'}>{customError}</p>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="adress" className={'form-label'}> Contact <span
                            className={'text-danger'}>*</span> </label>
                        <input type="tel" className="form-control" placeholder="Contact" ref={contactref}/>
                        <p className={'text-danger'}>{errorsbackend['contact']}</p>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <label htmlFor="adress" className={'form-label'}> Adress </label>
                        <input type="text" className="form-control" placeholder="Adress" ref={adressref}/>
                    </div>
                </div>

                <div className="inputGroup">
                    <label htmlFor="email">Email <span className={'text-danger'}>*</span> </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Enter your Email"
                        className={'form-control'}
                        ref={mailfref}
                    />
                    <div className="row mt-3">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Password" ref={passwordref}
                                   onChange={handelpassword}
                            />
                            <p className={'text-danger'}>{errorsbackend['password']}</p>
                        </div>
                        <div className="col">
                        <input type="text" className="form-control" placeholder="Confirme Password" ref={passwordconfirmationref}
                                   onChange={handelpasswordconfirmation}
                                   readOnly={!accestopaswordconfirm}

                            />
                        </div>
                        <p className={"text-danger"}>{errorsfronts}</p>
                    </div>

                    <button type="submit" className="btn btn-success">
                        Sign Up
                    </button>
                    {!valide ? <p className={"text-danger"}> all fields are requiered</p> :""}
                </div>
            </form>
            <div className="login">
                <p>Already have an Account? </p>
                <Link to="/chu/patient-login" type="submit" className="btn btn-primary">
                    Login
                </Link>
            </div>
        </div>
        </div>
    );
}

export default PatientSignup;
