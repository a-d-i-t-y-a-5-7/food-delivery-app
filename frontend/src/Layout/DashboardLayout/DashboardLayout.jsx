import React from 'react';
import './DashboardLayout.css'; // Import the CSS file for styling

const DashboardLayout = () => {
    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>FOODLIE</h2>
                </div>
                <ul className="sidebar-menu">
                    <li>Dashboard</li>
                    <li>Menu</li>
                    <li>Orders</li>
                    <li>Notification</li>
                    <li>Chats</li>
                    <li>Analytics</li>
                </ul>
                <div className="logout">
                    <button>Logout</button>
                </div>
            </aside>
            <main className="main-content">
                <header className="topbar">
                    <div className="search-bar">
                        <input type="text" placeholder="Search..." />
                        <button>🔍</button>
                    </div>
                    <div className="topbar-icons">
                        <button>🔔</button>
                        <button>💬</button>
                        <div className="user-profile">
                            <img src="profile.jpg" alt="Profile" />
                            <span>Brain Lee</span>
                            <span>Owner</span>
                        </div>
                    </div>
                </header>
                <div className="content-area">
                    {/* Content goes here */}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
