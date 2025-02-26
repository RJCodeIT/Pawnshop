import arrowTop from "../assets/icons/arrowTop.svg";
import arrowBottom from "../assets/icons/arrowBottom.svg";
import editIcon from "../assets/icons/edit.svg";
import deleteIcon from "../assets/icons/delete.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import { useTranslation } from 'react-i18next';

type CustomerCardProps = {
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  idSeries: string;
  idNumber: string;
  pesel: string;
  phoneNumber?: string;
  dateOfBirth: string;
  email: string;
  notes?: string;
  products: {
    id: string;
    productName: string;
    transactionType: string;
  }[];
  onDelete: () => void;
  role: string;
};

export default function CustomerCard({
  id,
  firstName,
  lastName,
  street,
  houseNumber,
  postalCode,
  city,
  idSeries,
  idNumber,
  pesel,
  phoneNumber,
  dateOfBirth,
  email,
  notes,
  products,
  onDelete,
  role,
}: CustomerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const toggleCard = () => setIsExpanded(prev => !prev);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/pawnshop/dashboard/customers/edit/${id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    showAlert(
      t('cards.customer.confirmDelete', { firstName, lastName }),
      "error",
      onDelete
    );
  };

  const getStatusLabel = (transactionType: string) => {
    switch (transactionType) {
      case "pawn":
        return t('cards.customer.pawn');
      case "sale":
        return t('cards.customer.sale');
      case "redeemed":
        return t('cards.customer.redeemed');
      case "sold":
        return t('cards.customer.sold');
      default:
        return t('cards.customer.unknown');
    }
  };

  return (
    <div
      onClick={toggleCard}
      className="bg-white shadow-sm rounded-lg overflow-hidden cursor-pointer transition-shadow duration-200 hover:shadow-md mb-4 w-full"
    >
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {firstName} {lastName}
              </h3>
              <span className="text-sm text-gray-500 ml-4">
                {t('cards.customer.pesel')}: {pesel}
              </span>
            </div>
            {notes && (
              <p className="text-sm text-gray-500 mt-1">
                {t('cards.customer.notes')}: {notes}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleEdit}
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors duration-200"
            >
              <img src={editIcon} alt={t('cards.customer.edit')} className="w-5 h-5" />
            </button>
            {role === "admin" && (
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
              >
                <img src={deleteIcon} alt={t('cards.customer.delete')} className="w-5 h-5" />
              </button>
            )}
            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors duration-200">
              <img
                src={isExpanded ? arrowTop : arrowBottom}
                alt={isExpanded ? t('cards.customer.collapse') : t('cards.customer.expand')}
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
              <h4 className="text-sm font-medium text-gray-500 mb-1">{t('cards.customer.personalInformation')}</h4>
              <p className="text-sm">
                <span className="font-medium text-gray-700">{t('cards.customer.dateOfBirth')}:</span>{" "}
                <span className="text-gray-600">{dateOfBirth === 'Invalid Date' ? t('cards.customer.noDate') : dateOfBirth}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">{t('cards.customer.id')}:</span>{" "}
                <span className="text-gray-600">{idSeries || '-'} {idNumber || '-'}</span>
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">{t('cards.customer.contactInformation')}</h4>
              <p className="text-sm">
                <span className="font-medium text-gray-700">{t('cards.customer.email')}:</span>{" "}
                <span className="text-gray-600">{email || '-'}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">{t('cards.customer.phoneNumber')}:</span>{" "}
                <span className="text-gray-600">{phoneNumber || '-'}</span>
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">{t('cards.customer.address')}</h4>
            <p className="text-sm text-gray-600">
              {street || '-'} {houseNumber || ''}, {postalCode || '-'} {city || '-'}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">{t('cards.customer.items')}</h4>
            <p className="text-sm text-gray-600">
              {products.length > 0
                ? products
                    .map(
                      (product) =>
                        `${product.productName} (${getStatusLabel(
                          product.transactionType
                        )})`
                    )
                    .join(", ")
                : t('cards.customer.noItemsAvailable')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
