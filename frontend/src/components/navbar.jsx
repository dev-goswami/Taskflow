import { useState } from "react";

function Navbar({ onLogout }) {
    const [open, setOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="w-[180px] rounded-md border border-border bg-surface p-2">
            <button
                className="w-full rounded-md px-2 py-2 text-center text-text transition-colors hover:bg-surface-hover"
                onClick={() => setOpen(!open)}
            >
                {user.name} ▼
            </button>

            {open && (
                <div className="mt-1 flex  flex-col border-t border-border text-left pt-1">
                    <span className="w-full truncate px-2 py-2 text-left text-sm text-muted">
                        {user.email}
                    </span>
                    <button className="w-full rounded-md px-2 py-0.5 text-left text-sm text-text transition-colors hover:bg-surface-hover">
                        Settings
                    </button>
                    <button
                        className="w-full rounded-md px-2 py- text-left text-sm text-danger transition-colors hover:bg-surface-hover"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default Navbar;
