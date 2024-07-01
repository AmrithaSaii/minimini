import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    accountType: "savings",
    signature: null,
  });

  const [errors, setErrors] = useState({});
  const navigate= useNavigate();

  const handleChange = (e) => {
    const{name,value,files}=e.target
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, 
    });
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.firstName) tempErrors.firstName = "First Name is required";
    if (!formData.lastName) tempErrors.lastName = "Last Name is required";
    if (!formData.username) {
      tempErrors.username = "Username is required";
    } else if (!/^#user\d{5}$/.test(formData.username)) {
      tempErrors.username = "Username must start with #user followed by a unique 5-digit number";
    }
    if (!formData.dob) tempErrors.dob = "Date of Birth is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (!/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/.test(formData.password)) {
      tempErrors.password = "Password must be at least 6 characters and contain both letters and numbers";
    }
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.phoneNumber) tempErrors.phoneNumber = "Phone Number is required";
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.signature) tempErrors.signature = "Signature is required";

    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tempErrors = validate();
    if (Object.keys(tempErrors).length === 0) {
      try {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          formDataToSend.append(key, formData[key]);
        });

    await axios.post("http://localhost:8081/UserPage",formDataToSend,{
      headers: {
        'Content-Type': 'multipart/form-data',

      }
    });
    navigate('/UserPage');
  } catch (err) {
    console.log(err);
  }
} else {
  setErrors(tempErrors);
}
};
    
  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2>Register for an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <span className="error">{errors.phoneNumber}</span>
            )}
          </div>
          <div className="form-group">
            <label>User ID</label>
            <input
              type="text"
              name="username"
              placeholder="Create a unique ID (e.g., #user12345)"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
          <div className="form-group">
            <label>Account Type</label>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
            >
              <option value="savings">Savings</option>
              <option value="checking">Checking</option>
              <option value="business">Business</option>
            </select>
          </div>
          <div className="form-group">
            <label>Signature</label>
            <input
              type="file"
              accept="image/*"
              name="signature"
              onChange={handleChange}
            />
            {errors.signature && (
              <span className="error">{errors.signature}</span>
            )}
          </div>
          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
