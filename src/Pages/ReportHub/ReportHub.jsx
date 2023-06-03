import React from 'react'
import { Link } from 'react-router-dom'

export default function ReportHub() {
    return (
        <div className="h-screen">
            <div className="grid grid-cols-6 gap-2 h-[800px]">
                <div className="col-span-3 bg-[#4c54667e] p-4 relative">
                    <div className="flex justify-between overflow-auto">
                        <img className="w-20 h-20" src="image1.jpg" alt="Imag" />
                        <img className="w-20 h-20" src="image2.jpg" alt="Imag" />
                        <img className="w-20 h-20" src="image3.jpg" alt="Imag" />
                    </div>
                    <Link className="absolute bottom-2 left-[30%] bg-slate-800 text-white px-24 py-2 rounded" to='/dashboard/manage-report-hub'>Manage Reports</Link>
                </div>
                <div className="col-span-3 bg-[#4c54667e] p-4 relative">
                    <div className="flex justify-between overflow-auto">
                        <img className="w-20 h-20" src="image4.jpg" alt="Imag" />
                        <img className="w-20 h-20" src="image5.jpg" alt="Imag" />
                        <img className="w-20 h-20" src="image6.jpg" alt="Imag" />
                    </div>
                    <Link className="absolute bottom-2 left-[30%] bg-slate-800 text-white px-24 py-2 rounded" to='/dashboard/manage-prescription'>Manage Prescriptions</Link>
                </div>
            </div>
        </div>
    )
}
