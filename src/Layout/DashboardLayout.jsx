import React, { useContext } from 'react'
import Navbar from '../Pages/Shared/Navbar'
import { Link, Outlet } from 'react-router-dom'
import useAdmin from '../Hook/useAdmin'
import { AuthContext } from '../Context/AuthProvider'

export default function DashboardLayout() {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    
    return (
        <div className='container mx-auto'>
            <Navbar />
            <div class="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content mt-5 px-3">
                    <Outlet></Outlet>
                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" class="drawer-overlay"></label>
                    <ul class="menu p-4 overflow-y-auto w-80 bg-slate-100 text-base-content">
                        <li><Link to='/dashboard'>My Appointments</Link></li>
                        <li><Link to='/dashboard/manage-report-hub'>Manage Reports</Link></li>
                        <li><Link to='/dashboard/manage-prescription'>Manage Prescriptions</Link></li>
                        {
                            isAdmin && <>
                                <li><Link to='/dashboard/allUsers'>All Users</Link></li>
                                <li><Link to='/dashboard/adddoctor'>Add Doctor</Link></li>
                                <li><Link to='/dashboard/manage-doctor'>Manage Doctor</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
