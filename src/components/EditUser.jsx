import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditUser.css';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(user => user.id === parseInt(id));

    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
    }
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = storedUsers.map(user =>
      user.id === parseInt(id)
        ? { ...user, first_name: firstName, last_name: lastName, email }
        : user
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    navigate('/users');
  };

  return (
    <div className="edit-container">
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>First Name: </label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Last Name: </label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button className="submit-btn" type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
