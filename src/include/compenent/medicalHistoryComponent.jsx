import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Style/medicalHistoryComponent.css'

const MedicalHistoryComponent = ({ user }) => {
    const [medicalHistories, setMedicalHistories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const displayMedicalHistory = async () => {
        setError(null)
        try {
            const response = await axios.get(`http://localhost:8080/chu/patient/medical-histoey/${user.cne}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMedicalHistories(response.data);
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'An error occurred while fetching data.');
                console.log(error.response.data);
            } else {
                setError('An unexpected error occurred, please try again later.');
            }
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        displayMedicalHistory();
        console.log(medicalHistories, "medicale")
    }, [user.cne]); // Dependency array ensures the effect runs when user.cne changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {medicalHistories.length > 0 ? (
                <>
                    {medicalHistories.map((history, index) => (
                        <div className={"row ms-1 me-1"} key={index}>
                            <div className={"col-lg-12"}>
                                <div className="support-box">
                                    <h5 className="disease-title">Disease: {history.thedisease} {new Date(history.date).toLocaleDateString()}</h5>
                                    <p className="text-body description">Description: {history.description}.</p>
                                    <p className="card-text medicine">Medicine: {history.medicine}</p>
                                    <p className="card-text notes">{history.notes != null ? `Notes: ${history.notes}` : ""}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <p>No medical history found for this patient.</p>
            )}
        </div>
    );
};

export default MedicalHistoryComponent;
