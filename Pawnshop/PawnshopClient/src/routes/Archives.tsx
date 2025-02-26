import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

interface Product {
  _id: string;
  productName: string;
  productDescription: string;
  category: string;
  brand: string;
  productModel: string;
  serialNumber?: string;
  yearOfProduction?: number;
  technicalCondition: string;
  purchasePrice: number;
  salePrice?: number;
  productImages?: string[];
  additionalNotes?: string;
  transactionType: "pawn" | "sale" | "redeemed" | "sold";
  dateOfReceipt: string;
  redemptionDeadline?: string;
  loanValue?: number;
  interestRate?: number;
  notes?: string;
  clientId: string;
  clientName?: string;
}

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
}

export default function Archives() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  useEffect(() => {
    const fetchProductsAndCustomers = async () => {
      try {
        const productsResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`
        );
        const productsData: Product[] = productsResponse.data;

        const customersResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/customers`
        );
        const customersData: Customer[] = customersResponse.data;

        const updatedProducts = productsData.map((product) => {
          const customer = customersData.find(
            (c) => c._id === product.clientId
          );
          return {
            ...product,
            clientName: customer
              ? `${customer.firstName} ${customer.lastName}`
              : "Unknown Client",
          };
        });

        const filteredProducts = updatedProducts.filter(
          (product) =>
            product.transactionType === "redeemed" ||
            product.transactionType === "sold"
        );

        setProducts(filteredProducts);
        setFilteredProducts(filteredProducts);
        setLoading(false);
      } catch {
        setError(t('routes.archives.error'));
        setLoading(false);
      }
    };

    fetchProductsAndCustomers();
  }, [t]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">{t('routes.archives.title')}</h1>
      <div className="p-4">
        <SearchBar
          placeholder={t('routes.archives.searchPlaceholder')}
          data={products}
          onSearch={(results) => setFilteredProducts(results)}
          searchKeys={["productName", "brand", "category"]}
        />
        {loading && <p className="text-center">{t('routes.archives.loading')}</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <div className="space-y-8">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    productName={product.productName}
                    productDescription={product.productDescription}
                    category={product.category}
                    brand={product.brand}
                    productModel={product.productModel}
                    serialNumber={product.serialNumber}
                    yearOfProduction={product.yearOfProduction}
                    technicalCondition={product.technicalCondition}
                    purchasePrice={product.purchasePrice}
                    salePrice={product.salePrice}
                    productImage={product.productImages?.[0]}
                    additionalNotes={product.additionalNotes}
                    transactionType={product.transactionType}
                    dateOfReceipt={product.dateOfReceipt}
                    redemptionDeadline={product.redemptionDeadline}
                    loanValue={product.loanValue}
                    interestRate={product.interestRate}
                    notes={product.notes}
                    clientName={product.clientName}
                    canEdit={false}
                    onDelete={() => {}}
                    role="employee"
                  />
                ))
              ) : (
                <p>{t('routes.archives.noProducts')}</p>
              )}
            </div>
            <Pagination
              currentPage={currentPage}
              totalCustomers={filteredProducts.length}
              customersPerPage={productsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        )}
      </div>
    </div>
  );
}
