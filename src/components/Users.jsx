import React from "react";
import apiClient from "../services/api";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Users = () => {
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('/api/users');
                setUsers(response.data);
            } catch(error) {
                console.error('Error fetching', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar/>
            {users ? (
                <div className="table-box">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin privilege</th>
                            </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.admin_privilege}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>Loading...</div>
            )}
            <Footer/>
        </div>
    );
}

export default Users;