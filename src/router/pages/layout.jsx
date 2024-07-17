
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap';

import Navbar from '../../include/compenent/nabar'

export default function Layout() {
    return (
        <>
            <Outlet/>
        </>
    );
}


