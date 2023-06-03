import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthProvider';

export default function ReportHub() {
    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/reports?email=${user?.email}`

    const { data: reports = [] } = useQuery({
        queryKey: ['reports', user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    })

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
                <div className="col-span-3 bg-[#4c54667e] p-4 relative overflow-auto h-[75%]">
                    <div className="grid grid-cols-3 gap-4">
                        {reports.map(report => (
                            // <div className="card bg-base-100 shadow-xl">
                            //     <figure><img src={report.image} alt="Shoes" /></figure>
                            //     <div className="card-body">
                            //         <p>{report.details}</p>
                            //     </div>
                            // </div>
                            <div
                                className="card bg-base-100 shadow-xl"
                                key={report._id}
                                onClick={() =>
                                    handleCardClick(report.image, report.details)
                                }
                            >
                                <figure>
                                    <img src={report.image} alt="Shoes" />
                                </figure>
                                <div className="card-body">
                                    <p>{report.details}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Link className="absolute bottom-2 left-[20%] bg-slate-800 text-white px-24 py-2 rounded" to='/dashboard/manage-report-hub'>Manage Reports</Link>
                <div className="col-span-3 bg-[#4c54667e] p-4 relative">
                    <div className="flex justify-between overflow-auto">
                        <img className="w-20 h-20" src="image4.jpg" alt="Imag" />
                        <img className="w-20 h-20" src="image5.jpg" alt="Imag" />
                        <img className="w-20 h-20" src="image6.jpg" alt="Imag" />
                    </div>
                    <Link className="absolute bottom-2 left-[30%] bg-slate-800 text-white px-24 py-2 rounded" to='/dashboard/manage-prescription'>Manage Prescriptions</Link>
                </div>
            </div>
            {/* Preview Modal */}
            {selectedImage && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-4 max-w-md">
                        <img src={selectedImage} alt="Preview" className="mb-4" />
                        <p>{selectedDetails}</p>
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
    )
}
