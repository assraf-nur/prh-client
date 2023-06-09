import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

export default function ReportHub() {
    const { user } = useContext(AuthContext);

    const reportsUrl = `http://localhost:5000/reports?email=${user?.email}`;
    const prescriptionsUrl = `http://localhost:5000/prescriptions?email=${user?.email}`;

    const { data: reports = [] } = useQuery({
        queryKey: ['reports', user?.email],
        queryFn: async () => {
            const res = await fetch(reportsUrl);
            const data = await res.json();
            return data;
        }
    });

    const { data: prescriptions = [] } = useQuery({
        queryKey: ['prescriptions', user?.email],
        queryFn: async () => {
            const res = await fetch(prescriptionsUrl);
            const data = await res.json();
            return data;
        }
    });

    const [selectedImage, setSelectedImage] = useState('');
    const [selectedDetails, setSelectedDetails] = useState('');

    const handleCardClick = (image, details) => {
        setSelectedImage(image);
        setSelectedDetails(details);
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = selectedImage;
        link.setAttribute('download', 'image.jpg');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="h-screen">
            <div className="grid grid-cols-6 gap-2">
                <div className="col-span-3 bg-[#4c54667e] p-5 relative overflow-auto h-screen">
                    <div className="grid grid-cols-3 gap-4">
                        {reports.map(report => (
                            <div
                                className="card bg-base-100 shadow-xl cursor-pointer"
                                key={report._id}
                                onClick={() =>
                                    handleCardClick(report.image, report.details)
                                }
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

                <Link
                    className="absolute bottom-2 left-[20%] bg-slate-800 text-white px-24 py-2 rounded"
                    to="/dashboard/manage-report-hub"
                >
                    Manage Reports
                </Link>

                <div className="col-span-3 bg-[#4c54667e] p-5 relative overflow-auto h-screen">
                    <div className="grid grid-cols-3 gap-4">
                        {prescriptions.map(prescription => (
                            <div
                                className="card bg-base-100 shadow-xl cursor-pointer"
                                key={prescription._id}
                                onClick={() =>
                                    handleCardClick(prescription.image, prescription.details)
                                }
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

                    <Link
                        className="absolute bottom-20 left-[20%] bg-slate-800 text-white px-24 py-2 rounded"
                        to="/dashboard/manage-prescription"
                    >
                        Manage Prescriptions
                    </Link>
                </div>
            </div>

            {/* Preview Modal */}
            {selectedImage && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-4 max-w-md rounded-2xl">
                        <img src={selectedImage} alt="Preview" className="mb-4 rounded-2xl" />
                        <p className="break-words">{selectedDetails}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleDownload}
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
