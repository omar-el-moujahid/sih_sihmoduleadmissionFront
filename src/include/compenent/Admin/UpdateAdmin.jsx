import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function UpdateAdmine({ user }) {
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const dateOfBirthRef = useRef();
    const contactRef = useRef();
    const addressRef = useRef();
    const emailRef = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(
                'http://localhost:8080/user/Updateprofil',
                {
                    password: user.password,
                    firstname: firstnameRef.current.value,
                    lastname: lastnameRef.current.value,
                    adress: addressRef.current.value,
                    contact: contactRef.current.value,
                    active: true,
                    gender: user.gender, // Assuming gender doesn't change
                    dateofbirth: dateOfBirthRef.current.value,
                    mail: emailRef.current.value,
                    roleApps: user.roleApps, // Assuming roles don't change
                    cne: user.cne,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setShow(false);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'An error occurred while updating the profile.');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button variant="success" className="my-4" onClick={handleShow}>
                Update
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="First name"
                                defaultValue={user.firstname}
                                ref={firstnameRef}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Last name"
                                defaultValue={user.lastname}
                                ref={lastnameRef}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                defaultValue={user.dateofbirth}
                                ref={dateOfBirthRef}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Contact"
                                defaultValue={user.contact}
                                ref={contactRef}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Address"
                                defaultValue={user.address}
                                ref={addressRef}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                defaultValue={user.mail}
                                ref={emailRef}
                            />
                        </Form.Group>

                        {error && <div className="text-danger">{error}</div>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave} disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateAdmine;
