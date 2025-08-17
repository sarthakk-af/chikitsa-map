import React from "react";
import { motion } from "framer-motion";
import {  FaCity, FaHospitalSymbol, FaPhone } from "react-icons/fa";

interface HospitalCardProps {
  hospital: {
    _id: string;
    name: string;
    type: string;
    phone: string;
    city: string;
  };
  onClick: () => void;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onClick }) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
        boxShadow: " 0 2px 50px rgba(10,10,10,0.1)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-white rounded-2xl  p-8 border-t-4 border-teal-400 hover:border-teal-900 cursor-pointer shadow-md hover:shadow-xl transition-all"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xl font-semibold text-blue-900 flex items-center gap-2">
          <FaHospitalSymbol className="text-teal-500" />
          {hospital.name}
        </h4>
        <span
          className={`text-center px-5 py-3 rounded-full font-medium ${(() => {
            if (hospital.type === "Government")
              return "bg-teal-100 text-teal-700";
            if (hospital.type === "Private")
              return "bg-yellow-100 text-yellow-700";
            if (hospital.type === "Clinic")
              return "bg-violet-100 text-violet-700";
            if (hospital.type === "Charitable")
              return "bg-orange-100 text-orange-700";
            if (hospital.type === "Multispeciality")
              return "bg-green-100 text-green-700";
          })()} `}
        >{hospital.type}</span>
      </div>

      <div className="flex items-center text-gray-700 text-sm gap-2">
        <FaPhone className="text-teal-400" />
        <span>+91 {hospital.phone}</span>
      </div>

      <div className="flex items-center text-gray-700 text-sm mb-2 gap-2">
        <FaCity className="text-teal-400" />
        <span>{hospital.city}</span>
      </div>
    </motion.div>
  );
};

export default HospitalCard;
