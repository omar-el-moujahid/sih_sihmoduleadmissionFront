import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MedicalHistoryComponent from './medicalHistoryComponent';

function VieMedicaleHistoryModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Vie Patient History
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MedicalHistoryComponent user={props.user} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default VieMedicaleHistoryModal;
