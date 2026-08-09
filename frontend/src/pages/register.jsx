import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }
        try {
            const response = await fetch(
                "http://localhost:5000/api/users/register",
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

            setName("");
            setEmail("");
            setPassword("");

            navigate("/login");

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <h2>Create Account</h2>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                />

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />

                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />

                <button type="submit" className="register-btn">
                    Create Account
                </button>

                <p className="auth-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
