import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "../context/AlertContext";
import { useTranslation } from 'react-i18next';
import arrowTop from "../assets/icons/arrowTop.svg";
import arrowBottom from "../assets/icons/arrowBottom.svg";
import editIcon from "../assets/icons/edit.svg";
import deleteIcon from "../assets/icons/delete.svg";
import placeholder from "../assets/Placeholder.png";

interface ProductCardProps {
  id: string;
  productName: string;
  productDescription: string;
  category: string;
  brand: string;
  productModel?: string;
  serialNumber?: string;
  yearOfProduction?: number;
  technicalCondition: string;
  purchasePrice: number;
  salePrice?: number;
  productImage?: string;
  additionalNotes?: string;
  transactionType: "pawn" | "sale" | "redeemed" | "sold";
  dateOfReceipt: string;
  redemptionDeadline?: string;
  loanValue?: number;
  interestRate?: number;
  notes?: string;
  clientName?: string;
  canEdit?: boolean;
  onDelete: () => void;
  role: string;
}

export default function ProductCard({
  id,
  productName,
  productDescription,
  category,
  brand,
  productModel,
  serialNumber,
  yearOfProduction,
  technicalCondition,
  purchasePrice,
  salePrice,
  productImage,
  additionalNotes,
  transactionType,
  dateOfReceipt,
  redemptionDeadline,
  loanValue,
  interestRate,
  notes,
  clientName,
  canEdit = true,
  onDelete,
  role,
}: ProductCardProps) {
  console.log('ProductCard props:', { clientName, dateOfReceipt, transactionType });
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTransactionType, setCurrentTransactionType] = useState(transactionType);
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { t } = useTranslation();

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const handleStatusChange = async () => {
    try {
      const newStatus = currentTransactionType === "pawn" ? "redeemed" : "sold";

      await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        transactionType: newStatus,
        dateOfReceipt: dateOfReceipt,
        purchasePrice: purchasePrice
      });

      setCurrentTransactionType(newStatus);
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  const confirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    showAlert(
      `${t('cards.product.confirmDelete')} ${productName}?`,
      "error",
      () => onDelete()
    );
  };

  const formattedDateOfReceipt = new Date(dateOfReceipt).toLocaleDateString(
    "pl-PL",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  const formattedRedemptionDeadline = redemptionDeadline
    ? new Date(redemptionDeadline).toLocaleDateString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : null;

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden mb-4 w-full"
      onClick={toggleExpand}
    >
      <div className="px-6 py-4 cursor-pointer">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              className="h-24 w-24 object-cover rounded-lg shadow-sm"
              src={
                productImage
                  ? `data:image/jpeg;base64,${productImage}`
                  : placeholder
              }
              alt={productName}
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{productName}</h2>
              <p className="text-sm text-gray-600">
                {t('cards.product.category')}: {category} - {brand}
              </p>
              <p className="text-sm font-medium text-emerald-600 mt-1">
                ${salePrice}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {(currentTransactionType === "pawn" || currentTransactionType === "sale") && (
              <button
                className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg
                         hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                         focus:ring-offset-2 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusChange();
                }}
              >
                {currentTransactionType === "pawn" ? t('cards.product.markAsRedeem') : t('cards.product.markAsSold')}
              </button>
            )}
            <div className="flex items-center space-x-2">
              {canEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/pawnshop/dashboard/products/edit/${id}`);
                  }}
                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors duration-200"
                >
                  <img src={editIcon} alt={t('cards.product.edit')} className="w-5 h-5" />
                </button>
              )}
              {role === "admin" && (
                <button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    confirmDelete(e);
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                >
                  <img src={deleteIcon} alt={t('cards.product.delete')} className="w-5 h-5" />
                </button>
              )}
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors duration-200">
                <img
                  src={isExpanded ? arrowTop : arrowBottom}
                  alt={isExpanded ? t('cards.product.collapse') : t('cards.product.expand')}
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="px-6 py-4 bg-gray-50 space-y-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">{t('cards.product.productDetails')}</h4>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium text-gray-700">{t('cards.product.description')}:</span>{" "}
                  <span className="text-gray-600">{productDescription}</span>
                </p>
                {productModel && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">{t('cards.product.model')}:</span>{" "}
                    <span className="text-gray-600">{productModel}</span>
                  </p>
                )}
                {serialNumber && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">{t('cards.product.serialNumber')}:</span>{" "}
                    <span className="text-gray-600">{serialNumber}</span>
                  </p>
                )}
                {yearOfProduction && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">{t('cards.product.yearOfProduction')}:</span>{" "}
                    <span className="text-gray-600">{yearOfProduction}</span>
                  </p>
                )}
                <p className="text-sm">
                  <span className="font-medium text-gray-700">{t('cards.product.technicalCondition')}:</span>{" "}
                  <span className="text-gray-600">{technicalCondition}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">{t('cards.product.purchasePrice')}:</span>{" "}
                  <span className="text-gray-600">${purchasePrice}</span>
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">{t('cards.product.transactionDetails')}</h4>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium text-gray-700">{t('cards.product.transactionType')}:</span>{" "}
                  <span className="text-gray-600">{currentTransactionType}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">{t('cards.product.dateOfReceipt')}:</span>{" "}
                  <span className="text-gray-600">{formattedDateOfReceipt}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">{t('cards.product.client')}:</span>{" "}
                  <span className="text-gray-600">{clientName || "-"}</span>
                </p>
                {formattedRedemptionDeadline && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">{t('cards.product.redemptionDeadline')}:</span>{" "}
                    <span className="text-gray-600">{formattedRedemptionDeadline}</span>
                  </p>
                )}
                {loanValue && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">{t('cards.product.loanValue')}:</span>{" "}
                    <span className="text-gray-600">${loanValue}</span>
                  </p>
                )}
                {interestRate && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">{t('cards.product.interestRate')}:</span>{" "}
                    <span className="text-gray-600">{interestRate}%</span>
                  </p>
                )}
                {notes && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">{t('cards.product.transactionNotes')}:</span>{" "}
                    <span className="text-gray-600">{notes}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          {additionalNotes && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">{t('cards.product.additionalNotes')}</h4>
              <p className="text-sm text-gray-600">{additionalNotes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
