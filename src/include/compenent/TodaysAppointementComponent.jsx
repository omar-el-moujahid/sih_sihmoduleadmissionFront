import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Style/medicalHistoryComponent.css';

const TodaySAppointment = ({ user }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [errorattend, seterrorattend] = useState(null);
    const [errormissed, setErrormissed] = useState(null);


    const fetchTodaySAppointment = async () => {
        setError(null);
        try {
            const response = await axios.get('http://localhost:8080/chu/doctor/TodaySAppointment', {
                params: {
                    CINDocotor: user.cne,
                    SpecialityName: user.specialtyDTO
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setAppointments(response.data);
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'An error occurred while fetching appointments.');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodaySAppointment();
    }, [user.cne, user.specialtyDTO]);

    const handleAppointmentClick = (appointment) => {
        setSelectedAppointment(appointment);
        console.log(appointment)
    };

    const handleStatusUpdate = (appointmentId, status) => {
        console.log(`Update status of appointment ${appointmentId} to ${status}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleAttend = async (index) => {
        console.log(index);
        setErrormissed(null)
       try {
           const response= await axios.post(`http://localhost:8080/chu/planificaion/increment/${index}`,null,{
               headers:{
                   'Content-Type': 'application/json'
               }
           })
           fetchTodaySAppointment()
           console.log(response)
       }
       catch (error){
           if (error.response && error.response.data) {
               const errorData = error.response.data;
               if (errorData.type === "validation") {
                   setErrormissed(errorData.errors || {});
                   console.log(errorData.errors )
               } else if (errorData.type === "custom") {
                   setErrormissed(errorData.message);
                   console.log(errorData.message )
               }
           } else {
               console.error("Error adding patient:", error);
           }
       }
    }
    const handleMissed = async (index) => {
        console.log(index);
        seterrorattend(null)
       try {
           const response= await axios.post(`http://localhost:8080/chu/planificaion/desincrement/${index}`,null,{
               headers:{
                   'Content-Type': 'application/json'
               }
           })
           fetchTodaySAppointment()
           console.log(response)

       }
       catch (error){
           if (error.response && error.response.data) {
               const errorData = error.response.data;
               if (errorData.type === "validation") {
                   seterrorattend(errorData.errors || {});
                   console.log(errorData.errors )
               } else if (errorData.type === "custom") {
                   seterrorattend(errorData.message);
                   console.log(errorData.message )
               }
           } else {
               console.error("Error adding patient:", error);
           }
       }
    }

    return (
        <div className="container">
            {appointments.length > 0 ? (
                <table className="table mt-4">
                    <thead className="table-primary">
                    <tr>
                        <th>CIN</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Operation</th>
                        <th>medicale history</th>
                    </tr>
                    </thead>
                    <tbody>
                    {appointments.map((appointment, index) => (
                        <tr key={index} onClick={() => handleAppointmentClick(appointment)}>
                            <td>{appointment.cne}</td>
                            <td>{appointment.patientfirstname}</td>
                            <td>{appointment.patientlastname}</td>
                            <td id={appointment.cne}>

                                {
                                    errorattend || errorattend ?
                                        <>
                                            <p className={'text-danger text-center'}> erorr product </p>
                                        </>
                                        :
                                        <>
                                            <button
                                                className="btn btn-danger me-2"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleMissed(appointment.id)
                                                }}
                                            >
                                                Missed
                                            </button>
                                            <button
                                                className="btn btn-success ms-2"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleAttend(appointment.id)
                                                }}
                                            >
                                                Attended
                                            </button>
                                        </>

                                }
                            </td>
                            <td id={appointment.cne}>

                                <button
                                    className="btn btn-primary me-2"
                                >
                                    View
                                </button>
                                <button
                                    className="btn btn-primary me-2"
                                >
                                    Add
                                </button>


                            </td>
                        </tr>

                    ))}
                    </tbody>
                </table>
            ) : (
                <p className={'text-center'}>No appointments found for today.</p>
            )}

            {selectedAppointment && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>Appointment Details</h4>
                        <p><strong>CIN:</strong> {selectedAppointment.cne}</p>
                        <p><strong>First Name:</strong> {selectedAppointment.patientfirstname}</p>
                        <p><strong>Last Name:</strong> {selectedAppointment.patientlastname}</p>
                        <button onClick={() => setSelectedAppointment(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodaySAppointment;
