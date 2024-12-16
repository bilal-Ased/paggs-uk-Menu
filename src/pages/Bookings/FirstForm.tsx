import React, { useState } from 'react';
import CreateCustomerForm from './CreateCustomerForm';
import CustomerSearch from './CustomerSearch';


type Props = {
  onSuccess: (customer: any) => void;
};

function FirstForm({ onSuccess }: Props) {
  const [isSearching, setIsSearching] = useState(false); // Toggle between search and form

  const handleSelectedCustomer = (cust: any) => {
    if (cust === 'noCustomer') {
      setIsSearching(false); // Return to creating a new customer if no match
    } else {
      onSuccess(cust); // Proceed to the next step with the selected customer
    }
  };

  return (
    <div className="grid grid-cols-1 gap-9 cols-2 justify-center items-center max-w-4xl mx-auto">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white justify-center">
              Contact Detail
            </h3>
          </div>
          {isSearching ? (
            <>
              {/* Customer Search */}
              <CustomerSearch handleSelectedCustomer={handleSelectedCustomer} />
              <button
                onClick={() => setIsSearching(false)}
                className="mt-4 text-blue-500 hover:underline"
              >
                Back to New Customer Form
              </button>
            </>
          ) : (
            <>
              {/* New Customer Form */}
              <CreateCustomerForm
                handleSelectedCustomer={handleSelectedCustomer}
              />
              <button
                onClick={() => setIsSearching(true)}
                className="mt-4 text-blue-500 hover:underline"
              >
                Already existing? Search for your details
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FirstForm;
