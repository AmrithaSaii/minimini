import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserDashboard.css";

const UserDashboard = () => {
  

  return (
    <div className="dashboard">
      <h2>Welcome!</h2>
      <div className="user-details">
        <p><strong>Email:</strong> </p>
        <p><strong>Account Type:</strong> </p>
        <p><strong>Balance:</strong> </p>
        {/* Add more user details as needed */}
      </div>
    </div>
  );
};

export default UserDashboard;
