import { useState, useEffect, useRef } from 'react';

// Type for the customer (adjust based on your API structure)
type Customer = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

type Props = {
  handleSelectedCustomer: (customer: any) => void;
};

const CustomerSearch = ({ handleSelectedCustomer }: Props) => {
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch customers from backend
  useEffect(() => {
    const fetchCustomers = async (query: string) => {
      if (!query) return; // Don't make an API call if the query is empty
      setIsLoading(true);

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/customers/list?search=${query}`,
        );
        const resp = await response.json();
        setCustomers(resp?.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (search) {
      fetchCustomers(search);
    } else {
      setCustomers([]); // Clear customers when search is empty
    }
  }, [search]);

  // Debounce function to delay search calls
  function debounce(cb: (...args: any[]) => void, delay: number) {
    return (...args: any[]) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  // Handle search input
  const handleSearch = (value: string) => {
    setSearch(value);
  };

  // Handle selecting a customer from the list
  const handleSelectCustomer = (customer: Customer) => {
    handleSelectedCustomer(customer);
    setSearch(`${customer.first_name} ${customer.last_name}`); // Update the search field
  };

  return (
    <div className="w-3/5 mx-auto my-5">
      <div className="flex gap-1 items-center">
        <input
          type="search"
          className="px-2 py-1 rounded w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for a customer..."
          onChange={(e) => handleSearch((e.target as HTMLInputElement).value)}
          value={search}
        />
        {search && (
          <>
            <span>|</span>
            <button
              className="border px-1 rounded hover:bg-gray-200"
              onClick={() => handleSelectedCustomer('noCustomer')}
            >
              Create
            </button>
          </>
        )}
      </div>
      {isLoading && <p>Loading...</p>}
      <ul className="mt-4 text-gray-600">
        {customers.map((customer) => (
          <li
            key={customer.id}
            className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
            onClick={() => handleSelectCustomer(customer)}
          >
            {customer.first_name} {customer.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerSearch;
