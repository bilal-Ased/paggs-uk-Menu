import { useEffect, useState } from 'react';
import '../Customers/styles.css';
import Pagination from '../../components/Pagination';
import SimpleLoader from '../../components/SimpleLoader';
import Message from '../../components/Message';
import Breadcrumb from '../../components/Breadcrumb';

const AllBookings = () => {
  const [data, setData] = useState([]);
  const [metaData, setMetaData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState(''); // State for "From Date"
  const [toDate, setToDate] = useState(''); // State for "To Date"
  const [sortField, setSortField] = useState('id'); // default sort by id
  const [sortOrder, setSortOrder] = useState('asc'); // default sort order

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://coral-app-fvdip.ondigitalocean.app/api/booking/list?page=${page}&search=${searchTerm}&from_date=${fromDate}&to_date=${toDate}&sort=${sortField}&order=${sortOrder}`
    )
      .then((res) => res.json())
      .then((rawData) => {
        if (rawData) {
          const { data, ...others } = rawData;
          setData(data);
          setMetaData(others);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [page, searchTerm, fromDate, toDate, sortField, sortOrder]); // Add fromDate and toDate as dependencies

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
    setPage(1); // Reset to first page when date changes
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
    setPage(1); // Reset to first page when date changes
  };

  const handleSort = (field) => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle sort order
    setSortField(field);
    setSortOrder(newOrder);
    setPage(1); // Reset to first page on new sort
  };

  return (
    <div>
      <div className="flex space-x-4">
      <Breadcrumb pageName="Bookings" />

      <input
        type="text"
        placeholder="Search Bookings..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded w-64"
      />
        <input
          type="date"
          value={fromDate}
          onChange={handleFromDateChange}
          className="mb-4 p-2 border rounded"
          placeholder="From Date"
        />
        <input
          type="date"
          value={toDate}
          onChange={handleToDateChange}
          className="mb-4 p-2 border rounded"
          placeholder="To Date"
        />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <button
                  onClick={() => handleSort('id')}
                  className="focus:outline-none"
                >
                  ID
                </button>
              </th>
              <th scope="col" className="px-6 py-3">
                <button
                  onClick={() => handleSort('first_name')}
                  className="focus:outline-none"
                >
                  Customer Name 
                </button>
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              data.length > 0 ? (
                data.map((item) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={item.id}
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-search-${item.id}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`checkbox-table-search-${item.id}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4">{item.id}</td>
                    <td className="px-6 py-4">
                      
                      {`${item.customer.first_name} ${item.customer.last_name}`}
                    </td>
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4">{item.time}</td>
                    <td className="px-6 py-4">{item.status.name}</td>
                    <td className="flex items-center px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <Message message="No data found" />
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan={4}>
                  <SimpleLoader />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-center">
          {metaData && (
            <Pagination
              currentPage={metaData.current_page}
              lastPage={metaData.last_page}
              prevPageUrl={metaData.prev_page_url}
              nextPageUrl={metaData.next_page_url}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBookings;
