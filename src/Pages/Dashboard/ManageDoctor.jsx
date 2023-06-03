import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import Loading from '../Shared/Loading';
import Swal from 'sweetalert2';
import ConfirmationModal from './ConfirmationModal';

export default function ManageDoctor() {
    const [deletingDoctor, setDeletingDoctor] = useState(null);

    const closeModal = () => {
        setDeletingDoctor(null);
    }

    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    // const handleDeleteDoctor = doctor => {
    //     fetch(`http://localhost:5000/doctors/${doctor._id}`, {
    //         method: 'DELETE',
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.deletedCount > 0) {
    //                 refetch();
    //                 Swal.fire({
    //                     position: 'center',
    //                     icon: 'success',
    //                     title: 'Doctor has been deleted',
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 })
    //             }
    //         })
    // }

    const handleDeleteDoctor = doctor => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to delete doctor');
                }
                return res.json();
            })
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Doctor has been deleted',
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
                    title: 'Failed to delete doctor',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };


    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className="text-3xl">Manage Doctors: {doctors?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img src={doctor.image} alt="" />
                                    </div>
                                </div></td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td>
                                    <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingDoctor.name}. It cannot be undone.`}
                    successAction={handleDeleteDoctor}
                    successButtonName="Delete"
                    modalData={deletingDoctor}
                    closeModal={closeModal}
                >
                </ConfirmationModal>
            }
        </div>
    )
}
