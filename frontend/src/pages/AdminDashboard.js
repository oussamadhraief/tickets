import React from 'react'

export default function AdminDashboard() {
  return (
    <div className="flex">

    <div className="bg-black min-h-screen w-64 px-4 py-8">
        <div className="text-white mb-8 text-2xl font-semibold">AdminPro</div>
        <nav className="mt-10">
            <a className="text-gray-300 py-2 px-4 flex items-center transition-colors duration-200 relative block hover:text-white" href="#">
                <span className="inline-block ml-4">Dashboard</span>
            </a>
            <a className="text-gray-300 py-2 px-4 flex items-center transition-colors duration-200 relative block hover:text-white" href="#">
                <span className="inline-block ml-4">Users</span>
            </a>
            <a className="text-gray-300 py-2 px-4 flex items-center transition-colors duration-200 relative block hover:text-white" href="#">
                <span className="inline-block ml-4">Settings</span>
            </a>
            <a className="text-gray-300 py-2 px-4 flex items-center transition-colors duration-200 relative block hover:text-white" href="#">
                <span className="inline-block ml-4">Reports</span>
            </a>
        </nav>
    </div>

    <div className="flex-1 p-10 text-2xl font-bold">
        <header className="flex justify-between items-center py-4 px-6 bg-gray-800 text-white">
            <h1 className="font-bold">Dashboard</h1>
            <div className="flex items-center">
                <img className="h-10 w-10 rounded-full" src="https://placehold.co/40x40" alt="Admin avatar"/>
            </div>
        </header>

        <main className="my-8">
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <div className="dashboard-card p-4">
                    <div className="flex items-center">
                        <div className="p-3 mr-4 text-white bg-black rounded-full">
                            <i className="fas fa-users fa-lg"></i>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-600">Total Users</p>
                            <p className="text-lg font-semibold text-gray-700">340</p>
                        </div>
                    </div>
                </div>
                <div className="dashboard-card p-4">
                    <div className="flex items-center">
                        <div className="p-3 mr-4 text-white bg-black rounded-full">
                            <i className="fas fa-folder-open fa-lg"></i>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-600">Projects</p>
                            <p className="text-lg font-semibold text-gray-700">42</p>
                        </div>
                    </div>
                </div>
                <div className="dashboard-card p-4">
                    <div className="flex items-center">
                        <div className="p-3 mr-4 text-white bg-black rounded-full">
                            <i className="fas fa-shopping-cart fa-lg"></i>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-600">Orders</p>
                            <p className="text-lg font-semibold text-gray-700">1,337</p>
                        </div>
                    </div>
                </div>
                <div className="dashboard-card p-4">
                    <div className="flex items-center">
                        <div className="p-3 mr-4 text-white bg-black rounded-full">
                            <i className="fas fa-money-bill-wave fa-lg"></i>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-600">Earnings</p>
                            <p className="text-lg font-semibold text-gray-700">$24,500</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 mb-8 md:grid-cols-1">
                <div className="dashboard-card p-4">
                    <h2 className="mb-4 text-xl font-semibold text-gray-600">Revenue Overview</h2>
                    <div className="h-64 rounded-lg bg-gray-200 text-center flex items-center justify-center">
                        <span>Chart goes here</span>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>
  )
}
