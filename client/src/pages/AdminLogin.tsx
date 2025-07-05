import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


const handleLogin = async () => {
   try {
    const res = await api.post("/api/admins/loginAdmin", { email, password });
    const token = res.data.token;

    // Decode the token to check role
    const decoded = JSON.parse(atob(token.split('.')[1]));

    if (decoded?.role !== "admin") {
      alert("Access denied: You are not an admin!");
      return;
    }

    localStorage.setItem("token", token);
    alert("Login Successful!");
    navigate("/admins/dashboard");

  } catch (err: any) {
    alert(err.response?.data?.message || "Login failed");
  }
};
  return (
    <div className="container mt-5">
      <h2>Admin Login</h2>
      <input
        className="form-control my-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="form-control my-2"
        placeholder="Password"
         type='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default AdminLogin;
