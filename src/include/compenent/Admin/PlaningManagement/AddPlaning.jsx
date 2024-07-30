import React, { useState, useEffect } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import axios from 'axios';
import Suspender from '../Suspender'; // Assumed component for showing messages

function AddPlanificationForm() {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        startAt: '',
        endAt: '',
        capacity: 0,
        specialtyName: ''
    });
    const [backendErrors, setBackendErrors] = useState({});
    const [customError, setCustomError] = useState('');
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [specialties, setSpecialties] = useState([]);
    const [showcusyom,setshowcusyom]=useState(false)
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

    useEffect(() => {
        fetchSpecialties();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setBackendErrors({});
        setCustomError('');
        setShowMessage(false);
        setMessage('');

        // Ensure the date is in the correct format
        const formattedDate = new Date(formData.date).toISOString().split('T')[0];
        const formattedStartTime = formData.startAt;
        const formattedEndTime = formData.endAt;

        // Create the payload for the request
        const payload = {
            date: formattedDate,
            startAt: formattedStartTime,
            endAt: formattedEndTime,
            capacity: formData.capacity,
            specialityName: formData.specialtyName
        };

        console.log('Submitting form data:', payload); // Log the payload to ensure it's correct
        setshowcusyom(false)
        try {
            const response = await axios.post('http://localhost:8080/chu/planificaion/AddPlaning', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage('Planification added successfully.');
            setShowMessage(true);
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                console.error('Backend error details:', errorData); // Log the error details

                if (errorData.type === "validation") {
                    setBackendErrors(errorData.errors || {});
                    console.error(errorData.errors);
                    setshowcusyom(true)
                } else if (errorData.type === 'custom') {
                    setCustomError(errorData.message);

                }
            } else {
                console.error('Error adding planification:', error);
            }
            setValidated(true);
        }
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
                <Form.Group as={Col} md="6" controlId="validationCustomDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {'Please provide a valid date.'}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustomStartTime">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                        required
                        type="time"
                        name="startAt"
                        value={formData.startAt}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {'Please provide a valid start time.'}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustomEndTime">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                        required
                        type="time"
                        name="endAt"
                        value={formData.endAt}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {'Please provide a valid end time.'}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustomCapacity">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        isInvalid={!!backendErrors.capacity}
                    />
                    <Form.Control.Feedback type="invalid">
                        {backendErrors.capacity || 'Please provide a valid capacity.'}
                    </Form.Control.Feedback>

                </Form.Group>
            </Row>
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
                        <option value="">Select Specialty</option>
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
            <Button type="submit">Submit form</Button>
        </Form>
    );
}

export default AddPlanificationForm;
