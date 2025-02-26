import { createContext, useState, useContext, ReactNode } from "react";

interface AlertContextProps {
  showAlert: (
    message: string,
    type: "success" | "info" | "error",
    onConfirm?: () => void
  ) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<{
    message: string;
    type: string;
    onConfirm?: () => void;
  } | null>(null);

  const showAlert = (
    message: string,
    type: "success" | "info" | "error",
    onConfirm?: () => void
  ) => {
    setAlert({ message, type, onConfirm });

    const duration = onConfirm ? 10000 : 5000; // 10 seconds for confirmation alerts, 5 seconds for others
    setTimeout(() => {
      setAlert(null);
    }, duration);
  };

  const handleCancel = () => {
    setAlert(null);
  };

  const handleConfirm = () => {
    if (alert?.onConfirm) {
      alert.onConfirm();
    }
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div
            className={`${
              alert.type === "success"
                ? "bg-emerald-600 shadow-emerald-500/30"
                : alert.type === "info"
                ? "bg-blue-600 shadow-blue-500/30"
                : "bg-red-600 shadow-red-500/30"
            } px-6 py-4 rounded-lg shadow-lg max-w-md w-full mx-auto`}
          >
            <div className="flex items-center">
              {/* Ikona dla success */}
              {alert.type === "success" && (
                <svg className="w-6 h-6 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
              {/* Ikona dla info */}
              {alert.type === "info" && (
                <svg className="w-6 h-6 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {/* Ikona dla error */}
              {alert.type === "error" && (
                <svg className="w-6 h-6 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
              <p className="text-white font-medium">{alert.message}</p>
            </div>

            {alert.onConfirm && (
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-white bg-opacity-20 text-white text-sm font-medium rounded-lg
                           hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                           transition-colors duration-200"
                >
                  Anuluj
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-white text-red-600 text-sm font-medium rounded-lg
                           hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                           transition-colors duration-200"
                >
                  Potwierdź
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};
