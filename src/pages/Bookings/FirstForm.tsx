import React, { useState, useEffect } from 'react';
import CreateCustomerForm from './CreateCustomerForm';
import CustomerSearch from './CustomerSearch';

type Props = {
  onSuccess: (customer: any) => void;
};

function FirstForm({ onSuccess }: Props) {
  const [renderSearch, setRenderSearch] = useState(true);

  const handleSelectedCustomer = (cust: any) => {
    if (cust == 'noCustomer') {
      setRenderSearch(false);
    } else {
      onSuccess(cust);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-9 cols-2 justify-center items-center max-w-4xl mx-auto">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white justify-center">
              Contact Details
            </h3>
          </div>

          {renderSearch ? (
            <>
              <CustomerSearch handleSelectedCustomer={handleSelectedCustomer} />
            </>
          ) : (
            <CreateCustomerForm
              handleSelectedCustomer={handleSelectedCustomer}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FirstForm;
