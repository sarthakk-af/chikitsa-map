import React from "react";

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
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-x1 shadow-md transition-all duration-300 border-t-4 border-teal-500 cursor-pointer hover:shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-x1 font-semibold text-blue-900">{doctor.name}</h4>
        <span className="text-sm px-3 py-1 bg-teal-100 text-teal-600 rounded-full font-medium">
          {doctor.isAvailable ? "Available" : "Unavailable"}
        </span>
        <p className="text-gray-600 text-sm mb-2">{doctor.specialization}</p>
        <p className="text-sm text-gray-500 mb-2">
          Experience:{" "}
          <span className="font-medium text-gray-700">
            {doctor.experienceYears} + years
          </span>
        </p>
        <span className="text-teal-500 hover:text-teal-600 font-medium text-sm">
            View Profile →
        </span>
      </div>
    </div>
  );
};


export default DoctorCard;