import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
    const apiUsers = response.data.data;


    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];


    const mergedUsers = apiUsers.map(user => {
      const storedUser = storedUsers.find(stored => stored.id === user.id);
      return storedUser || user;
    });


    const allUsers = [...storedUsers.filter(stored => !apiUsers.some(user => user.id === stored.id)), ...mergedUsers];
    localStorage.setItem('users', JSON.stringify(allUsers));

    setUsers(mergedUsers);
    setTotalPages(response.data.total_pages);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);


    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedStoredUsers = storedUsers.filter(user => user.id !== id);
    localStorage.setItem('users', JSON.stringify(updatedStoredUsers));
  };

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };


  const filteredUsers = users.filter(user => {
    if (filterOption === 'first_name') {
      return user.first_name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (filterOption === 'last_name') {
      return user.last_name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (filterOption === 'email') {
      return user.email.toLowerCase().includes(searchQuery.toLowerCase());
    } else {

      return `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  return (
    <div>
      <div className="header">
        <h2>User List</h2>

        <div className="filter-container">
          <select
            className="filter-dropdown"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option value="all">All</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="email">Email</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />


        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user.id}>
                <td><img src={user.avatar} alt={`${user.first_name}`} width="50" /></td>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEdit(user.id)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default UserList;
