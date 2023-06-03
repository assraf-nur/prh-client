import { useQuery } from '@tanstack/react-query';
import React from 'react'

export default function AllUsers() {

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            return data;
        }
    })

    const handleMakeAdmin = id => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                refetch();
                console.log(data);
            })
    }

    return (
        <div>
            <h3 className='text-2xl'>All Users</h3>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, i) =>
                                <tr key={user._id}>
                                    <td>{i + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className='btn btn-xs btn-danger'>Delete</button>
                                    </td>
                                    <td>
                                        {
                                            user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>
                                        }
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}
