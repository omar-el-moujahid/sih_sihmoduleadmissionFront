import React, { useState, useEffect } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import axios from 'axios';
import Suspender from '../Suspender';

function AddDoctorForm() {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        firstname: '',
        lastname: '',
        address: '',
        contact: '',
        mail: '',
        dateofbirth: '',
        gender: 'M',
        officeNumber: '',
        specialtyDTO: '',
        cne: ''
    });
    const [backendErrors, setBackendErrors] = useState({});
    const [customError, setCustomError] = useState('');
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [specialties, setSpecialties] = useState([]);
    const fetchSpecialties = async () => {
        try {
            const response = await axios.get('http://localhost:8080/specialities', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setSpecialties(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching specialties:', error);
        }
    };
    useEffect(() => {
        fetchSpecialties();
    }, []);

    const handleSubmit = async (event) => {
        console.log(formData)
        event.preventDefault();
        setBackendErrors({});
        setCustomError('');
        setShowMessage(false);
        setMessage('');
        try {
            const response = await axios.post('http://localhost:8080/doctor/save', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Doctor added successfully:', response.data);
            setMessage('Doctor added successfully.');
            setShowMessage(true);
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                if (errorData.type === 'validation') {
                    setBackendErrors(errorData.errors || {});
                } else if (errorData.type === 'custom') {
                    setCustomError(errorData.message);
                }
            } else {
                console.error('Error adding doctor:', error);
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

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {showMessage ? <Suspender message={message} /> : ''}
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
                        {'Please provide a valid first name.'}
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
                        {'Please provide a valid last name.'}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomCNE">
                    <Form.Label>CNE</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="CNE"
                            name="cne"
                            value={formData.cne}
                            onChange={handleChange}
                            isInvalid={!!customError || !!backendErrors.CNE}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {customError || backendErrors['CNE'] || 'Please provide a valid CNE.'}
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
                        {backendErrors['password'] || 'Please provide a valid password.'}
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
                        {backendErrors.mail || 'Please provide a valid email.'}
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
                        {backendErrors.contact || 'Please provide a valid contact number.'}
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
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        isInvalid={!!backendErrors.address}
                    />
                    <Form.Control.Feedback type="invalid">
                        {backendErrors.address || 'Please provide a valid address.'}
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
                    />
                    <Form.Control.Feedback type="invalid">
                        {'Please provide a valid date of birth.'}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustomOfficeNumber">
                    <Form.Label>Office Number</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Office Number"
                        name="officeNumber"
                        value={formData.officeNumber}
                        onChange={handleChange}
                        isInvalid={!!backendErrors.officeNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                        {backendErrors.officeNumber || 'Please provide a valid office number.'}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustomSpecialty">
                    <Form.Label>Specialty</Form.Label>
                    <Form.Control
                        as="select"
                        name="specialtyDTO"
                        value={formData.specialtyDTO}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Specialty</option>
                        {specialties.map(specialty => (
                            <option key={specialty.id} value={specialty.specialtyName}>
                                {specialty.specialtyName}
                            </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {backendErrors.specialtyDTO || 'Please select a valid specialty.'}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit">Submit form</Button>
        </Form>
    );
}

export default AddDoctorForm;
