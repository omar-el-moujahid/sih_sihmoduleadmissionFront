import '../../include/Style/login.css';
import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import AuthContext from '../../include/context/Authprovider';

function Login() {
    const cni = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState(false);
    const [whatErrors, setWhatErrors] = useState('');
    const { signIn } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cni.current || !password.current) {
            setErrors(true);
            setWhatErrors('CNI and Password fields cannot be empty.');
            return;
        }

        const formData = {
            CNI: cni.current.value,
            password: password.current.value
        };

        try {
            const response = await axios.get('http://localhost:8080/patient/login', {
                params: {
                    CNI: formData.CNI,
                    password: formData.password
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response from server:', response.data);
            signIn(response.data);
            navigate('/chu/PatientProfil');  // Redirect to profile page
        } catch (error) {
            setErrors(true);
            if (error.response) {
                setWhatErrors(error.response.data.message);
            } else {
                setWhatErrors('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="body">
            <div className="addUser">
                <h3>Sign in <span>/Patient</span> </h3>
                <form className="addUserForm" onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label htmlFor="email">CNI :</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            autoComplete="off"
                            placeholder="Enter le numero de le carte d'identite"
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
                    {errors && <p className="text-danger">{whatErrors}</p>}
                </form>
                <div className="login">
                    <p>Don't have an Account?</p>
                    <Link to="/chu/patient-logup" className="btn btn-success">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
