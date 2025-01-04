import { useState } from 'react';

type Props = {
  customer: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  onBookingSuccess: any;
};

export const SecondForm = ({ customer, onBookingSuccess }: Props) => {
  // State to store form input values
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [persons, setPersons] = useState('');
  const [comments, setComments] = useState('');

  // State and errors
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Loading state
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors before each submit
    setValidationErrors([]);
    setLoading(true);  // Start loading

    // Form validation
    const errors: string[] = [];
    if (!date) errors.push('Date is required');
    if (!time) errors.push('Time is required');
    if (!persons) errors.push('Number of persons is required');

    if (errors.length > 0) {
      setValidationErrors(errors);
      setLoading(false);  // Stop loading on error
      return;
    }

    const bookingData = {
      customer_id: customer.id, // Include the customer ID
      date,
      time,
      persons,
      comments,
    };

    // Send the form data to the server
    try {
      const response = await fetch('https://coral-app-fvdip.ondigitalocean.app/api/booking/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const data = await response.json();
        onBookingSuccess(data?.booking);
      } else {
        const errorData = await response.json();
        setValidationErrors([errorData?.message || 'Error submitting booking. Please try again later.']);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      setValidationErrors(['Error submitting booking. Please try again later.']);
    } finally {
      setLoading(false);  // Stop loading when done
    }
  };

  return (
    <>
      <br />
      <div className="grid grid-cols-1 gap-9 cols-2 justify-center items-center max-w-4xl mx-auto">
        <div className="flex flex-col gap-9">
          {/* Booking Form */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white justify-center">
                Booking Details
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                {/* Date and Time Inputs */}
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Date <span className="text-meta-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Time<span className="text-meta-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        className="custom-input-time custom-input-time-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Persons and Comments Inputs */}
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Persons <span className="text-meta-1">*</span>
                    </label>

                    <select
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                      value={persons}
                      onChange={(e) => setPersons(e.target.value)}
                      required
                    >
                      <option value="">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Comments
                    </label>
                    <input
                      type="text"
                      name="comment"
                      placeholder="Any Additional Comments "
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    />
                  </div>
                </div>

                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                  <div className="mb-4 p-2 bg-red-100 border border-red-400 rounded text-red-600">
                    <ul>
                      {validationErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Submit Button with Loading Effect */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="justify-center rounded bg-primary p-3 font-medium text-white flex items-center"
                    disabled={loading} // Disable button when loading
                  >
                    {loading ? (
                      <div className="animate-spin border-2 border-t-2 border-white rounded-full w-5 h-5 mr-2" />
                    ) : (
                      'Submit'
                    )}
                    {loading ? 'Submitting...' : ''}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
