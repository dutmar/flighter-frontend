import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import apiClient from "../services/api";
import '../styles/tickets.css'

const Tickets = () => {
    const[tickets, setTickets] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('/api/tickets');
                setTickets(response.data);
            } catch(error) {
                console.error('Error fetching', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar/>

            {tickets ? (
                <div className="table-box">
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Origin</th>
                                <th>Destination</th>
                            </tr>
                        </thead>
                        <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td>{ticket.email}</td>
                                <td>{ticket.origin}</td>
                                <td>{ticket.destination}</td>
                            </tr>
                            // <div key={ticket.id}>{ticket.email}</div>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>Loading...</div>
            )}

            <Footer/>
        </div>
    )
}

export default Tickets;