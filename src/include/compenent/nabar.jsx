import React, { useRef } from "react";
import { faBars ,faTimes} from '@fortawesome/free-solid-svg-icons'
import "../Style/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../pictures/chu-fes-260-removebg-preview.png'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };
    return (
        <header>
            <Link to={'/'} className={'nav-link'}>
                <div className={" ms-5"}>
                    <img src={logo} alt="logo" width={'120px'} className="App-logo "/>
                </div>
            </Link>
            <nav ref={navRef}>
                <Link to={'/'} className={'nav-link text-decoration-none'} style={{color: ' #0092ca'}}>
                    Home
                </Link>
                <Link to={'/'} className={'nav-link text-decoration-none'} style={{color: ' #0092ca'}}>
                    Knew About AS
                </Link>
                <Link to={'/'} className={'nav-link text-decoration-none'} style={{color: ' #0092ca'}}>
                    Our Services
                </Link>
                <Link to={'/'} className={'nav-link text-decoration-none'} style={{color: ' #0092ca'}}>
                    Our Services
                </Link>
                <Link to={'/'} className={'nav-link text-decoration-none'} style={{color: ' #0092ca'}}>
                    Our Services
                </Link>

                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
            </nav>
            <button
                className="nav-btn"
                onClick={showNavbar}>
                <FontAwesomeIcon icon={faBars}/>
            </button>
        </header>
    );
}

