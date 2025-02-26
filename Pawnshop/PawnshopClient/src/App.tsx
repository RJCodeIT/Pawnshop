import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Dashboard from "./routes/Dashboard";
import Login from "./routes/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";

export default function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <Routes>
          <Route path="/pawnshop/" element={<Home />} />
          <Route path="/pawnshop/home" element={<Home />} />
          <Route path="/pawnshop/login" element={<Login />} />
          <Route
            path="/pawnshop/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </AlertProvider>
  );
}
