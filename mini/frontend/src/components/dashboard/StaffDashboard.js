import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StaffDashboard.css";

const StaffDashboard = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="staff-dashboard">
      <h2>Staff Dashboard</h2>
      <div className="user-list">
        {userData.map((user) => (
          <div key={user.id} className="user-card">
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Account Type:</strong> {user.accountType}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffDashboard;
