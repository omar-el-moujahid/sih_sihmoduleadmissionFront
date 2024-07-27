import React, { useState, useEffect, useRef } from 'react';
import '../../../Style/CustomCard.css';
import { Col, InputGroup, Navbar, Row } from 'react-bootstrap';
import PaginationComponent from './../Pagination';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AddDoctor from './AddDoctor';

function DoctorCard(props) {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalepage, setTotalepage] = useState(0);
    const [specialty, setSpecialty] = useState('all');
    const [specialties, setSpecialties] = useState([]);
    const searchWord = useRef();
    const [errorsBackend, setErrorsBackend] = useState('');
    const [customError, setCustomError] = useState('');
    const [message, setMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [errorsearch, seterrorsearch] = useState(false);

    const fetchDoctors = async () => {
        seterrorsearch(false);
        setCustomError('');
        setErrorsBackend('');
        try {
            const response = await axios.get(`http://localhost:8080/doctor/getAll/${page}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setDoctors(response?.data?.content);
            setTotalepage(response?.data?.totalPages);
            setLoading(false);
            console.log(response?.data.content);
        } catch (error) {
            console.error("There was an error fetching the doctors!", error);
            setLoading(false);
        }
    };

    const fetchDoctorsBySpecialty = async () => {
        seterrorsearch(false);
        setLoading(true);
        console.log(specialty);
        try {
            const response = await axios.get(`http://localhost:8080/doctor/getAllBySpeciality`, {
                params: {
                    page: page,
                    specialityName: specialty
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setDoctors(response?.data?.content);
            setTotalepage(response?.data?.totalPages);
            setLoading(false);
        } catch (error) {
            console.error("There was an error fetching the doctors!", error);
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
            console.log(response?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDoctors();
        fetchSpecialties();
    }, []);

    useEffect(() => {
        if (specialty === 'all') {
            fetchDoctors();
        } else {
            fetchDoctorsBySpecialty();
        }
    }, [page, specialty]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setCustomError('');
        setErrorsBackend('');
        setPage(0);
        setLoading(true);
        seterrorsearch(false);
        try {
            const response = await axios.get(`http://localhost:8080/doctor/getDoctorBycIN/${searchWord.current.value}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setDoctors(response?.data?.content);
            setTotalepage(response?.data?.totalPages);
            setLoading(false);
            seterrorsearch(false);
        } catch (error) {
            setLoading(false);
            seterrorsearch(true);
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                if (errorData.type === "validation") {
                    setErrorsBackend(errorData.errors || {});
                } else if (errorData.type === "custom") {
                    setCustomError(errorData.message);
                }
            } else {
                console.error("Error searching for doctor:", error);
            }
        }
    };

    const currentPage = (page) => {
        setPage(page - 1);
    };

    const handleFilter = (specialtye) => {
        setSpecialty(specialtye);
        setPage(0);  // Reset page to 0 when specialty changes
        console.log(specialtye);
    };

    const handleDelete = async (cin) => {
        setLoading(true);
        setShowNotification(false);
        console.log(cin)
        try {
            const response = await axios.delete(`http://localhost:8080/doctor/DeleteDoctor/${cin}`, null, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage(response.data);
            setShowNotification(true);
            fetchDoctors();
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                if (errorData.type === "custom") {
                    setCustomError(errorData.message);
                    console.error("Error deleting doctor:", errorData.message);

                }
            } else {
                console.error("Error deleting doctor:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="card-container">
                <div className="card-header">
                    {showNotification ? <div className="notification">{message}</div> : ""}
                    <Navbar className="bg-body-tertiary justify-content-between">
                        <Form inline>
                            <InputGroup>
                                <InputGroup.Text>Filter by Specialty:</InputGroup.Text>
                                <Form.Control as="select" onChange={(e) => handleFilter(e.target.value)}>
                                    <option value="all" key={0}>All Specialties</option>
                                    {specialties.map((specialty, index) => (
                                        <option key={specialty.id} value={specialty.specialtyName}>{specialty.specialtyName}</option>
                                    ))}
                                </Form.Control>
                            </InputGroup>
                        </Form>
                        <Form inline>
                            <Row>
                                <Col xs="auto">
                                    <Form.Control
                                        type="text"
                                        placeholder="Search by CIN"
                                        className="mr-sm-2"
                                        ref={searchWord}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button type="submit" onClick={handleSearch}>Submit</Button>
                                </Col>
                            </Row>
                            {errorsBackend || customError ? <p className={'text-danger'}>{errorsBackend} {customError}</p> : ""}
                            {errorsearch ? <p className={'text-danger'}>{"Valid CIN Required"}</p> : ""}
                        </Form>
                    </Navbar>
                </div>
                <div className="card-body">
                    {loading ? (
                        <p>Loading...</p>
                    ) : doctors.length === 0 ? (
                        <p>No doctors found.</p>
                    ) : (
                        <table className={'table table-hover table-dark'}>
                            <thead className={'table table-primary'}>
                            <tr>
                                <th>CIN</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Specialty</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {doctors.map(doctor => (
                                <tr key={doctor.id}>
                                    <td>{doctor.cne}</td>
                                    <td>{doctor.lastname} {doctor.firstname}</td>
                                    <td>{doctor.mail}</td>
                                    <td>{doctor.specialtyDTO}</td>
                                    <td>
                                        <Button variant="danger" className="m-1" onClick={() => handleDelete(doctor.cne)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="card-footer">
                    <PaginationComponent index={currentPage} pages={totalepage} />
                </div>
            </div>
            <div className={"container-fluid "}>
                <div className="row my-5">
                    <div className="col-md-12">
                        <div className="special-heading-Medicale-hisriry ">
                            <h5 className={'ms-2'}> Add Doctor
                            </h5>
                        </div>
                    </div>
                </div>
                <AddDoctor />
            </div>
        </div>
    );
}

export default DoctorCard;
