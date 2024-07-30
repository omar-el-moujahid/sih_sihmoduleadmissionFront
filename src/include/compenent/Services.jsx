import React from 'react';
import Navbar from '../../include/compenent/nabar';
import Footer from '../../include/compenent/Footer';
import chu from '../pictures/chu-fes-260-removebg-preview.png';
import { Link } from 'react-router-dom';

function Services() {
    return (
        <section>
            <Navbar />
            <div className="bg-image">
                <div className="box">
                    <img src={chu} className="" alt="CHU" />
                    <h1 style={{color: 'whitesmoke', fontSize: "x-large", fontWeight: 'bold'}} className="title">
                        CENTRE HOSPITALIER UNIVERSITAIRE HASSAN II
                        <br />
                        Un établissement de référence au service de la Santé
                    </h1>
                    <div className="mt-5">
                        <Link to={'/'} className="me-2">
                            <button className="btn btn-primary border-5 radio">
                                Contact us
                            </button>
                        </Link>
                        <Link to={'/'} className="ms-5">
                            <button className="btn btn-light border-5 radio me-2">
                                Contact us
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <h1>Our Services</h1>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <h3>Emergency Care</h3>
                        <p>24/7 emergency medical services for critical care and urgent medical needs.</p>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h3>Outpatient Services</h3>
                        <p>Comprehensive outpatient care including consultations, diagnostics, and treatments.</p>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h3>Specialized Departments</h3>
                        <p>Specialized care in cardiology, neurology, oncology, and more.</p>
                    </div>
                    {/* Add more service items as needed */}
                </div>
            </div>
            <Footer />
        </section>
    );
}

export default Services;
