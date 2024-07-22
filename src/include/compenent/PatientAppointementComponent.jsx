import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import '../Style/medicalHistoryComponent.css'
const MedicalHistoryComponent = ({ user }) => {
    const [appointement, setAppointement] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const idappoimtement=useRef();
    const dispalymedicalehistory = async () => {
        setError(null)
        try {
            const response = await axios.get(`http://localhost:8080/chu/patient/appointment/${user.cne}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setAppointement(response.data);
            console.log(response.data);
        }
        catch (error){
            if (error.response) {
                setError(error.response );
                console.log(error.response.data);
            } else {
                setError('An unexpected error occurred repate later .');
            }
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    };

    const handelcancel = async (id)=>{
        try {
            await axios.delete(`http://localhost:8080/chu/patient/deleteappointment/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setAppointement((prevAppointments) => prevAppointments.filter((appointment) => appointment.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        dispalymedicalehistory();
        console.log(appointement,"medicale")
    }, [user.cne]); // Dependency array ensures the effect runs when user.cne changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message || error}</p>;

    return (
        <div className={"container"}>
            {appointement.length > 0 ? (
                    <table className={'table mt-4'}>
                        <thead className={'table-primary'}>
                        <tr>
                            <th>Date of Appointement</th>
                            <th> Speciality</th>
                            <th> Operation</th>
                        </tr>
                        </thead>
                        <tbody>
                        {appointement.map((appointemnt, index) => (
                            <tr key={index}>
                                <td>{appointemnt.dateofRDV}</td>
                                <td>{appointemnt.specialtyDTO}</td>
                                <td id={appointemnt.id} ref={idappoimtement} >
                                    <button className={"btn btn-danger"} onClick={() => handelcancel(appointemnt.id)}  > Cansel Appointement </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )
                :
                (
                    <p>No medical history found for this patient.</p>
                )
            }


        </div>
    )
        ;
};

export default MedicalHistoryComponent;
