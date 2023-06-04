import axios from 'axios';
import React, { useState } from 'react'

export default function DoctorSection() {
    const [email, setEmail] = useState("");
    const [reports, setReports] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedDetails, setSelectedDetails] = useState('');

    const handleCardClick = (image, details) => {
        setSelectedImage(image);
        setSelectedDetails(details);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/reports/search?email=${email}`);
            setReports(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error searching reports:', error);
        }
    };

    // const handleDownload = () => {
    //     const link = document.createElement('a');
    //     link.href = selectedImage;
    //     link.setAttribute('download', 'image.jpg');
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

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


                <h2 className='mt-8 text-2xl'>Reports:</h2>
                <div className="col-span-3 bg-[#4c54667e] p-5 relative overflow-auto h-screen rounded-2xl">
                    <div className="grid grid-cols-3 gap-4">
                        {reports.map(report => (
                            <div
                                className="card bg-base-100 shadow-xl cursor-pointer w-25"
                                key={report._id}
                                onClick={() =>
                                    handleCardClick(report.image, report.details)
                                }
                            >
                                <figure>
                                    <img src={report.image} alt="Shoes" />
                                </figure>
                                <div className="card-body">
                                    <p className="card-details break-words">{report?.details}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {selectedImage && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-4 max-w-md">
                        <img src={selectedImage} alt="Preview" className="mb-4" />
                        <p className='break-words'>{selectedDetails}</p>
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
    )
}
