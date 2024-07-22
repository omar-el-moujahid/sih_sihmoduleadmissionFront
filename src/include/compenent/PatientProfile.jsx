import React, { useContext, useEffect, useRef, useState } from 'react'
import '../Style/PatientProfile.css'
import { Link } from 'react-router-dom'
import image from '../../include/pictures/user.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../context/Authprovider'
import axios from 'axios'
import MedicalHistoryComponent from './medicalHistoryComponent'
import PatientAppointementComponent from './PatientAppointementComponent'
function PatientProfile() {
    const [showchangepassword,setshowchangepassword]=useState(false);
    const { user } = useContext(AuthContext);
    const firstnameref=useRef();
    const lasnameref=useRef();
    const dateofbirthref=useRef();
    const contactref=useRef();
    const adressref=useRef();
    const mailfref=useRef();
    const oldpasswordref=useRef();
    const newpasswordref=useRef();
    const [errorpasword,seterrorpasword]=useState("")
    const [errorsbackend,seterrorsbackend]=useState({});
    const [CustomError, setCustomError] = useState("");
    const [showApointment , setshowApointment]=useState(false);
    const [specialety,setspecialety]=useState([])
    const specialetyref = useRef();
    const [appointementistoken,setappointementistoken]=useState(false)
    const [errosrnd,seterrosrnd]=useState("")
    const [errosrndexiste,seterrosrndexiste]=useState(false)
    const [medicalhistories,setmedicalhistories]=useState([])
    const handelclickchangepassword = (e) => {
        e.preventDefault();
        setshowchangepassword(!showchangepassword);
    }

    // const handelupdate=(e)=>{
    //     e.preventDefault();
    //     console.log(firstnameref.current.value);
    // }
    const handelchange =async (e) =>{
        seterrorpasword("")
        e.preventDefault()
        if(oldpasswordref.current.value==="" ||oldpasswordref.current.value==="" )  seterrorpasword("Non of fields should be empty")
        else {
            try {
                seterrorsbackend("")
                setCustomError("")
                const response = await axios.post("http://localhost:8080/patient/Updatepassword", null, {
                    params: {
                        CIN: user.cne,
                        Oldpassword: oldpasswordref.current.value,
                        Newpassword: newpasswordref.current.value,
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setshowchangepassword(false)
            }
            catch (error){
                setshowchangepassword(true)
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
    }
    const handelshowApointment = async (e)=>{
        seterrosrnd("")
        seterrosrndexiste(false)
        setappointementistoken(false)
        const newShowApointment = !showApointment;
        setshowApointment(newShowApointment);
        if (newShowApointment) {
            try {
                const response=await axios.get("http://localhost:8080/specialities",{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setspecialety(response?.data)
            }catch (error){
                console.log(error)
            }
        }
    }
    const handelconforme = async (e)=>{
        e.preventDefault()
        seterrosrndexiste(false)
        setappointementistoken(false)
        seterrosrnd("")
        try {
            const response = await axios.get('http://localhost:8080/chu/patient/appointment', {
                params: {
                    SpecialityName: specialetyref.current.value,
                    PatientId: user.cne
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response from server:', response.data);
            setappointementistoken(true)
        }catch (error){
            seterrosrndexiste(true);
            if (error.response) {
                seterrosrnd(error.response.data.message);
                console.log(error.response.data);
            } else {
                seterrosrnd('An unexpected error occurred repate later .');
            }
            console.log(error)
        }

    }
    useEffect(() => {
        console.log(specialety)
    }, [specialety])
    return (
        <>
            <div className={"main"}>
                <div className="container-fluid">
                    <div className={'row ms-1 me-1'}>
                        <div className={'col-lg-8'}>
                            <div className={"row"}>
                                <div className="col-md-12">
                                    <div className="support-box">
                                        <div className="">
                                            <h3>Your infos</h3>
                                            <form className="">
                                                <div className="row">
                                                    <div className="col">
                                                        <input type="text" className="form-control"
                                                               value={user.firstname}

                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control"
                                                               placeholder={user.lastname}
                                                               ref={lasnameref}/>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-md-6">
                                                        <label>Date of birth</label>
                                                        <input type="text" className="form-control"
                                                               placeholder={user.dateofbirth}
                                                               ref={dateofbirthref}/>
                                                    </div>
                                                    <div className="col-md-6 ">
                                                        <label>Gender</label>
                                                        <input type="text" className="form-control"
                                                               value={user.gender = "M" ? "male" : "female"} readOnly/>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-md-6">
                                                        <label htmlFor="adress" className={'form-label'}> CIN <span
                                                            className={'text-danger'}></span> </label>
                                                        <input type="tel" className="form-control" value={user.cne}
                                                        />

                                                    </div>
                                                    <div className="col-md-6">
                                                        <label htmlFor="adress" className={'form-label'}> Contact <span
                                                            className={'text-danger'}></span> </label>
                                                        <input type="tel" className="form-control"
                                                               placeholder={user.contact}
                                                               ref={contactref}/>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <label htmlFor="adress"
                                                               className={'form-label'}> Adress </label>
                                                        <input type="text" className="form-control"
                                                               placeholder={user.adress}
                                                               ref={adressref}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="inputGroup">
                                                    <label htmlFor="email">Email <span className={'text-danger'}></span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        autoComplete="off"
                                                        placeholder={user.mail}
                                                        className={'form-control'}
                                                        ref={mailfref}
                                                    />

                                                    <button type="submit" className="btn btn-success mt-2">
                                                        Update
                                                    </button>

                                                </div>
                                            </form>
                                            <div className="login">
                                                <p> Change password ? </p>
                                                <button type="submit" className="btn btn-primary"
                                                        onClick={handelclickchangepassword}>
                                                    Change password
                                                </button>
                                            </div>
                                            {showchangepassword ?
                                                <div>
                                                    <div className="row mt-5">
                                                        <div className="col">
                                                            <input type="text" className="form-control"
                                                                   placeholder="the old Password"
                                                                   ref={oldpasswordref}
                                                            />
                                                            <p className={'text-danger'}>
                                                                {CustomError}
                                                            </p>
                                                        </div>
                                                        <div className="col">
                                                            <input type="text" className="form-control"
                                                                   placeholder="the new Password"
                                                                   ref={newpasswordref}
                                                            />
                                                        </div>
                                                    </div>
                                                    <p className={'text-danger'}>{errorpasword}</p>
                                                    <button type="submit" className="btn btn-success mt-2"
                                                            onClick={handelchange}>
                                                        change
                                                    </button>
                                                </div> : ''}

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className={'col-lg-4'}>
                            <div className="support-box-left ">
                                <img className="card-img-top profileuser " src={image} alt="Card image cap"/>
                                <div className="card-body">
                                    <p className="card-text"> {user.lastname} {user.firstname} </p>
                                    <button type="submit" className="btn btn-primary mt-2 "
                                            onClick={handelshowApointment}>
                                        Take Appointment
                                        <FontAwesomeIcon icon={faCalendarCheck} className={"ms-2"}/>
                                    </button>
                                    <br/>
                                    {
                                        showApointment ?
                                            <>
                                                <div className={'row mt-4 '}>
                                                    <form className={'form-control'}>
                                                        <label className={'form-label me-2'}>chose Speciality: </label>
                                                        <select className="form-select" ref={specialetyref}>
                                                            {specialety.map((speciality, index) => (
                                                                <option key={index} value={speciality.specialtyName}>
                                                                    {speciality.specialtyName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <button className={'btn btn-primary mt-2'}
                                                                onClick={handelconforme}>
                                                            Conforme Chose
                                                        </button>
                                                        {errosrndexiste ?
                                                            <div
                                                                className={'alert alert-danger mt-3'}>{errosrnd}</div> : ""}
                                                        {appointementistoken ?
                                                            <div className={'alert alert-success mt-3'}>Appointement is
                                                                token check your email</div> : ""}
                                                    </form>
                                                </div>
                                            </>
                                            :
                                            <></>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="special-heading-Medicale-hisriry ">
                                <h5 className={'ms-2'}>Your Appointamant</h5>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <PatientAppointementComponent user={user}>

                            </PatientAppointementComponent>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="special-heading-Medicale-hisriry ">
                                <h5 className={'ms-2'}>Medicale History</h5>
                            </div>
                        </div>
                    </div>
                    <MedicalHistoryComponent user={user}>

                    </MedicalHistoryComponent>
                </div>
            </div>
        </>
    )
}

export default PatientProfile