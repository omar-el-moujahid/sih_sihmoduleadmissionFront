
import '../../include/Style/login.css'

import React, { useRef, useState } from 'react'
import { Link ,useNavigate } from "react-router-dom";

function Login()  {
    const cni=useRef();
    const password=useRef();
    const history = useNavigate();
    const [errors,seterrors]=useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            CNI: cni.current.value,
            password: password.current.value
        };

        try {
            const response = await fetch(`http://localhost:8080/patient/login?CNI=${formData.CNI}&password=${formData.password}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                seterrors(true)
                throw new Error('Network response was not ok');
            }

            history('/chu/PatientProfil');
            const data = await response.json();
            console.log('Response from server:', data);

        } catch (error) {
            console.error('Error during login:', error.message);
            // Handle error (display error message, reset form, etc.)
        }
    };

    return (
        <div className={"body"}>
        <div className="addUser">
            <h3>Sign in</h3>
            <form className="addUserForm" onSubmit={handleSubmit} >
                <div className="inputGroup">
                    <label htmlFor="email">CNI :</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Enter le numero de le carte d identite "
                        ref={cni}
                    />
                    <label htmlFor="Password">Mots de passe:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Enter le Mots de passe"
                        ref={password}
                    />
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </div>
                {errors ?  <p className={"text-danger"}> CNI or Password incorrect</p> : null}

            </form>
            <div className="login">
                <p>Don't have Account? </p>
                <Link to="/chu/patient-logup" type="submit" className="btn btn-success">
                    Sign Up
                </Link>
            </div>
        </div>
        </div>
    );
};

export default Login;
