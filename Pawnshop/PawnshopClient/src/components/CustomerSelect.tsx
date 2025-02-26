import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import CreateForm from './CreateForm';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  pesel: string;
}

interface CustomerSelectProps {
  onCustomerSelect: (customerId: string) => void;
  initialCustomer: Customer | null;
}

export default function CustomerSelect({ onCustomerSelect, initialCustomer }: CustomerSelectProps) {
  const { t } = useTranslation();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCustomers = useCallback(async () => {
    try {
      console.log('Loading customers...');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/customers`);
      console.log('Received customers:', response.data);
      if (Array.isArray(response.data)) {
        setCustomers(response.data);
        setError(null);
      } else {
        console.error('Unexpected response format:', response.data);
        setError("Received invalid data format from server");
      }
    } catch (err) {
      console.error('Error loading customers:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to load customers. Please try again.");
      } else {
        setError("An unexpected error occurred while loading customers.");
      }
    }
  }, []);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  // Obsługa initialCustomer
  useEffect(() => {
    console.log('Initial customer changed:', initialCustomer);
    if (initialCustomer) {
      const displayText = `${initialCustomer.firstName} ${initialCustomer.lastName}; PESEL: ${initialCustomer.pesel}`;
      console.log('Setting search term to:', displayText);
      setSearchTerm(displayText);
      setFilteredCustomers([initialCustomer]);
      setIsDropdownOpen(false);
      setError(null);
    }
  }, [initialCustomer]);

  // Obsługa wyszukiwania
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCustomers([]);
      return;
    }

    if (initialCustomer) {
      setFilteredCustomers([initialCustomer]);
      return;
    }

    const filtered = customers.filter(customer => {
      const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
      const search = searchTerm.toLowerCase();
      return fullName.includes(search) || customer.pesel.includes(search);
    });
    setFilteredCustomers(filtered);
  }, [searchTerm, customers, initialCustomer]);

  const handleCustomerSelect = useCallback((customer: Customer) => {
    setSearchTerm(`${customer.firstName} ${customer.lastName}; PESEL: ${customer.pesel}`);
    onCustomerSelect(customer.id);
    setIsDropdownOpen(false);
  }, [onCustomerSelect]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  }, []);

  const handleClearCustomer = useCallback(() => {
    setSearchTerm('');
    onCustomerSelect('');
    setIsDropdownOpen(false);
  }, [onCustomerSelect]);

  return (
    <div className="relative mb-6">
      <div className="relative">
        <CreateForm 
          label={t('forms.customer.found')}
          placeholder={t('forms.customer.searchPlaceholder')}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          required={true}
        />
        {searchTerm && (
          <button
            onClick={handleClearCustomer}
            className="absolute right-2 top-9 text-gray-400 hover:text-gray-600"
            type="button"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        {isDropdownOpen && filteredCustomers.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => handleCustomerSelect(customer)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {`${customer.firstName} ${customer.lastName}; PESEL: ${customer.pesel}`}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
