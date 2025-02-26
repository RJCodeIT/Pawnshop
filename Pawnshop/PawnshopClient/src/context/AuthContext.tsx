import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

type Employee = {
  firstName: string;
  lastName: string;
  login: string;
  role: string;
};

type AuthContextType = {
  employee: Employee | null;
  login: (login: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (login: string, password: string) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, { login, password });
    const employeeData = response.data;
    setEmployee(employeeData);

    // Set session data in `localStorage` for 9 hours
    localStorage.setItem("employee", JSON.stringify(employeeData));
    localStorage.setItem("loginExpiration", (Date.now() + 9 * 60 * 60 * 1000).toString());

    // Set automatic logout after 9 hours
    setTimeout(() => {
      logout();
    }, 9 * 60 * 60 * 1000); // 9h
  };

  const logout = () => {
    setEmployee(null);
    localStorage.removeItem("employee");
    localStorage.removeItem("loginExpiration");
  };

  useEffect(() => {
    const storedEmployee = localStorage.getItem("employee");
    const expiration = localStorage.getItem("loginExpiration");

    if (storedEmployee && expiration) {
      const expirationTime = parseInt(expiration);

      if (Date.now() < expirationTime) {
        setEmployee(JSON.parse(storedEmployee));
      } else {
        logout();
      }
    }
    setLoading(false); 
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <AuthContext.Provider value={{ employee, login, logout, isAuthenticated: !!employee }}>
      {children}
    </AuthContext.Provider>
  );
};
