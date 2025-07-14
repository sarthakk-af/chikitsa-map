import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Stethoscope, Hospital } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to log out?");
    if (confirm) {
      localStorage.removeItem("token");
      navigate("/admins/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex flex-col items-center justify-center px-4 py-10 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-blue-900 text-center mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Manage doctors and hospitals with ease.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admins/doctors")}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-xl shadow-md px-6 py-4 hover:bg-teal-50 transition"
          >
            <Stethoscope className="text-teal-600 mb-2" size={36} />
            <span className="text-lg font-semibold text-gray-800">
              Manage Doctors
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admins/hospitals")}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-xl shadow-md px-6 py-4 hover:bg-teal-50 transition"
          >
            <Hospital className="text-blue-900 mb-2" size={36} />
            <span className="text-lg font-semibold text-gray-800">
              Manage Hospitals
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-xl shadow-md px-6 py-4 hover:bg-red-50 transition"
          >
            <LogOut className="text-red-600 mb-2" size={36} />
            <span className="text-lg font-semibold text-red-600">Logout</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
