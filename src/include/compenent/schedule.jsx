import React, { useState, useEffect } from 'react';
import '../Style/schedule.css';
import axios from 'axios';

function Schedule({ cne ,departement}) {
    const [schedule, setSchedule] = useState([]);
    const [activeTab, setActiveTab] = useState('Today');
    const [days, setDays] = useState(0);

    const fetchSchedule = async () => {
        try {
            const response = await axios.get('http://localhost:8080/chu/planificaion/doctor', {
                params: {
                    cne: cne,
                    intel: days
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setSchedule(response?.data || []);
        } catch (error) {
            console.error('Error fetching schedule:', error);
        }
    };

    useEffect(() => {
        fetchSchedule();
    }, [activeTab, days]);

    const handleTabClick = (tab, days) => {
        setActiveTab(tab);
        setDays(days);
    };

    return (
        <div className="custom-card">
            <div className="header">
                <h5 className="custom-card-header">Schedule</h5>
                <div className="custom-card-nav">
                    <h5
                        className={`custom-card-nav-item ${activeTab === 'Today' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Today', 0)}
                    >
                        Today
                    </h5>
                    <h5
                        className={`custom-card-nav-item ${activeTab === 'Week' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Week', 7)}
                    >
                        Week
                    </h5>
                    <h5
                        className={`custom-card-nav-item ${activeTab === 'Month' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Month', 30)}
                    >
                        Month
                    </h5>
                </div>
            </div>
            <div className="custom-card-body">
                <div className="container mt-5">
                    <table className="table">
                        <thead className="table-info">
                        <tr>
                            <th className="text-center">Date</th>
                            <th className="text-center">Details</th>
                            <th className="text-center">Hours Shift</th>
                        </tr>
                        </thead>
                        <tbody>
                        {schedule.length > 0 ? (
                            schedule.map((item, index) => (
                                <tr key={index}>
                                    <td className="text-center">{item.date}</td>
                                    <td className="text-center">You have chift in the {departement} departement </td>
                                    <td className="text-center">{item.startAt}/{item.endAt}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="text-center" colSpan="3">No schedule available</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Schedule;
