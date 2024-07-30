import React from 'react';
import Navbar from '../../include/compenent/nabar';
import Footer from '../../include/compenent/Footer';
import chu from '../pictures/chu-fes-260-removebg-preview.png';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function About() {
    return (
        <section>
            <Navbar />
            <div className="bg-image">
                <div className="box text-center">
                    <img src={chu} className="img-fluid" alt="CHU" />
                    <h1 className="text-whitesmoke display-4 font-weight-bold mt-4">
                        CENTRE HOSPITALIER UNIVERSITAIRE HASSAN II
                        <br />
                        Un établissement de référence au service de la Santé
                    </h1>
                    <div className="mt-5 d-flex justify-content-center">
                        <Link to={'/'} className="me-2">
                            <button className="btn btn-primary btn-lg border-5 rounded-pill">
                                Contact us
                            </button>
                        </Link>
                        <Link to={'/'} className="ms-5">
                            <button className="btn btn-light btn-lg border-5 rounded-pill">
                                Contact us
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container mt-5 bg-light p-5 rounded shadow-sm">
                <h1 className="display-4 mb-4">About CENTRE HOSPITALIER UNIVERSITAIRE HASSAN II</h1>
                <div className="row mt-4">
                    <div className="col-md-6">
                        <h3 className="font-weight-bold">Our Mission</h3>
                        <p>To provide exceptional healthcare services, advance medical education, and conduct innovative research to improve the health and well-being of our community.</p>
                    </div>
                    <div className="col-md-6">
                        <h3 className="font-weight-bold">Our Vision</h3>
                        <p>To be the leading healthcare institution in the region, known for excellence in patient care, education, and research.</p>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <h3 className="font-weight-bold">Our History</h3>
                        <p>Founded in [year], CENTRE HOSPITALIER UNIVERSITAIRE HASSAN II has been at the forefront of medical care and innovation for [X] years. Our commitment to excellence has made us a trusted healthcare provider in the region.</p>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-6">
                        <h3 className="font-weight-bold">Our Values</h3>
                        <p>We are committed to integrity, compassion, and excellence in all that we do. Our values guide our actions and decisions every day.</p>
                    </div>
                    <div className="col-md-6">
                        <h3 className="font-weight-bold">Our Team</h3>
                        <p>Our team of dedicated professionals is our greatest asset. We work together to provide the highest quality care to our patients.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
}

export default About;
