import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import CreateForm from '../components/CreateForm';
import CustomerSelect from '../components/CustomerSelect';

export default function AddProductForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [productModel, setProductModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [yearOfProduction, setYearOfProduction] = useState<number | undefined>();
  const [technicalCondition, setTechnicalCondition] = useState('');
  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [salePrice, setSalePrice] = useState<number | undefined>();
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [transactionType, setTransactionType] = useState<'pawn' | 'sale'>('pawn');
  const [dateOfReceipt] = useState(new Date().toISOString().split('T')[0]);
  const [redemptionDeadline, setRedemptionDeadline] = useState('');
  const [loanValue, setLoanValue] = useState<number | undefined>();
  const [interestRate, setInterestRate] = useState<number | undefined>();
  const [productImage, setProductImage] = useState<File | null>(null);

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
      formData.append('salePrice', salePrice?.toString() || '');
      formData.append('additionalNotes', additionalNotes || '');
      formData.append('transactionType', transactionType);
      formData.append('dateOfReceipt', dateOfReceipt);
      formData.append('redemptionDeadline', redemptionDeadline || '');
      formData.append('loanValue', loanValue?.toString() || '');
      formData.append('interestRate', interestRate?.toString() || '');
      formData.append('clientId', selectedCustomerId);
      
      if (productImage) {
        formData.append('productImage', productImage);
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      navigate('/pawnshop/dashboard/products');
    } catch (error) {
      console.error('Error creating product:', error);
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
              initialCustomer={null}
            />
          </div>

          {/* Product Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.product.sections.productDetails')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm 
                label={t('forms.product.fields.name.label')} 
                placeholder={t('forms.product.fields.name.placeholder')} 
                type="text" 
                value={productName} 
                required={true} 
                onChange={(e) => setProductName(e.target.value)} 
              />
              <CreateForm 
                label={t('forms.product.fields.description.label')} 
                placeholder={t('forms.product.fields.description.placeholder')} 
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
                label={t('forms.product.fields.model.label')} 
                placeholder={t('forms.product.fields.model.placeholder')} 
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

          {/* Product Image */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.product.sections.productImage')}</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {t('forms.product.fields.productImage.label')}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProductImage(e.target.files ? e.target.files[0] : null)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
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
                    onChange={(e) => {
                      const newType = e.target.value as 'pawn' | 'sale';
                      setTransactionType(newType);
                      // Reset fields when changing transaction type
                      if (newType === 'pawn') {
                        setSalePrice(undefined);
                      } else {
                        setRedemptionDeadline('');
                        setLoanValue(undefined);
                        setInterestRate(undefined);
                      }
                    }}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
                             placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                             focus:ring-offset-2 transition-colors duration-200"
                  >
                    <option value="" disabled>
                      {t('forms.product.fields.transactionType.placeholder')}
                    </option>
                    <option value="pawn">{t('forms.product.fields.transactionType.options.pawn')}</option>
                    <option value="sale">{t('forms.product.fields.transactionType.options.sale')}</option>
                  </select>
                </div>
                <CreateForm 
                  label={t('forms.product.fields.dateOfReceipt.label')} 
                  placeholder={t('forms.product.fields.dateOfReceipt.placeholder')} 
                  type="date" 
                  value={dateOfReceipt} 
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
              {loading ? t('common.saving') : t('forms.product.addSubmit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
