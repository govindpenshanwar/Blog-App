import React from 'react'
import AllUserPage from './AllUserPage'

function AdminPanelPage() {
    return (
        <div className='mt-20'>
            <p className="font-semibold text-xl font-sans text-center">Admin Panel</p>
            <div>
                <AllUserPage />
            </div>
        </div>
    )
}

export default AdminPanelPage
