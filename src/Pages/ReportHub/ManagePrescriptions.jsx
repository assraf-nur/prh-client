import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthProvider';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

export default function ManagePrescriptions() {

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const imageHostKey = process.env.REACT_APP_imagebb_key;
  const { user } = useContext(AuthContext);

  const handlePrescriptionUpload = (data) => {
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
          const prescription = {
            image: imgData.data.url,
            details: data.details,
            email: user.email
          }

          fetch('http://localhost:5000/prescriptions', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(prescription)
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
              document.getElementById("prescription-adding-form").reset();
              refetch();
            })

        }
      })
  }

  const url = `http://localhost:5000/prescriptions?email=${user?.email}`

  const { data: prescriptions = [], refetch } = useQuery({
    queryKey: ['prescriptions', user?.email],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    }
  })

  const handleDeletePrescriptions = prescription => {
    fetch(`http://localhost:5000/prescriptions/${prescription._id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to delete prescription');
        }
        return res.json();
      })
      .then(data => {
        if (data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Prescription has been deleted',
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
          title: 'Failed to delete Prescription',
          showConfirmButton: false,
          timer: 1500
        });
      });
  };

  return (
    <div className='ms-2'>
      <h3 className='text-2xl'>Manage Prescriptions</h3>
      <div>
        <form id='prescription-adding-form' onSubmit={handleSubmit(handlePrescriptionUpload)} action="">
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
              {prescriptions?.map((report, i) => (
                <tr key={i}>
                  <th style={{ width: '5%' }}>{i + 1}</th>
                  <td style={{ width: '10%' }}>
                    <div className="avatar">
                      <div className="w-24">
                        <img src={report.image} alt="" />
                      </div>
                    </div>
                  </td>
                  <td style={{ width: '35%' }} className="w-[50px] h-[50px] overflow-auto">
                    <div style={{ maxWidth: '100px', maxHeight: '100px' }}>{report.details}</div>
                  </td>
                  <td style={{ width: '5%' }}>
                    <button onClick={() => handleDeletePrescriptions(prescriptions)} className="btn btn-xs btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
