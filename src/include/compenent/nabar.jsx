import React, { useEffect, useRef, useState } from 'react'
import { faBars ,faTimes} from '@fortawesome/free-solid-svg-icons'
import "../Style/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../pictures/chu-fes-260-removebg-preview.png'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const navRef = useRef();
    const bgcheader = useRef();
    const [bgColor, setBgColor] = useState('transparent');
    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };

    const handleScroll = () => {
        if (window.scrollY > 10) {
            bgcheader.current.classList.add("bgcheader"); ;
            // setBgColor('#29335c'); // Change to your desired background color
        } else {
            bgcheader.current.classList.remove("bgcheader"); ;
            // setBgColor("#29335c");
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header ref={bgcheader} >
            <Link to={'/'} className={'nav-link'}>
                <div className={" ms-5"}>
                    <img src={logo} alt="logo" width={'120px'} className="App-logo "/>
                </div>
            </Link>
            <nav ref={navRef}>
                <Link to={'/'} className={'nav-link text-decoration-none'} style={{color: 'whitesmoke' , fontSize:"x-large" ,fontWeight:'bold'}}>
                    Home
                </Link>
                <Link to={'/'} className={'nav-link text-decoration-none'} style={{color: 'whitesmoke' , fontSize:"x-large" ,fontWeight:'bold'}}>
                     About US
                </Link>
                <Link to={'/'} className={'nav-link text-decoration-none'} style={{color: 'whitesmoke' , fontSize:"x-large" ,fontWeight:'bold'}}>
                    Our Services
                </Link>
                <Link to={'/'} className={'nav-link text-decoration-none'} style={{color: 'whitesmoke' , fontSize:"x-large" ,fontWeight:'bold'}}>
                    Our Services
                </Link>
                <Link to={'/'} className={'nav-link text-decoration-none'} style={{color: 'whitesmoke' , fontSize:"x-large" ,fontWeight:'bold'}}>
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
