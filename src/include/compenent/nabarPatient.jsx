import React, { useEffect, useRef, useState } from 'react';
import "../Style/patientnavbar.css";
import logo from '../pictures/chu-fes-260-removebg-preview.png';
import { Link } from 'react-router-dom';
import user from '../pictures/user.png';

export default function NavbarPtient() {
    const bgcheader = useRef();
    const [show, setShow] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setShow(prevState => !prevState);
        console.log("clicked from state");
    };

    useEffect(() => {
        bgcheader.current.classList.add("bgcheader");
        console.log("useEffect executed");
    }, []);

    useEffect(() => {
        console.log(`show state changed: ${show}`);
    }, [show]);

    return (
        <header ref={bgcheader} className="flex-row justify-content-between">
            <div>
                <Link to={'/'} className="nav-link">
                    <div className="ms-5">
                        <img src={logo} alt="logo" width="120px" className="App-logo"/>
                    </div>
                </Link>
            </div>
            <div className="profile"  onClick={handleClick}>
                <a href="#" className="nav-link text-decoration-none" style={{color: 'whitesmoke', fontSize: 'x-large', fontWeight: 'bold'}}>
                    <img src={user} alt="user" className="img nav-link text-decoration-none"/>
                </a>
            </div>
            <ul className={`dropdown-menu dropdown-menu-end ${show ? 'show' : ''}`} data-bs-popper="static"  >
                <li>
                    <a className="dropdown-item" href="#">
                        <div className="d-flex">
                            <div className="flex-shrink-0 me-1 w-50">
                                <div>
                                    <img src={user} alt="user" className="w-50 h-auto rounded-circle"/>
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <span className="fw-semibold d-block">Chu</span>
                                <br/>
                                <small className="text-muted d-block">Patient</small>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <div className="dropdown-divider"></div>
                </li>
                <li>
                    <a className="dropdown-item" id="profileMenu" href="#">
                        <i className="bx bx-user me-2"></i>
                        <span className="align-middle">My Profile</span>
                    </a>
                </li>
                <li>
                    <div className="dropdown-divider"></div>
                </li>
                <li>
                    <a className="dropdown-item" href="logout">
                        <i className="bx bx-power-off me-2"></i>
                        <span className="align-middle">Log Out</span>
                    </a>
                </li>
            </ul>
        </header>
    );
}
