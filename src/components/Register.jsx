// pages/register.js
import React, { useState } from 'react';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [topSize, setTopSize] = useState('');
  const [bottomSize, setBottomSize] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({
        userName,
        email,
        password,
        name,
        topSize,
        bottomSize,
        gender,
        role,
      });
      const token = response.token;
      localStorage.setItem('token', token);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <br />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Top Size:</label>
        <select value={topSize} onChange={(e) => setTopSize(e.target.value)}>
          <option value={enums.sizes.SMALL}>SMALL</option>
          <option value={enums.sizes.MEDIUM}>MEDIUM</option>
          <option value={enums.sizes.LARGE}>LARGE</option>
        </select>
        <br />
        <label>Bottom Size:</label>
        <select value={bottomSize} onChange={(e) => setBottomSize(e.target.value)}>
          <option value={enums.sizes.SMALL}>SMALL</option>
          <option value={enums.sizes.MEDIUM}>MEDIUM</option>
          <option value={enums.sizes.LARGE}>LARGE</option>
        </select>
        <br />
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value={enums.gender.MALE}>MALE</option>
          <option value={enums.gender.FEMALE}>FEMALE</option>
        </select>
        <br />
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value={enums.role.USER}>USER</option>
          <option value={enums.role.ADMIN}>ADMIN</option>
        </select>
        <br />
        <button type="submit">Register</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
};

export default Register;