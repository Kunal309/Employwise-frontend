import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

    // Update user in localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = storedUsers.map(user =>
      user.id === parseInt(id)
        ? { ...user, first_name: firstName, last_name: lastName, email }
        : user
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save to localStorage

    navigate('/users'); // Navigate back to user list
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>First Name: </label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div>
          <label>Last Name: </label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div>
          <label>Email: </label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
