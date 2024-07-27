import React, { useState, useEffect } from 'react';
import '../../../Style/CustomCard.css';
import { InputGroup, Navbar } from 'react-bootstrap';
import PaginationComponent from './../Pagination';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AddPlaning from './AddPlaning'

function PlanningCard() {
    const [planifications, setPlanifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [specialty, setSpecialty] = useState('all');
    const [specialties, setSpecialties] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [newPlanification, setNewPlanification] = useState({
        date: '',
        startAt: '',
        endAt: '',
        capacity: 0,
        specialty: ''
    });
    const [message, setMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [customError, setCustomError] = useState('');

    const fetchPlanifications = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/chu/planificaion/getAll`, {
                params: {
                    page,
                    speciality: specialty !== 'all' ? specialty : null,
                    startDate: startDate || null,
                    endDate: endDate || null,
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setPlanifications(response?.data?.content);
            setTotalPages(response?.data?.totalPages);
            setLoading(false);
        } catch (error) {
            console.error("There was an error fetching the planifications!", error);
            setLoading(false);
        }
    };

    const fetchSpecialties = async () => {
        try {
            const response = await axios.get("http://localhost:8080/specialities", {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setSpecialties(response?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPlanifications();
        fetchSpecialties();
    }, []);

    useEffect(() => {
        fetchPlanifications();
    }, [page, specialty, startDate, endDate]);

    const handleFilter = () => {
        setPage(0);
        fetchPlanifications();
    };

    const handleAddPlanification = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/planification/add", newPlanification, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            fetchPlanifications();
        } catch (error) {
            console.error("There was an error adding the planification!", error);
        }
    };

    const currentPage = (page) => {
        setPage(page - 1);
    };
    const handleDelete = async (id) => {
        setLoading(true);
        setShowNotification(false);
        try {
            const response = await axios.delete(`http://localhost:8080/planification/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage(response.data);
            setShowNotification(true);
            fetchPlanifications();
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                if (errorData.type === "custom") {
                    setCustomError(errorData.message);
                    console.error("Error deleting planification:", errorData.message);
                }
            } else {
                console.error("Error deleting planification:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    const isPastDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time portion for comparison
        return date < today;
    };

    return (
        <div>
            <div className="card-container">
                <div className="card-header">
                    <Navbar className="bg-body-tertiary justify-content-between">
                        <Form inline>
                            <InputGroup>
                                <InputGroup.Text>Filter by Specialty:</InputGroup.Text>
                                <Form.Control as="select" onChange={(e) => setSpecialty(e.target.value)}>
                                    <option value="all" key={0}>All Specialties</option>
                                    {specialties.map((specialty) => (
                                        <option key={specialty.id} value={specialty.specialtyName}>{specialty.specialtyName}</option>
                                    ))}
                                </Form.Control>
                            </InputGroup>
                            <InputGroup className={"my-2"}>
                                <InputGroup.Text>Start Date:</InputGroup.Text>
                                <Form.Control type="date" onChange={(e) => setStartDate(e.target.value)} />
                                <InputGroup.Text>End Date:</InputGroup.Text>
                                <Form.Control type="date" onChange={(e) => setEndDate(e.target.value)} />
                            </InputGroup>
                            <Button onClick={handleFilter}>Filter</Button>
                        </Form>
                    </Navbar>
                </div>
                <div className="card-body">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <table className={'table table-hover table-dark'}>
                            <thead className={'table table-primary'}>
                            <tr>
                                <th>Date</th>
                                <th>Specialty</th>
                                <th>Time</th>
                                <th>Capacity</th>
                                <th>Current Capacity</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {planifications.map(planification => (
                                <tr key={planification.id}>
                                    <td>{planification.date}</td>
                                    <td>{planification.specialityName}</td>
                                    <td>{planification.startAt}/{planification.endAt}</td>
                                    <td>{planification.capacity}</td>
                                    <td>{planification.currentcapacity}</td>
                                    <td>
                                        {!isPastDate(planification.date) && (
                                            <Button variant="danger" className="m-1"
                                                    onClick={() => handleDelete(planification.id)}>
                                                Delete
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="card-footer">
                    <PaginationComponent index={currentPage} pages={totalPages}/>
                </div>
            </div>
            <div className={'container-fluid'}>
                <div className="row my-5">
                    <div className="col-md-12">
                        <div className="special-heading-Medicale-hisriry">
                            <h5 className={'ms-2'}>Add Planification</h5>
                        </div>
                    </div>
                </div>
                <AddPlaning/>
                {/*<Form onSubmit={handleAddPlanification}>*/}
                {/*    <Form.Group>*/}
                {/*        <Form.Label>Date</Form.Label>*/}
                {/*        <Form.Control type="date" value={newPlanification.date} onChange={(e) => setNewPlanification({...newPlanification, date: e.target.value})} />*/}
                {/*    </Form.Group>*/}
                {/*    <Form.Group>*/}
                {/*        <Form.Label>Start Time</Form.Label>*/}
                {/*        <Form.Control type="time" value={newPlanification.startAt} onChange={(e) => setNewPlanification({...newPlanification, startAt: e.target.value})} />*/}
                {/*    </Form.Group>*/}
                {/*    <Form.Group>*/}
                {/*        <Form.Label>End Time</Form.Label>*/}
                {/*        <Form.Control type="time" value={newPlanification.endAt} onChange={(e) => setNewPlanification({...newPlanification, endAt: e.target.value})} />*/}
                {/*    </Form.Group>*/}
                {/*    <Form.Group>*/}
                {/*        <Form.Label>Capacity</Form.Label>*/}
                {/*        <Form.Control type="number" value={newPlanification.capacity} onChange={(e) => setNewPlanification({...newPlanification, capacity: e.target.value})} />*/}
                {/*    </Form.Group>*/}
                {/*    <Form.Group>*/}
                {/*        <Form.Label>Specialty</Form.Label>*/}
                {/*        <Form.Control as="select" value={newPlanification.specialty} onChange={(e) => setNewPlanification({...newPlanification, specialty: e.target.value})}>*/}
                {/*            {specialties.map((specialty) => (*/}
                {/*                <option key={specialty.id} value={specialty.specialtyName}>{specialty.specialtyName}</option>*/}
                {/*            ))}*/}
                {/*        </Form.Control>*/}
                {/*    </Form.Group>*/}
                {/*    <Button type="submit">Add Planification</Button>*/}
                {/*</Form>*/}
            </div>
        </div>
    );
}

export default PlanningCard;
