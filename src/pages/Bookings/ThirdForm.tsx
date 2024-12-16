import React from 'react';

type Props = {
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
  };
  bookingDetails: {
    date: string;
    time: string;
    persons: string;
    comments: string;
  };
};

const ThirdForm = ({ customer, bookingDetails }: Props) => {
  return (
    <div className="confirmation-container bg-white shadow-lg rounded-lg p-8 max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-teal-600 mb-4">
        Thank You, {customer.first_name}!
      </h2>
      <p className="text-gray-700 mb-6">
        Your booking has been confirmed. Here are your booking details:
      </p>
      <div className="border-t border-gray-200 pt-4">
        <p className="text-gray-800 mb-2">
          <strong className="font-medium text-teal-500">Name:</strong>{' '}
          {customer.first_name} {customer.last_name}
        </p>
        <p className="text-gray-800 mb-2">
          <strong className="font-medium text-teal-500">Email:</strong>{' '}
          {customer.email}
        </p>
        <p className="text-gray-800 mb-2">
          <strong className="font-medium text-teal-500">Phone:</strong>{' '}
          {customer.phone_number}
        </p>
        <p className="text-gray-800 mb-2">
          <strong className="font-medium text-teal-500">Booking Date:</strong>{' '}
          {bookingDetails.date}
        </p>
        <p className="text-gray-800 mb-2">
          <strong className="font-medium text-teal-500">Booking Time:</strong>{' '}
          {bookingDetails.time}
        </p>
        <p className="text-gray-800 mb-2">
          <strong className="font-medium text-teal-500">Persons:</strong>{' '}
          {bookingDetails.persons}
        </p>
        {bookingDetails.comments && (
          <p className="text-gray-800">
            <strong className="font-medium text-teal-500">Comments:</strong>{' '}
            {bookingDetails.comments}
          </p>
        )}
      </div>
      <p className="text-gray-700 mt-6">
        You will receive a confirmation email shortly. Thank you for booking
        with us!
      </p>
    </div>
  );
};

export default ThirdForm;
