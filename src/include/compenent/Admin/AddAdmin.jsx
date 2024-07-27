import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import axios from 'axios';
import Suspender from './Suspender'

function FormExample() {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        firstname: '',
        lastname: '',
        adress: '',
        contact: '',
        active: true,
        gender: 'M',
        dateofbirth: '',
        mail: '',
        roleApps: ['ROLE_USER'],
        cne: ''
    });
    const [backendErrors, setBackendErrors] = useState({});
    const [CustomError, setCustomError] = useState('');
    const [message,setmessage]=useState('');
    const [showmessage,setshowmessage]=useState(false);
    const handleSubmit = async (event) => {
        console.log(formData)
        event.preventDefault();
        setBackendErrors({});
        setCustomError('');
        setshowmessage(false);
        setmessage('');
        try {
            const response = await axios.post('http://localhost:8080/user/AddUser', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('User added successfully:', response.data);
            setmessage("User added successfully: ")
            setshowmessage(true);
        } catch (error){
            // seterrorsbackend(error.response.data)
            // console.error(errorsbackend);
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                if (errorData.type === "validation") {
                    setBackendErrors(errorData.errors || {});
                    console.log(errorData.errors )
                } else if (errorData.type === "custom") {
                    setCustomError(errorData.message);
                    console.log(errorData.message )
                }
            } else {
                console.error("Error adding patient:", error);
            }
        }

        setValidated(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRoleChange = (e) => {
        setFormData({
            ...formData,
            roleApps: [e.target.value]
        });
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {showmessage? <Suspender message={message}/> :""}
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {  'Please provide a valid first name.'}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        { 'Please provide a valid last name.'}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>CNE</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="CNE"
                            name="cne"
                            value={formData.cne}
                            onChange={handleChange}
                            isInvalid={!!CustomError}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {CustomError || 'Please provide a valid CNE.'}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustomPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!backendErrors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        { backendErrors['password'] ||'Please provide a valid password.'}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Email"
                        name="mail"
                        value={formData.mail}
                        onChange={handleChange}
                        isInvalid={!!backendErrors.mail}
                    />
                    <Form.Control.Feedback type="invalid">
                        { backendErrors.mail || 'Please provide a valid email.'}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomContact">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        isInvalid={!!backendErrors.contact}
                    />
                    <Form.Control.Feedback type="invalid">
                        { backendErrors.contact ||'Please provide a valid contact number.'}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustomAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Address"
                        name="adress"
                        value={formData.adress}
                        onChange={handleChange}
                        isInvalid={!!backendErrors.adress}
                    />
                    <Form.Control.Feedback type="invalid">
                        { backendErrors.adress || 'Please provide a valid address.'}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustomGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                        as="select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustomDOB">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        name="dateofbirth"
                        value={formData.dateofbirth}
                        onChange={handleChange}
                        // isInvalid={!!backendErrors.dateofbirth}
                    />
                    <Form.Control.Feedback type="invalid">
                        { 'Please provide a valid date of birth.'}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                    as="select"
                    name="role"
                    value={formData.roleApps[0]}
                    onChange={handleRoleChange}
                >
                    <option value="ROLE_USER">User</option>
                    <option value="ROLE_ADMIN">Admin</option>
                </Form.Control>
            </Form.Group>
            <Button type="submit">Submit form</Button>
        </Form>
    );
}

export default FormExample;
