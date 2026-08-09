import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import TaskInput from "../components/taskInput";
import TaskList from "../components/taskList";
import { getTodos, addTask, toggleTask, deleteTask } from "../services/api";

import "../styles/home.css";
import sunIcon from "../assets/brightness.png";
import moonIcon from "../assets/moon.png";

function Home() {
    const [tasks, setTasks] = useState([]);
    const [theme, setTheme] = useState("dark");
    const navigate = useNavigate();

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }
        loadTodos();
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    async function loadTodos() {
        const todos = await getTodos();
        setTasks(todos);
    }

    async function handleAddTask(task) {
        await addTask(task);
        await loadTodos();
    }

    async function handleToggleTask(id, completed) {
        await toggleTask(id, completed);

        await loadTodos();
    }

    async function handleDeleteTask(id) {
        await deleteTask(id);

        await loadTodos();
    }
    //toggleTheme
    function toggleTheme() {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    }

    return (
        <div className="container">
            <nav>
                <button className="themeBtn" onClick={toggleTheme}>
                    <img
                        src={theme === "dark" ? sunIcon : moonIcon}
                        alt="Toggle theme"
                    />
                </button>
                <Navbar onLogout={handleLogout} />
            </nav>

            <div className="app-container">
                <h1>Taskflow</h1>
                <TaskInput addTask={handleAddTask} />
                <TaskList
                    tasks={tasks}
                    deleteTask={handleDeleteTask}
                    toggleTask={handleToggleTask}
                />
            </div>
        </div>
    );
}

export default Home;
