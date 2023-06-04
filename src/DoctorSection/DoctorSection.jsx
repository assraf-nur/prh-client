import axios from 'axios';
import React, { useState } from 'react';

export default function DoctorSection() {
    const [email, setEmail] = useState('');
    const [reports, setReports] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedDetails, setSelectedDetails] = useState('');

    const handleCardClick = (image, details) => {
        setSelectedImage(image);
        setSelectedDetails(details);
    };

    const handleSearch = async () => {
        try {
            const responseReports = await axios.get(`http://localhost:5000/reports/search?email=${email}`);
            setReports(responseReports.data);
            const responsePrescriptions = await axios.get(`http://localhost:5000/prescriptions?email=${email}`);
            setPrescriptions(responsePrescriptions.data);
            console.log('Reports:', responseReports.data);
            console.log('Prescriptions:', responsePrescriptions.data);
        } catch (error) {
            console.error('Error searching reports and prescriptions:', error);
        }
    };

    const handleFullScreen = () => {
        window.open(selectedImage);
    };

    return (
        <div>
            <div className='mt-8'>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-64 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Search
                </button>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-8">
                <div>
                    <h2 className='text-2xl mb-4'>Reports:</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {reports.map(report => (
                            <div
                                className="card bg-base-100 shadow-xl cursor-pointer"
                                key={report._id}
                                onClick={() => handleCardClick(report.image, report.details)}
                            >
                                <figure>
                                    <img src={report.image} alt="Report" />
                                </figure>
                                <div className="card-body">
                                    <p className="card-details break-words">{report?.details}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className='text-2xl mb-4'>Prescriptions:</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {prescriptions.map(prescription => (
                            <div
                                className="card bg-base-100 shadow-xl cursor-pointer"
                                key={prescription._id}
                                onClick={() => handleCardClick(prescription.image, prescription.details)}
                            >
                                <figure>
                                    <img src={prescription.image} alt="Prescription" />
                                </figure>
                                <div className="card-body">
                                    <p className="card-details break-words">{prescription?.details}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedImage && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-4 max-w-md rounded-2xl">
                        <img src={selectedImage} alt="Preview" className="mb-4 rounded-2xl" />
                        <p className="break-words">{selectedDetails}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleFullScreen}
                            >
                                Make Full Screen
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={() => {
                                    setSelectedImage('');
                                    setSelectedDetails('');
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
