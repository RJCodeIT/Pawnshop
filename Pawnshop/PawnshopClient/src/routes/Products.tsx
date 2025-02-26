import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";

interface Product {
  id: string;
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
  clientName?: string;
  client?: {
    id: string;
    firstName: string;
    lastName: string;
    pesel: string;
  };
}

export default function Products() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const { employee } = useAuth();
  const { showAlert } = useAlert();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products`
      );
      const productsData: Product[] = productsResponse.data;
      console.log('Received products data:', productsData);

      const activeProducts = productsData.filter(
        (product) =>
          product.transactionType === "pawn" ||
          product.transactionType === "sale"
      );
      console.log('Filtered active products:', activeProducts);

      setProducts(activeProducts);
      setFilteredProducts(activeProducts);
      setLoading(false);
      setError(null);
    } catch {
      setError(t('routes.products.error.fetch'));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: string) => {
    try {
      console.log('Attempting to delete product:', id);
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
      console.log('Delete response:', response.data);

      if (response.status === 200) {
        showAlert(t('routes.products.success.delete'), "success");
        await fetchProducts(); // Odśwież listę po udanym usunięciu
      } else {
        console.error('Unexpected response status:', response.status);
        showAlert(t('routes.products.error.delete'), "error");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || t('routes.products.error.delete');
        console.error('Server error:', error.response?.data);
        
        if (error.response?.status === 404) {
          // Jeśli produkt nie istnieje, odśwież listę
          console.log('Product already deleted, refreshing list...');
          await fetchProducts();
          showAlert(t('routes.products.alreadyDeleted'), "info");
        } else {
          showAlert(errorMessage, "error");
        }
      } else {
        showAlert(t('routes.products.error.delete'), "error");
      }
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">{t('routes.products.title')}</h1>
      <div className="p-4">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <SearchBar<Product>
              placeholder={t('search.products')}
              data={products}
              onSearch={(results) => {
                setFilteredProducts(results);
                setCurrentPage(1); // Reset strony przy wyszukiwaniu
              }}
              searchKeys={['productName', 'productDescription', 'brand', 'productModel', 'serialNumber']}
            />
          </div>
        </div>
        
        {loading && <p className="text-center">{t('routes.products.loading')}</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <div className="space-y-8">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => {
                  console.log('Rendering product:', { 
                    id: product.id, 
                    productName: product.productName,
                    clientName: product.clientName 
                  });
                  return (
                    <ProductCard
                      key={product.id}
                      {...product}
                      onDelete={() => handleDelete(product.id)}
                      role={employee?.role || ""}
                    />
                  );
                })
              ) : (
                <p className="text-center text-gray-500">{t('routes.products.noProducts')}</p>
              )}
            </div>

            {filteredProducts.length > productsPerPage && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalCustomers={filteredProducts.length}
                  customersPerPage={productsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
