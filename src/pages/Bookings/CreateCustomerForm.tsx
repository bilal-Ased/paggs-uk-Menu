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
      <div className="p-6.5">
        {successMessage && (
          <div className="p-3 mb-4 text-green-600 bg-green-100 rounded">
            {successMessage}
          </div>
        )}
        {errors.server && (
          <div className="p-3 mb-4 text-red-600 bg-red-100 rounded">
            {errors.server}
          </div>
        )}
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              First name <span className="text-meta-1">*</span>
            </label>
            <input
              value={formData.firstName}
              onChange={(e) => handleFormChange(e, 'firstName')}
              type="text"
              placeholder="Enter your first name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
            />
            <RenderErrorMessage error={errors.first_name} />
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Last name
            </label>
            <input
              value={formData.lastName}
              onChange={(e) => handleFormChange(e, 'lastName')}
              type="text"
              placeholder="Enter your last name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
            />
          </div>
        </div>

        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Email <span className="text-meta-1">*</span>
            </label>
            <input
              value={formData.email}
              onChange={(e) => handleFormChange(e, 'email')}
              type="email"
              placeholder="Enter your Email Address"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
            />
            <RenderErrorMessage error={errors.email} />
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Phone <span className="text-meta-1">*</span>
            </label>
            <input
              value={formData.phone}
              onChange={(e) => handleFormChange(e, 'phone')}
              type="text"
              placeholder="Enter your Phone Number"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
            />
            <RenderErrorMessage error={errors.phone_number} />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="justify-center rounded bg-primary p-3 font-medium text-white"
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
  return error ? (
    <small className="text-meta-1 text-red-500">{error}</small>
  ) : null;
};

export default CreateCustomerForm;
