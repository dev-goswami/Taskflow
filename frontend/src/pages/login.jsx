import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        document.body.className = "dark";
    }, []);

    async function handleLogin(e) {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_AUTH_URL}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
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

            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 text-text">
            <form
                className="flex w-full max-w-[400px] flex-col gap-4 rounded-xl border border-border bg-surface p-6 sm:p-8"
                onSubmit={handleLogin}
            >
                <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">
                    Welcome Back
                </h2>

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
                    className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-background transition-colors duration-200 hover:bg-primary-hover"
                    type="submit"
                >
                    Login
                </button>

                <p className="text-center text-sm text-muted">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-primary hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
