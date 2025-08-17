import React from "react";
import { motion } from "framer-motion";
import { FaClock, FaStethoscope, FaUserMd } from "react-icons/fa";

interface DoctorCardProps {
  doctor: {
    _id: string;
    name: string;
    specialization: string;
    experienceYears: number;
    isAvailable: boolean;
  };
  onClick: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onClick }) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
        boxShadow: "0 20px 50px rgba(10,10,10,0.1)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-white rounded-2xl p-8 border-t-4 border-teal-400 hover:border-teal-900 curson-pointer shadow-md hover:shadow-xl transition-all"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xl font-semibold text-blue-900 flex items-center gap-2">
          <FaUserMd className="text-teal-500" />
          {doctor.name}
        </h4>
        <span
          className={`text-sm px-3 py-1 rounded-full font-medium ${
            doctor.isAvailable
              ? "bg-teal-100 text-teal-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {doctor.isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="flex items-center text-gray-700 text-sm mb-2 gap-2">
        <FaStethoscope className="text-teal-400" />
        <span>{doctor.specialization}</span>
      </div>

      <div className="flex items-center text-gray-700 text-sm gap-2">
        <FaClock className="text-teal-400" />
        <span>Experience:{doctor.experienceYears}+ years</span>
      </div>
      <div className="mt-4 text-right">
        <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">
          View Profile →
        </button>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
