import { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'

function AddToTheMedicaleHistoryModal({appointment, medcine}) {
    const [show, setShow] = useState(false);
    const description = useRef(null);
    const thedisease = useRef(null);
    const medicine = useRef(null);
    const notes = useRef(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = async () => {
        console.log("date" ,appointment.dateofRDV ,
            "doctorcne" , medcine,
            "patientcne" , appointment.cne ,
            "description" , description.current.value ,
            "thedisease" , thedisease.current.value ,
            "medicine" , medicine.current.value,
            "notes" , notes.current.value)
        try {
            const response=await axios.post("http://localhost:8080/chu/doctor/AddMedical-history",{
                    "date": appointment.dateofRDV ,
                    "doctorcne": medcine,
                    "patientcne": appointment.cne ,
                    "description": description.current.value ,
                    "thedisease": thedisease.current.value,
                    "medicine": medicine.current.value,
                    "notes": notes.current.value
                } ,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            setShow(false);
        }
        catch (error){
            console.log(error)
        }
    }
    useEffect(() => {
        console.log(appointment,medcine)
    }, [])
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                ADD
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>The disease
                            </Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus

                                ref={thedisease}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label> The disease Description </Form.Label>
                            <Form.Control as="textarea" rows={2} ref={description} />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label> The Medicine Propose </Form.Label>
                            <Form.Control as="textarea" rows={2} ref={medicine} />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label> Notes </Form.Label>
                            <Form.Control as="textarea" rows={2} placeholder={"add something if need "}  ref={notes} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddToTheMedicaleHistoryModal;