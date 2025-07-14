import React from 'react';

interface DoctorModalProps {
    doctor:any;
    onClose:() => void;
}

const DoctorModal: React.FC<DoctorModalProps> = ({ doctor , onClose }) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center'>
            <div className='bg-white rounded-x1 shadow-x1 p-8 w-[90%] max-w-md relative'>
                <button 
                className='absolute top-2 right-2 text-gray-500 hover:text-red-500'
                onClick={onClose}
                >
                    ✕
                </button>
                <h2 className='text-2x1 font-bold mb-4 text-blue-900'>{doctor.name}</h2>
                <p><strong>Specialization:</strong>{doctor.specialization}</p>
                <p><strong>Available:</strong>{doctor.isAvailable ? "Yes" : "No"}</p>

            </div>
        </div>
    );
};

export default DoctorModal;