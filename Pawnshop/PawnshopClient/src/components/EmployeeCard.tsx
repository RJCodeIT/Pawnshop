import { useState } from "react";
import axios from "axios";
import { useAlert } from "../context/AlertContext";
import { useTranslation } from 'react-i18next';
import arrowTop from "../assets/icons/arrowTop.svg";
import arrowBottom from "../assets/icons/arrowBottom.svg";
import editIcon from "../assets/icons/edit.svg";
import deleteIcon from "../assets/icons/delete.svg";

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

interface EmployeeCardProps {
  employee: Employee;
  onDelete: () => void;
  onEdit: () => void;
}

export default function EmployeeCard({ employee, onDelete, onEdit }: EmployeeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { showAlert } = useAlert();
  const { t } = useTranslation();

  const toggleCard = () => setIsExpanded((prev) => !prev);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    showAlert(
      t('cards.employee.confirmDelete'),
      "error",
      async () => {
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/api/employees/${employee.id}`);
          onDelete();
        } catch (error) {
          console.error("Error deleting employee:", error);
          showAlert(t('cards.employee.errorDelete'), "error");
        }
      }
    );
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Employee in card:", employee);
    console.log("Employee ID in card:", employee.id);
    onEdit();
  };

  return (
    <div
      onClick={toggleCard}
      className="bg-white shadow-sm rounded-lg overflow-hidden cursor-pointer transition-shadow duration-200 hover:shadow-md"
    >
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{`${employee.firstName} ${employee.lastName}`}</h3>
            <p className="text-sm text-gray-500 mt-1">{t('cards.employee.position')}: {employee.role}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleEdit}
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors duration-200"
            >
              <img src={editIcon} alt={t('cards.employee.edit')} className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
            >
              <img src={deleteIcon} alt={t('cards.employee.delete')} className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors duration-200">
              <img
                src={isExpanded ? arrowTop : arrowBottom}
                alt={isExpanded ? t('cards.employee.collapse') : t('cards.employee.expand')}
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="px-6 py-4 bg-gray-50 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">{t('cards.employee.personalInformation')}</h4>
              <p className="text-sm">
                <span className="font-medium text-gray-700">{t('cards.employee.pesel')}:</span>{" "}
                <span className="text-gray-600">{employee.pesel}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">{t('cards.employee.dateOfBirth')}:</span>{" "}
                <span className="text-gray-600">{new Date(employee.dateOfBirth).toLocaleDateString()}</span>
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">{t('cards.employee.contactInformation')}</h4>
              <p className="text-sm">
                <span className="font-medium text-gray-700">{t('cards.employee.email')}:</span>{" "}
                <span className="text-gray-600">{employee.email}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">{t('cards.employee.phoneNumber')}:</span>{" "}
                <span className="text-gray-600">{employee.phoneNumber}</span>
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">{t('cards.employee.address')}</h4>
            <p className="text-sm text-gray-600">
              {employee.street} {employee.houseNumber}, {employee.postalCode} {employee.city}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">{t('cards.employee.idInformation')}</h4>
            <p className="text-sm">
              <span className="font-medium text-gray-700">{t('cards.employee.id')}:</span>{" "}
              <span className="text-gray-600">{employee.idSeries} {employee.idNumber}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
