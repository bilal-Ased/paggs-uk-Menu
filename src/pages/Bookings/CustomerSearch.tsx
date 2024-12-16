import { useState, useEffect } from 'react';

// Type for the customer (adjust based on your API structure)
type Customer = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

type Props = {
  handleSelectedCustomer: (customer: Customer | 'noCustomer') => void;
};

const CustomerSearch = ({ handleSelectedCustomer }: Props) => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [exactMatchCustomer, setExactMatchCustomer] = useState<Customer | null>(
    null,
  );
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fetchCustomer = async (query: string) => {
    if (!query) {
      setExactMatchCustomer(null); // Clear result if search is empty
      setStatusMessage(null);
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/customers/list?search=${query}`,
      );
      const resp = await response.json();

      // Check for exact match based on the search query
      const exactMatch = resp?.data?.find(
        (customer: Customer) =>
          customer.first_name.toLowerCase() === query.toLowerCase() ||
          customer.last_name.toLowerCase() === query.toLowerCase() ||
          customer.email.toLowerCase() === query.toLowerCase() ||
          customer.phone === query, // Phone number is matched as-is (no transformation)
      );

      if (exactMatch) {
        setExactMatchCustomer(exactMatch);
        setStatusMessage('Customer found! Redirecting to the next step...');

        // Delay redirection by 3 seconds
        setTimeout(() => {
          handleSelectedCustomer(exactMatch);
          setStatusMessage(null);
        }, 3000);
      } else {
        setExactMatchCustomer(null);
        setStatusMessage(
          'No customer found. Redirecting to create new customer...',
        );

        // Delay redirection by 3 seconds
        setTimeout(() => {
          handleSelectedCustomer('noCustomer');
          setStatusMessage(null);
        }, 3000);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setStatusMessage('Error fetching customer data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission or default behavior
      fetchCustomer(search); // Perform the search explicitly
    }
  };

  return (
    <div className="w-3/5 mx-auto my-5">
      <div className="flex gap-1 items-center">
        <input
          type="search"
          className="px-2 py-1 rounded w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by email or phone number..."
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchSubmit} // Listen for Enter key
          value={search}
        />
        {isLoading && <p>Loading...</p>}
      </div>

      {statusMessage && (
        <div
          className={`mt-4 p-2 border rounded ${
            exactMatchCustomer
              ? 'border-green-400 bg-green-100'
              : 'border-red-400 bg-red-100'
          }`}
        >
          <p
            className={`${
              exactMatchCustomer ? 'text-green-700' : 'text-red-700'
            }`}
          >
            <strong>{statusMessage}</strong>
          </p>
        </div>
      )}

      {exactMatchCustomer && (
        <div className="mt-4 p-2 border border-gray-300 rounded bg-gray-100">
          <p>
            <strong>Name:</strong> {exactMatchCustomer.first_name}{' '}
            {exactMatchCustomer.last_name}
          </p>
          <p>
            <strong>Email:</strong> {exactMatchCustomer.email}
          </p>
          <p>
            <strong>Phone:</strong> {exactMatchCustomer.phone}
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerSearch;
