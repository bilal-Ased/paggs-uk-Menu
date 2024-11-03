import React, { useEffect, useState } from 'react';
import './styles.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/customers-list')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCustomers(data);
      })
      .finally()
      .catch();
  }, []);

  console.log(customers);

  return (
    <div>
      v1
      <table className="my-fancy-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            return (
              <tr>
                <td>{customer.id}</td>
                <td>{customer.first_name}</td>
                <td>{customer.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
