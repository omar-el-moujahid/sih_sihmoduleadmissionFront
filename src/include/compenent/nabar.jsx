import React, { useEffect, useRef, useState } from 'react';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import "../Style/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../pictures/chu-fes-260-removebg-preview.png';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const navRef = useRef(null);
    const bgcheader = useRef(null);
    const [bgColor, setBgColor] = useState('transparent');

    const showNavbar = () => {
        if (navRef.current) {
            navRef.current.classList.toggle("responsive_nav");
        }
    };

    const handleScroll = () => {
        if (bgcheader.current) {
            if (window.scrollY > 10) {
                bgcheader.current.classList.add("bgcheader");
            } else {
                bgcheader.current.classList.remove("bgcheader");
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header ref={bgcheader}>
            <Link to={'/chu/'} className={'nav-link'}>
                <div className={"ms-5"}>
                    <img src={logo} alt="logo" width={'120px'} className="App-logo"/>
                </div>
            </Link>
            <nav ref={navRef}>
                <Link to={'/chu/'} className={'nav-link text-decoration-none'} style={{color: 'whitesmoke', fontSize: "x-large", fontWeight: 'bold'}}>
                    Home
                </Link>
                <Link to={'/chu/about'} className={'nav-link text-decoration-none'} style={{color: 'whitesmoke', fontSize: "x-large", fontWeight: 'bold'}}>
                    About Us
                </Link>
                <Link to={'/chu/services'} className={'nav-link text-decoration-none'} style={{color: 'whitesmoke', fontSize: "x-large", fontWeight: 'bold'}}>
                    Our Services
                </Link>
                <Link to={'/chu/Contact'} className={'nav-link text-decoration-none'} style={{color: 'whitesmoke', fontSize: "x-large", fontWeight: 'bold'}}>
                    Contact
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
