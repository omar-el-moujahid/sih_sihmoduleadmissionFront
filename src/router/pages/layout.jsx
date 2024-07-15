
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap';
import logo from '../../include/pictures/chu-fes-260-removebg-preview.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../../include/compenent/nabar'

export default function Layout() {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
}


