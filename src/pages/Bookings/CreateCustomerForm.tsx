import { useState } from 'react';

type Props = {
  handleSelectedCustomer: (customer: any) => void;
};

function CreateCustomerForm({ handleSelectedCustomer }: Props) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormChange = (e, target) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, [target]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    const mappedData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_number: formData.phone,
    };

    try {
      const baseUrl = 'https://coral-app-fvdip.ondigitalocean.app/api';
      const response = await fetch(`${baseUrl}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(mappedData),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.message || 'Form submitted successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        });
        handleSelectedCustomer(result?.customer);
      } else if (response.status === 422) {
        const result = await response.json();
        setErrors(result.errors || {});
      } else {
        setErrors({ server: 'An error occurred. Please try again.' });
      }
    } catch (error) {
      setErrors({ server: 'Submission error: ' + error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className=" mx-auto p-8 bg-white  shadow-lg border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">Welcome to Il Pagliaccio</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
          At <span className="font-semibold italic text-gray-900">Il Pagliaccio</span>, we offer a memorable dining experience. Please fill out the form to secure your reservation.
        </p>

        <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200 mb-8">
          <h2 className="text-xl font-medium text-gray-800 mb-4">Important Information:</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Reservations require card details for confirmation.</li>
            <li>
              Cancellations with less than{' '}
              <span className="text-red-500 font-semibold">24 hours’ notice</span> may incur a charge of{' '}
              <span className="font-semibold text-gray-800">£5 per guest</span>.
            </li>
            <li>Terrace seating is subject to availability.</li>
          </ul>
        </div>

        {successMessage && (
          <div className="p-4 mb-6 text-green-700 bg-green-100 rounded-lg">
            {successMessage}
          </div>
        )}
        {errors.server && (
          <div className="p-4 mb-6 text-red-700 bg-red-100 rounded-lg">
            {errors.server}
          </div>
        )}

        <div className="mb-6 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-gray-800 font-semibold">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.firstName}
              onChange={(e) => handleFormChange(e, 'firstName')}
              type="text"
              placeholder="Enter your first name"
              className="w-full rounded border-gray-300 py-3 px-4 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <RenderErrorMessage error={errors.first_name} />
          </div>
          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-gray-800 font-semibold">
              Last Name
            </label>
            <input
              value={formData.lastName}
              onChange={(e) => handleFormChange(e, 'lastName')}
              type="text"
              placeholder="Enter your last name"
              className="w-full rounded border-gray-300 py-3 px-4 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-gray-800 font-semibold">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.email}
              onChange={(e) => handleFormChange(e, 'email')}
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded border-gray-300 py-3 px-4 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <RenderErrorMessage error={errors.email} />
          </div>
          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-gray-800 font-semibold">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.phone}
              onChange={(e) => handleFormChange(e, 'phone')}
              type="text"
              placeholder="Enter your phone number"
              className="w-full rounded border-gray-300 py-3 px-4 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <RenderErrorMessage error={errors.phone_number} />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="rounded bg-blue-600 text-white py-3 px-6 font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  );
}

const RenderErrorMessage = ({ error }) => {
  return error ? <small className="text-red-500">{error}</small> : null;
};

export default CreateCustomerForm;
