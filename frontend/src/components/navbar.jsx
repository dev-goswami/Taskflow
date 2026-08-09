import { useState } from "react";

function Navbar({ onLogout }) {
    const [open, setOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="navbar">
            <div className="profile">
                <button className="dropdown-btn" onClick={() => setOpen(!open)}>
                    {user.name} ▼
                </button>

                {open && (
                    <div className="dropdown">
                        <span className="email-display">{user.email}</span>
                        <button className="setting-btn">Settings</button>
                        <button className="logout-btn" onClick={onLogout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
