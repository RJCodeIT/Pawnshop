import AddCustomerForm from "../containers/AddCustomerForm";
import { useTranslation } from "react-i18next";

export default function AddCustomer() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">{t('routes.add.customer')}</h1>
      <AddCustomerForm />
    </div>
  );
}
