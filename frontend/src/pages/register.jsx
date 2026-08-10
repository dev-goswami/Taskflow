import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        document.body.className = "dark";
    }, []);

    async function handleRegister(e) {
        e.preventDefault();
        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }
        try {
            const response = await fetch(
                `${import.meta.env.VITE_AUTH_URL}/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "user",
                JSON.stringify({
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                }),
            );

            setName("");
            setEmail("");
            setPassword("");

            navigate("/");

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 text-text">
            <form
                className="flex w-full max-w-[400px] flex-col gap-4 rounded-xl border border-border bg-surface p-6 sm:p-8"
                onSubmit={handleRegister}
            >
                <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">
                    Create Account
                </h2>
                <input
                    className="w-full rounded-lg border border-border bg-background px-3 py-3 text-text outline-none placeholder:text-muted"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                />

                <input
                    className="w-full rounded-lg border border-border bg-background px-3 py-3 text-text outline-none placeholder:text-muted"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />

                <input
                    className="w-full rounded-lg border border-border bg-background px-3 py-3 text-text outline-none placeholder:text-muted"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />

                <button
                    type="submit"
                    className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-background transition-colors duration-200 hover:bg-primary-hover"
                >
                    Create Account
                </button>

                <p className="text-center text-sm text-muted">
                    Already have an account?{" "}
                    <Link
                        className="font-medium text-primary hover:underline"
                        to="/login"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
