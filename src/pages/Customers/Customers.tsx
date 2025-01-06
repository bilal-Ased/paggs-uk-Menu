import { useEffect, useState } from 'react';
import './styles.css';
import Pagination from '../../components/Pagination';
import SimpleLoader from '../../components/SimpleLoader';
import Message from '../../components/Message';
import Avatar from '../../components/Avatar';
import Breadcrumb from '../../components/Breadcrumb';
import { FaFileExport } from "react-icons/fa6";


const Customers = () => {
  const [data, setData] = useState([]);
  const [metaData, setMetaData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('id'); // default sort by id
  const [sortOrder, setSortOrder] = useState('asc'); // default sort order

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://coral-app-fvdip.ondigitalocean.app/api/customers/table?page=${page}&search=${searchTerm}&sort=${sortField}&order=${sortOrder}`,
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
  }, [page, searchTerm, sortField, sortOrder]); // Added dependencies for search and sorting

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handleSort = (field) => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle sort order
    setSortField(field);
    setSortOrder(newOrder);
    setPage(1); // Reset to first page on new sort
  };



  const handleExport = async () => {
    try {
      const response = await fetch("https://coral-app-fvdip.ondigitalocean.app/api/customers/export", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "customers_export.csv"); // Adjust the filename as needed
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        console.error("Failed to export data:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while exporting:", error);
    }
  };

  return (
    <div>

      <Breadcrumb pageName="Customers" />

      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={handleSearch}
          className="mb-4 p-2 border rounded"
        />
        <button
          type="button"
          className="inline-flex items-center justify-start rounded bg-blue-800 px-6 py-3 text-white font-semibold text-sm shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed ml-auto"
          onClick={handleExport}
        >
          <FaFileExport className="mr-1" />
          Export
        </button>

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
                  Name
                </button>
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              data.length > 0 ? (
                data.map((item) => {

                  const fullName = `${item.first_name} ${item.last_name}`


                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={item.id} // Corrected from `key={item.id}`
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id={`checkbox-table-search-${item.id}`} // Corrected to make checkboxes unique
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor={`checkbox-table-search-${item.id}`} // Corrected to match unique ID
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="px-6 py-4">{item.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 items-center">
                          <Avatar name={fullName} />
                          {fullName}
                        </div>
                      </td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.phone_number}</td>
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
                  )

                }

                )
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

export default Customers;
