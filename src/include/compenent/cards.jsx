import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUsers, faUserMd } from '@fortawesome/free-solid-svg-icons';
import '../Style/Crds.css';

function Cards() {
    return (
        <div className="containercss mt-5 ">
            <div className="row justify-content-center">

                <div className="col-sm-3 mb-4 ">
                    <a href="/admin-login">c
                        <div className="card text-center">
                            <div className="card-body">
                                <FontAwesomeIcon icon={faBriefcase} size="3x" className="mb-3"/>
                                <h5 className="card-titlecss">ESPACE ADMINISTRATION</h5>
                                <p className="card-text">Login</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-sm-3 mb-4 ">
                    <a href="/chu/patient-login">
                        <div className="card text-center">
                            <div className="card-body">
                                <FontAwesomeIcon icon={faUsers} size="3x" className="mb-3"/>
                                <h5 className="card-titlecss">ESPACE PATIENT</h5>
                                <p className="card-text">Login</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-sm-3 mb-4 ">
                    <a href="/admin-login">
                        <div className="card text-center">
                            <div className="card-body">
                                <FontAwesomeIcon icon={faUserMd} size="3x" className="mb-3"/>
                                <h5 className="card-titlecss">ESPACE MEDCINE</h5>
                                <p className="card-text">Login</p>
                            </div>
                        </div>
                    </a>
                </div>

            </div>
        </div>
    );
}

export default Cards;
