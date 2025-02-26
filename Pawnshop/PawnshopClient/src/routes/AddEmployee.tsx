import AddEmployeeForm from "../containers/AddEmployeeForm";
import { useTranslation } from "react-i18next";

export default function AddEmployee() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">{t('routes.add.employee')}</h1>
      <AddEmployeeForm />
    </div>
  );
}
