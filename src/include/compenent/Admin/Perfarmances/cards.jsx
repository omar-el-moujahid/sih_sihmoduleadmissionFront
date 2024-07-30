import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Button, Col, Form, Row } from 'react-bootstrap';

function Cards() {
    const [specialties, setSpecialties] = useState([]);
    const [formData, setFormData] = useState({ specialtyName: 'All' });
    const [validated, setValidated] = useState(false);
    const [backendErrors, setBackendErrors] = useState({});
    const [totalPatients, setTotalPatients] = useState(0);
    const [doctorsBySpecialty, setDoctorsBySpecialty] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);

    const fetchSpecialties = async () => {
        try {
            const response = await axios.get('http://localhost:8080/specialities', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setSpecialties(response.data);
        } catch (error) {
            console.error('Error fetching specialties:', error);
        }
    };

    const fetchCounts = async () => {
        try {
            const patientsResponse = await axios.get('http://localhost:8080/patient/Count');
            const adminsResponse = await axios.get('http://localhost:8080/user/Count');
            setTotalPatients(patientsResponse.data);
            setTotalAdmins(adminsResponse.data);
        } catch (error) {
            console.error('Error fetching counts:', error);
        }
    };

    const fetchDoctorsBySpecialty = async (specialty) => {
        try {
            const response = await axios.get('http://localhost:8080/specialities/Count', {
                params: { SpecialityName: specialty === 'All' ? '' : specialty },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setDoctorsBySpecialty(response.data);
        } catch (error) {
            console.error('Error fetching doctors by specialty:', error);
        }
    };

    useEffect(() => {
        fetchSpecialties();
        fetchCounts();
    }, []);

    useEffect(() => {
        fetchDoctorsBySpecialty(formData.specialtyName);
    }, [formData.specialtyName]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <Card
                bg="light"
                text="dark"
                style={{ width: '18rem' }}
                className="mb-2"
            >
                <Card.Header style={{ color: 'black' }}>
                    Total Patients
                </Card.Header>
                <Card.Body>
                    <Card.Title>{totalPatients}</Card.Title>
                    <Card.Text>
                        Total number of patients in the system.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card
                bg="secondary"
                text="white"
                style={{ width: '18rem' }}
                className="mb-2"
            >
                <Card.Header style={{ color: 'black' }}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationCustomSpecialty">
                                <Form.Label>Specialty</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="specialtyName"
                                    value={formData.specialtyName}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="All">All</option>
                                    {specialties.map(specialty => (
                                        <option key={specialty.id} value={specialty.specialtyName}>
                                            {specialty.specialtyName}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {backendErrors.specialtyName || 'Please select a valid specialty.'}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </Form>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{doctorsBySpecialty}</Card.Title>
                    <Card.Text>
                        Number of doctors by selected specialty.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card
                bg="dark"
                text="white"
                style={{ width: '18rem' }}
                className="mb-2"
            >
                <Card.Header style={{ color: 'black' }}>
                    Total Administrators
                </Card.Header>
                <Card.Body>
                    <Card.Title>{totalAdmins}</Card.Title>
                    <Card.Text>
                        Total number of administrators in the system.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Cards;
