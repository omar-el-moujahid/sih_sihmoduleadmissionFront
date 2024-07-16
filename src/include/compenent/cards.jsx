// src/components/LoginSections.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUsers, faUserMd } from '@fortawesome/free-solid-svg-icons';
import '../Style/Users.css';

function Cards() {
    return (
        <div className="containercss mt-5 ">
            <div className="row justify-content-center">
                <div className="col-sm-4 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <FontAwesomeIcon icon={faBriefcase} size="3x" className="mb-3" />
                            <h5 className="card-title">ESPACE ADMINISTRATION</h5>
                            <p className="card-text">Login</p>
                            <Link to="/admin-login" className="btn btn-primary">Login</Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <FontAwesomeIcon icon={faUsers} size="3x" className="mb-3" />
                            <h5 className="card-title">ESPACE PATIENT</h5>
                            <p className="card-text">Login</p>
                            <Link to="/patient-login" className="btn btn-primary">Login</Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <FontAwesomeIcon icon={faUserMd} size="3x" className="mb-3" />
                            <h5 className="card-title">ESPACE MEDECINE</h5>
                            <p className="card-text">Login</p>
                            <Link to="/medicine-login" className="btn btn-primary">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cards;
