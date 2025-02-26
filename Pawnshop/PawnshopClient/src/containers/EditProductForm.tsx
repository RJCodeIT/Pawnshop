import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import CreateForm from '../components/CreateForm';
import CustomerSelect from '../components/CustomerSelect';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  pesel: string;
}

interface ProductFormData {
  id: string;
  clientId?: string;
  productName: string;
  productDescription: string;
  category: string;
  brand: string;
  productModel: string;
  serialNumber: string;
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
  client?: Customer | null;
}

interface EditProductFormProps {
  initialData: ProductFormData;
}

export default function EditProductForm({ initialData }: EditProductFormProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(initialData.client?.id || '');
  const [initialCustomer] = useState<Customer | null>(initialData.client || null);

  const [productName, setProductName] = useState(initialData.productName);
  const [productDescription, setProductDescription] = useState(initialData.productDescription);
  const [category, setCategory] = useState(initialData.category);
  const [brand, setBrand] = useState(initialData.brand);
  const [productModel, setProductModel] = useState(initialData.productModel);
  const [serialNumber, setSerialNumber] = useState(initialData.serialNumber);
  const [yearOfProduction, setYearOfProduction] = useState<number | undefined>(initialData.yearOfProduction);
  const [technicalCondition, setTechnicalCondition] = useState(initialData.technicalCondition);
  const [purchasePrice, setPurchasePrice] = useState(initialData.purchasePrice);
  const [salePrice, setSalePrice] = useState<number | undefined>(initialData.salePrice);
  const [additionalNotes, setAdditionalNotes] = useState(initialData.additionalNotes || '');
  const [transactionType] = useState(initialData.transactionType);
  const [dateOfReceipt] = useState(initialData.dateOfReceipt);
  const [redemptionDeadline, setRedemptionDeadline] = useState(initialData.redemptionDeadline || '');
  const [loanValue, setLoanValue] = useState<number | undefined>(initialData.loanValue);
  const [interestRate, setInterestRate] = useState<number | undefined>(initialData.interestRate);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [currentProductImage, setCurrentProductImage] = useState<string | undefined>(initialData.productImage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('productDescription', productDescription);
      formData.append('category', category);
      formData.append('brand', brand || '');
      formData.append('productModel', productModel || '');
      formData.append('serialNumber', serialNumber || '');
      formData.append('yearOfProduction', yearOfProduction?.toString() || '');
      formData.append('technicalCondition', technicalCondition);
      formData.append('purchasePrice', purchasePrice.toString());
      if (salePrice) formData.append('salePrice', salePrice.toString());
      if (productImage) formData.append('productImage', productImage);
      if (additionalNotes) formData.append('additionalNotes', additionalNotes);
      formData.append('transactionType', transactionType);
      formData.append('dateOfReceipt', dateOfReceipt);
      if (redemptionDeadline) formData.append('redemptionDeadline', redemptionDeadline);
      if (loanValue) formData.append('loanValue', loanValue.toString());
      if (interestRate) formData.append('interestRate', interestRate.toString());
      formData.append('clientId', selectedCustomerId);

      console.log('Sending form data:', Object.fromEntries(formData));

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/products/${initialData.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Response:', response.data);
      navigate('/pawnshop/dashboard/products');
      setError(null);
    } catch (err) {
      console.error('Error updating product:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || t('forms.product.errors.updateFailed'));
      } else {
        setError(t('forms.product.errors.updateFailed'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Selection */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.customer.select')}</h3>
            <CustomerSelect 
              onCustomerSelect={setSelectedCustomerId}
              initialCustomer={initialCustomer}
            />
          </div>

          {/* Product Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.product.sections.productDetails')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm 
                label={t('forms.product.fields.productName.label')} 
                placeholder={t('forms.product.fields.productName.placeholder')} 
                type="text" 
                value={productName} 
                required={true} 
                onChange={(e) => setProductName(e.target.value)} 
              />
              <CreateForm 
                label={t('forms.product.fields.productDescription.label')} 
                placeholder={t('forms.product.fields.productDescription.placeholder')} 
                type="text" 
                value={productDescription} 
                required={true} 
                onChange={(e) => setProductDescription(e.target.value)} 
              />
              <CreateForm 
                label={t('forms.product.fields.category.label')} 
                placeholder={t('forms.product.fields.category.placeholder')} 
                type="text" 
                value={category} 
                required={true} 
                onChange={(e) => setCategory(e.target.value)} 
              />
              <CreateForm 
                label={t('forms.product.fields.brand.label')} 
                placeholder={t('forms.product.fields.brand.placeholder')} 
                type="text" 
                value={brand} 
                onChange={(e) => setBrand(e.target.value)} 
              />
              <CreateForm 
                label={t('forms.product.fields.productModel.label')} 
                placeholder={t('forms.product.fields.productModel.placeholder')} 
                type="text" 
                value={productModel} 
                onChange={(e) => setProductModel(e.target.value)} 
              />
              <CreateForm 
                label={t('forms.product.fields.serialNumber.label')} 
                placeholder={t('forms.product.fields.serialNumber.placeholder')} 
                type="text" 
                value={serialNumber} 
                onChange={(e) => setSerialNumber(e.target.value)} 
              />
              <CreateForm 
                label={t('forms.product.fields.yearOfProduction.label')} 
                placeholder={t('forms.product.fields.yearOfProduction.placeholder')} 
                type="number" 
                value={yearOfProduction?.toString()} 
                onChange={(e) => setYearOfProduction(Number(e.target.value))} 
              />
              <CreateForm 
                label={t('forms.product.fields.technicalCondition.label')} 
                placeholder={t('forms.product.fields.technicalCondition.placeholder')} 
                type="text" 
                value={technicalCondition} 
                required={true} 
                onChange={(e) => setTechnicalCondition(e.target.value)} 
              />
            </div>
          </div>

          {/* Product Image */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.product.sections.productImage')}</h3>
            <div className="grid grid-cols-1 gap-6">
              {currentProductImage && (
                <div className="mb-4">
                  <img
                    src={`data:image/jpeg;base64,${currentProductImage}`}
                    alt="Current product"
                    className="h-48 w-48 object-cover rounded-lg shadow-sm"
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {t('forms.product.fields.productImage.label')}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    setProductImage(file);
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const base64String = reader.result as string;
                        setCurrentProductImage(base64String.split(',')[1]);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.product.sections.additionalData')}</h3>
            <div className="grid grid-cols-1 gap-6">
              <CreateForm 
                label={t('forms.product.fields.additionalNotes.label')} 
                placeholder={t('forms.product.fields.additionalNotes.placeholder')} 
                type="text" 
                value={additionalNotes} 
                onChange={(e) => setAdditionalNotes(e.target.value)} 
              />
            </div>
          </div>

          {/* Transaction Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.product.sections.transactionData')}</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('forms.product.fields.transactionType.label')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={transactionType}
                    required
                    disabled
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm 
                             placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                             focus:ring-offset-2 transition-colors duration-200 text-gray-500"
                  >
                    <option value="" disabled>
                      {t('forms.product.fields.transactionType.placeholder')}
                    </option>
                    <option value="pawn">{t('forms.product.fields.transactionType.options.pawn')}</option>
                    <option value="sale">{t('forms.product.fields.transactionType.options.sale')}</option>
                    <option value="redeemed">{t('forms.product.fields.transactionType.options.redeemed')}</option>
                    <option value="sold">{t('forms.product.fields.transactionType.options.sold')}</option>
                  </select>
                </div>
                <CreateForm 
                  label={t('forms.product.fields.dateOfReceipt.label')} 
                  placeholder={t('forms.product.fields.dateOfReceipt.placeholder')} 
                  type="date" 
                  value={dateOfReceipt} 
                  disabled={true}
                />
              </div>

              {transactionType === 'pawn' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <CreateForm 
                    label={t('forms.product.fields.redemptionDeadline.label')} 
                    placeholder={t('forms.product.fields.redemptionDeadline.placeholder')} 
                    type="date" 
                    value={redemptionDeadline} 
                    required={true}
                    onChange={(e) => setRedemptionDeadline(e.target.value)} 
                  />
                  <CreateForm 
                    label={t('forms.product.fields.loanValue.label')} 
                    placeholder={t('forms.product.fields.loanValue.placeholder')} 
                    type="number" 
                    value={loanValue?.toString()} 
                    required={true}
                    onChange={(e) => setLoanValue(Number(e.target.value))} 
                  />
                  <CreateForm 
                    label={t('forms.product.fields.interestRate.label')} 
                    placeholder={t('forms.product.fields.interestRate.placeholder')} 
                    type="number" 
                    value={interestRate?.toString()} 
                    required={true}
                    onChange={(e) => setInterestRate(Number(e.target.value))} 
                  />
                </div>
              )}

              {transactionType === 'sale' && (
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-4">{t('forms.product.sections.pricingData')}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CreateForm 
                      label={t('forms.product.fields.purchasePrice.label')} 
                      placeholder={t('forms.product.fields.purchasePrice.placeholder')} 
                      type="number" 
                      value={purchasePrice.toString()} 
                      required={true} 
                      onChange={(e) => setPurchasePrice(Number(e.target.value))} 
                    />
                    <CreateForm 
                      label={t('forms.product.fields.salePrice.label')} 
                      placeholder={t('forms.product.fields.salePrice.placeholder')} 
                      type="number" 
                      value={salePrice?.toString()} 
                      required={true} 
                      onChange={(e) => setSalePrice(Number(e.target.value))} 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="text-red-600 mb-4">{error}</div>
          )}

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/pawnshop/dashboard/products')}
              className="px-6 py-2 border border-red-600 text-red-600 rounded-md 
                       hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 
                       focus:ring-offset-2 transition-colors duration-200"
            >
              {t('forms.product.cancel')}
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-2 bg-emerald-600 text-white rounded-md 
                       hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                       focus:ring-offset-2 transition-colors duration-200"
            >
              {loading ? t('common.saving') : t('forms.product.editSubmit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
