import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import EmployeeCard from "../components/EmployeeCard";
import SearchBar from "../components/SearchBar";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  pesel: string;
  dateOfBirth: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  idSeries: string;
  idNumber: string;
  phoneNumber: string;
  email: string;
  login: string;
  role: string;
};

export default function Employees() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEmployees = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/employees`)
      .then((response) => {
        setEmployees(response.data);
        setFilteredEmployees(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = () => {
    fetchEmployees();
  };

  const handleEdit = (id: string) => {
    console.log("Employee ID:", id);
    console.log("Employee object:", employees.find(emp => emp.id === id));
    navigate(`/pawnshop/dashboard/employees/edit/${id}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">{t('routes.employees.title')}</h1>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <SearchBar<Employee>
            placeholder={t('search.employees')}
            data={employees}
            onSearch={(results) => setFilteredEmployees(results)}
            searchKeys={['firstName', 'lastName', 'email', 'phoneNumber', 'role']}
          />
        </div>

        {isLoading ? (
          <p className="text-center">{t('routes.employees.loading')}</p>
        ) : filteredEmployees.length > 0 ? (
          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onDelete={handleDelete}
                onEdit={() => handleEdit(employee.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center">{t('routes.employees.noEmployees')}</p>
        )}
      </div>
    </div>
  );
}
