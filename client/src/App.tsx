import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/auth/AdminLogin";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Home from "./pages/Home";
import UserAuth from "./pages/auth/UserAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admins/login" element={<AdminLogin />} />
        <Route path="/user/auth" element={<UserAuth />} />
        <Route
          path="/admins/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <div className="text-center text-red-500 mt-10">
              {" "}
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
