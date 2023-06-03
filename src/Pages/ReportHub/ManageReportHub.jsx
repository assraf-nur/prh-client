import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


export default function ManageReportHub() {


    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const imageHostKey = process.env.REACT_APP_imagebb_key;

    const handleReportUpload = (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData);
                if (imgData.success) {
                    const report = {
                        image: imgData.data.url,
                        details: data.details
                    }

                    fetch('http://localhost:5000/reports', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(report)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Added a new Report',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            document.getElementById("report-adding-form").reset();
                            refetch();
                        })

                }
            })
    }

    const { data: reports = [], refetch } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/reports');
            const data = await res.json();
            return data;
        }
    })

    const handleDeleteReport = report => {
        fetch(`http://localhost:5000/reports/${report._id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to delete report');
                }
                return res.json();
            })
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Report has been deleted',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                // Handle the error
                console.error(error);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Failed to delete report',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    return (
        <div className='ms-2'>
            <h3 className='text-2xl'>Manage Reports</h3>
            <div>
                <form id='report-adding-form' onSubmit={handleSubmit(handleReportUpload)} action="">
                    <input type="file" {...register("image", {
                        required: "Photo is Required"
                    })} className="input input-bordered w-full max-w-xs" multiple />
                    <br />
                    <textarea {...register("details", {
                        required: "Details is Required"
                    })} className="textarea textarea-bordered mt-5 mb-0 w-[400px]" placeholder="Details of Report"></textarea>
                    <br />
                    <input value="Upload" type="submit" className="input input-bordered bg-primary cursor-pointer mt-3 text-white" />
                </form>
            </div>
            <div className='mt-8'>
                <div className="overflow-x-auto">
                    <table className="table w-[100%]">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Details</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reports?.map((report, i) =>
                                    <tr>
                                        <th>{i + 1}</th>
                                        <td><div className="avatar">
                                            <div className="w-24">
                                                <img src={report.image} alt="" />
                                            </div>
                                        </div></td>
                                        <td>{report.details}</td>
                                        <td>
                                            <button onClick={() => handleDeleteReport(report)} htmlFor="confirmation-modal" className='btn btn-xs btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
