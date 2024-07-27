import React, { useState, useEffect, useRef } from 'react';
import '../../Style/CustomCard.css';
import { Col, InputGroup, Navbar, Row } from 'react-bootstrap';
import PaginationComponent from './Pagination';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import VieMedicaleHistoryModal from '../VieMedicaleHistoryModal';
import AddToTheMedicaleHistoryModal from '../AddToTheMedicaleHistoryModal';
import AddRoles from './AddRoles';
import RemoveRole from './RemoveRole';
import Suspender from './Suspender';
import AddAdmin from './AddAdmin'

function CustomCard(props) {
    // State to store users and loading status
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalepage, setTotalepage] = useState(0);
    const [filter, setFilter] = useState();
    const searchWord = useRef();
    const [errorsBackend, setErrorsBackend] = useState('');
    const [customError, setCustomError] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [user, setUser] = useState();
    const [message, setMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const fetchUsers = async () => {
        setCustomError('');
        setErrorsBackend('');
        try {
            const response = await axios.get(`http://localhost:8080/user/AllUsers/${page}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setUsers(response?.data?.content);
            setTotalepage(response?.data?.totalPages);
            setLoading(false);
        } catch (error) {
            console.error("There was an error fetching the users!", error);
            setLoading(false);
        }
    };

    const fetchUsersByFiltering = async () => {
        setPage(0);
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/user/AllUsersByRole/pagination`, {
                params: {
                    page: page,
                    rolesApp: filter
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setUsers(response?.data?.content);
            setTotalepage(response?.data?.totalPages);
            setLoading(false);
        } catch (error) {
            console.error("There was an error fetching the users!", error);
            setLoading(false);
        }
    };

    // Fetch users when the component mounts
    useEffect(() => {
        fetchUsers();
    }, [page]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setCustomError('');
        setErrorsBackend('');
        setPage(0);
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/user/AllUsersByCIN`, {
                params: {
                    page: page,
                    CIN: searchWord.current.value
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setUsers(response?.data?.content);
            setTotalepage(response?.data?.totalPages);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                if (errorData.type === "validation") {
                    setErrorsBackend(errorData.errors || {});
                } else if (errorData.type === "custom") {
                    setCustomError(errorData.message);
                }
            } else {
                console.error("Error adding patient:", error);
            }
        }
    };

    const currentPage = (page) => {
        setPage(page - 1);
    };

    const handleFilter = (filter) => {
        setFilter(filter);
        fetchUsersByFiltering();
    };

    const handleSuspende = async (cin) => {
        setLoading(true);
        setShowNotification(false);
        try {
            const response = await axios.post(`http://localhost:8080/user/Suspender?cin=${encodeURIComponent(cin)}`, null, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage(response.data);
            setShowNotification(true);
            fetchUsers();
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                if (errorData.type === "custom") {
                    setCustomError(errorData.message);
                }
            } else {
                console.error("Error suspending user:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleActivate = async (cin) => {
        setLoading(true);
        setShowNotification(false);
        try {
            const response = await axios.post(`http://localhost:8080/user/Activer?cin=${encodeURIComponent(cin)}`, null, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage(response.data);
            setShowNotification(true);
            fetchUsers();
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                if (errorData.type === "custom") {
                    setCustomError(errorData.message);
                }
            } else {
                console.error("Error activating user:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (cin) => {
        setLoading(true);
        setShowNotification(false);
        try {
            const response = await axios.delete(`http://localhost:8080/user/Delete?cin=${encodeURIComponent(cin)}`, null, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage(response.data);
            setShowNotification(true);
            fetchUsers();
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                if (errorData.type === "custom") {
                    setCustomError(errorData.message);
                }
            } else {
                console.error("Error activating user:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
        <div className="card-container">
            <div className="card-header">
                {showNotification ? <Suspender message={message}></Suspender> : ""}
                <Navbar className="bg-body-tertiary justify-content-between">
                    <Form inline>
                        <InputGroup>
                            <InputGroup.Text>Filter:</InputGroup.Text>
                            <button className={'mx-2 btn btn-primary'} onClick={(e) => {
                                e.preventDefault();
                                fetchUsers();
                            }}>ALL Staff</button>
                            <button className={'mx-2 btn btn-primary'} onClick={(e) => {
                                e.preventDefault();
                                handleFilter('ROLE_USER');
                            }}>Users</button>
                            <button className={'mx-2 btn btn-primary'} onClick={(e) => {
                                e.preventDefault();
                                handleFilter('ROLE_ADMIN');
                            }}>Admins</button>
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
                            <th>CIN</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.cne}</td>
                                <td>{user.lastname} {user.firstname}</td>
                                <td>{user.mail}</td>
                                <td>
                                    <AddRoles cin={user.cne} />
                                    {user.active ?
                                        <Button variant="warning" className="m-1" onClick={() => handleSuspende(user.cne)}>
                                            Suspend Activation
                                        </Button> :
                                        <Button variant="warning" className="m-1" onClick={() => handleActivate(user.cne)}>
                                            Activate
                                        </Button>
                                    }
                                    <RemoveRole cin={user.cne} active={user.active} />
                                    <Button variant="danger" className="m-1" onClick={() => handleDelete(user.cne)}>
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
                            <h5 className={'ms-2'}> Add ADMINISTRATEUR
                            </h5>
                        </div>
                    </div>
                </div>
                <AddAdmin ></AddAdmin>
            </div>
        </div>

    );
}

export default CustomCard;
