import AddProductForm from "../containers/AddProductForm";
import { useTranslation } from "react-i18next";

export default function AddProduct() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-8">{t('routes.add.product')}</h1>
      <AddProductForm />
    </div>
  );
}
