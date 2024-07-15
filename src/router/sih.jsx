import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Layout from './pages/layout'
import Home from './pages/home'
import Navbar from '../include/compenent/nabar'
export default  function Sih() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<Home></Home>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

