import React from 'react'
import Navbar from '../Pages/Shared/Navbar'
import { Link, Outlet } from 'react-router-dom'

export default function DashboardLayout() {
    return (
        <div className='container mx-auto'>
            <Navbar />
            <div class="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content mt-5">
                    <Outlet></Outlet>
                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" class="drawer-overlay"></label>
                    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <li><Link to='/dashboard'>My Appointments</Link></li>
                        <li><Link to='/dashboard/allUsers'>All Users</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
