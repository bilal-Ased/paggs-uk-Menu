import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/">Go back to the home page</Link>
    </div>
  );
};

export default NotFound;
