import React, { useState } from 'react'
import '../Style/PatientProfile.css'
import { Link } from 'react-router-dom'
import image from '../../include/pictures/user.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
function PatientProfile(props) {
    const [showchangepassword,setshowchangepassword]=useState(false);
    const handelclickchangepassword = (e) => {
        e.preventDefault();
        setshowchangepassword(!showchangepassword);
    }
    return (
        <>
        <div className={"main"}>
            <dic className="container-fluid">
                <div className={'row'}>
                    <div className={'col-lg-8'}>
                        <div className={"row"}>
                            <div className="col-md-12">
                                <div className="support-box">
                                    <div className="">
                                        <h3>Your infos</h3>
                                        <form className="">
                                            <div className="row">
                                                <div className="col">
                                                    <input type="text" className="form-control" placeholder="First name"
                                                    />
                                                </div>
                                                <div className="col">
                                                    <input type="text" className="form-control" placeholder="Last name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>Date of birth</label>
                                                    <input type="date" className="form-control"
                                                           placeholder="Date of birth"/>
                                                </div>
                                                <div className="col-md-6 ">
                                                    <label>Date of birth</label>
                                                    <input type="text" className="form-control"
                                                           placeholder="Gneder" readOnly/>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label htmlFor="adress" className={'form-label'}> CIN <span
                                                        className={'text-danger'}></span> </label>
                                                    <input type="tel" className="form-control" placeholder="CNI"
                                                           readOnly/>

                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="adress" className={'form-label'}> Contact <span
                                                        className={'text-danger'}></span> </label>
                                                    <input type="tel" className="form-control" placeholder="Contact"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col">
                                                    <label htmlFor="adress" className={'form-label'}> Adress </label>
                                                    <input type="text" className="form-control" placeholder="Adress"
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
                                                    placeholder="Enter your Email"
                                                    className={'form-control'}
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
                                                        />
                                                        <p className={'text-danger'}></p>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control"
                                                               placeholder="the new Password"
                                                        />
                                                    </div>
                                                    <p className={'text-danger'}></p>
                                                </div>
                                                <button type="submit" className="btn btn-success mt-2">
                                                    change
                                                </button>
                                            </div> : ""}

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={'col-lg-4'}>
                        <div className="support-box-left ">
                            <img className="card-img-top profileuser " src={image} alt="Card image cap"/>
                            <div className="card-body">
                                <p className="card-text"> FullName </p>
                                <button type="submit" className="btn btn-primary mt-2 ">
                                    Take Appointment
                                    <FontAwesomeIcon icon={faCalendarCheck} className={"ms-2"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                    <div className="special-heading-Medicale-hisriry ">
                            <h5  className={"ms-2"}>Medicale History</h5>
                        </div>
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-lg-12"}>
                        <div className="support-box ">

                        </div>
                    </div>
                </div>
            </dic>
        </div>
        </>
    )
}

export default PatientProfile