import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaUserMd,
  FaClock,
  FaHospitalSymbol,
  FaGraduationCap,
  FaCalendarAlt,
} from "react-icons/fa";

interface DoctorModalProps {
  isOpen: boolean;
  doctor: {
    _id: string;
    name: string;
    age: number;
    specialization: string;
    experienceYears: number;
    qualifications: string[];
    availableDays: string[];
    timings: { day: string; from: string; to: string }[];
    isAvailable: boolean;
    profileImage?: string;
    hospitals?: { name: string }[];
  } | null;
  onClose: () => void;
}

const DoctorModal: React.FC<DoctorModalProps> = ({
  isOpen,
  doctor,
  onClose,
}) => {
  if (!doctor) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 md:p-8 relative overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors"
                aria-label="Close modal"
              >
                <FaTimes size={20} />
              </button>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Image */}
                <div className="md:w-1/3 w-full">
                  <img
                    src={doctor.profileImage || "/default-doctor.png"}
                    alt={doctor.name}
                    className="w-full h-auto rounded-xl shadow-md object-cover"
                  />
                </div>

                {/* Info Section */}
                <div className="flex-1 space-y-4">
                  {/* Name & Age */}
                  <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                    <FaUserMd className="text-teal-500" />
                    {doctor.name}, {doctor.age}
                  </h2>

                  {/* Specialization & Experience */}
                  <p className="text-gray-700 text-sm font-medium">
                    <span className="text-teal-600">
                      {doctor.specialization}
                    </span>{" "}
                    with {doctor.experienceYears}+ years experience
                  </p>

                  {/* Availability */}
                  <div className="text-sm">
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-medium transition-all ${
                        doctor.isAvailable
                          ? "bg-teal-100 text-teal-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {doctor.isAvailable
                        ? "Currently Available"
                        : "Not Available"}
                    </span>
                  </div>

                  {/* Details Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Qualifications */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <h4 className="text-sm text-gray-500 mb-2 flex items-center gap-2 font-semibold">
                        <FaGraduationCap className="text-gray-400" />
                        Qualifications
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-1">
                        {doctor.qualifications.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Timings */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <h4 className="text-sm text-gray-500 mb-2 flex items-center gap-2 font-semibold">
                        <FaClock className="text-gray-400" />
                        Weekly Timings
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {doctor.timings.map((slot, i) => (
                          <li key={i}>
                            <span className="font-medium">{slot.day}:</span>{" "}
                            {slot.from} – {slot.to}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Available Days */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <h4 className="text-sm text-gray-500 mb-2 flex items-center gap-2 font-semibold">
                        <FaCalendarAlt className="text-gray-400" />
                        Available Days
                      </h4>
                      <p className="text-sm text-gray-700">
                        {doctor.availableDays.join(", ")}
                      </p>
                    </div>

                    {/* Hospitals */}
                    {doctor.hospitals && doctor.hospitals.length > 0 && (
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <h4 className="text-sm text-gray-500 mb-2 flex items-center gap-2 font-semibold">
                          <FaHospitalSymbol className="text-gray-400" />
                          Affiliated Hospitals
                        </h4>
                        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                          {doctor.hospitals.map((h, i) => (
                            <li key={i}>{h.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DoctorModal;
