import { motion, AnimatePresence } from "framer-motion";
import {
  FaHospital,
  FaTimes,
  FaPhone,
} from "react-icons/fa";

interface HospitalModalProps {
  isOpen: boolean;
  hospital: {
    _id: string;
    name: string;
    type: string;
    address: string;
    city: string;
    phone: string;
    timetable: string;
    medicationsOffered: string[];
    doctors: { name: string }[];
    specialists: string[];
  } | null;
  onClose: () => void;
}

const HospitalModal: React.FC<HospitalModalProps> = ({
  isOpen,
  hospital,
  onClose,
}) => {
  if (!hospital) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
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

              {/* Hospital Header */}
              <div className="mb-4 space-y-1">
                <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                  <FaHospital className="text-teal-500" />
                  {hospital.name} – {hospital.type}
                </h2>
                <p className="text-sm text-gray-700 font-medium">
                  <span className="text-teal-600">{hospital.city}</span>, {hospital.address}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <FaPhone className="text-teal-400" />
                  <span>+91 {hospital.phone}</span>
                </div>
              </div>

              {/* Detail Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Timetable */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h4 className="text-sm text-gray-500 font-semibold mb-2">
                    Timetable
                  </h4>
                  <p className="text-sm text-gray-700">{hospital.timetable}</p>
                </div>

                {/* Medications Offered */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h4 className="text-sm text-gray-500 font-semibold mb-2">
                    Medications Offered
                  </h4>
                  {hospital.medicationsOffered.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {hospital.medicationsOffered.map((med, i) => (
                        <li key={i}>{med}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">Not specified</p>
                  )}
                </div>

                {/* Doctors */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h4 className="text-sm text-gray-500 font-semibold mb-2">
                    Associated Doctors
                  </h4>
                  {hospital.doctors.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {hospital.doctors.map((doc, i) => (
                        <li key={i}>{doc.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No doctors listed</p>
                  )}
                </div>

                {/* Specialists */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h4 className="text-sm text-gray-500 font-semibold mb-2">
                    Specialists Available
                  </h4>
                  {hospital.specialists.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {hospital.specialists.map((spec, i) => (
                        <li key={i}>{spec}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No specialists listed</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HospitalModal;

