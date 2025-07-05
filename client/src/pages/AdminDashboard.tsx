import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admins/login");
  };

  return (
    <div className="container mt-5">
      <h2> Welcome to the Admin Dashboard</h2>
      <p>Manage doctors and hospitals from here.</p>

      <div className="mt-4">
        <button
          className="btn btn-outline-primary-me-3"
          onClick={() => navigate("/admins/doctors")}
        >
          🩺 Manage Doctors
        </button>
        <button
          className="btn btn-outline-success me-3"
          onClick={() => navigate("/admins/hopitals")}
        >
          🏥 Manage Hospitals
        </button>
        <button className="btn btn-danger" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
};


export default AdminDashboard;