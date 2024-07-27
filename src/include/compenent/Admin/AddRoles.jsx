import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function AddToTheMedicaleHistoryModal({ cin }) {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorsBackend, setErrorsBackend] = useState('');
    const [customError, setCustomError] = useState('');
    const roleRef = useRef(null);

    const handleClose = () => {
        setShow(false);
        setErrorsBackend('');
        setCustomError('');
    };

    const handleShow = () => setShow(true);

    const handleSave = async () => {
        console.log("he",cin)
        setLoading(true);
        const selectedRole = roleRef.current.value;
        try {
            const response = await axios.post(
                `http://localhost:8080/user/AddRoleToUser?cin=${encodeURIComponent(cin)}&RoleName=${encodeURIComponent(selectedRole)}`,
                null,  // Sending null as the body since we are using URL parameters
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Role added successfully:', response.data);
            handleClose();
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                if (errorData.type === "validation") {
                    setErrorsBackend(errorData.errors || {});
                    console.log(errorData.errors);
                } else if (errorData.type === "custom") {
                    setCustomError(errorData.message);
                    console.log(errorData.message);
                }
            } else {
                console.error("Error adding role:", error);
            }
        }
    };

    useEffect(() => {
    }, []);

    return (
        <>
            <Button variant="success" className="m-1" onClick={handleShow}>
                Add Role
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Select Role</Form.Label>
                            <Form.Select ref={roleRef}>
                                <option value="ROLE_ADMIN">ADMIN</option>
                                <option value="ROLE_USER">USER</option>
                            </Form.Select>
                            <p className={"text-danger mt-3"}>{errorsBackend || customError}  </p>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={loading}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave} disabled={loading}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddToTheMedicaleHistoryModal;
