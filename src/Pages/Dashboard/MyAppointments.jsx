import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthProvider'
import { useQuery } from '@tanstack/react-query';

export default function MyAppointments() {

  const { user } = useContext(AuthContext);

  
  const url = `http://localhost:5000/bookings?email=${user?.email}`

  const { data: bookings = [] } = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    }
  })

  return (
    <div>
      <h3 className='text-2xl'>My Appointments</h3>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {
              bookings?.map((booking, index) =>
                <tr key={booking._id}>
                  <th>{index + 1}</th>
                  <td>{booking.patient}</td>
                  <td>{booking.treatment}</td>
                  <td>{booking.appointmentDate}</td>
                  <td>{booking.slot}</td>
                </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
