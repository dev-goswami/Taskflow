import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import TaskInput from "../components/taskInput";
import TaskList from "../components/taskList";
import { getTodos, addTask, toggleTask, deleteTask } from "../services/api";
import { motion } from "motion/react";

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

    //toggleTheme
    function toggleTheme() {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    }

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    async function loadTodos() {
        try {
            const todos = await getTodos();
            setTasks(todos);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    async function handleAddTask(task) {
        try {
            await addTask(task);
            await loadTodos();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    async function handleToggleTask(id, completed) {
        try {
            await toggleTask(id, completed);

            await loadTodos();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    async function handleDeleteTask(id) {
        try {
            await deleteTask(id);

            await loadTodos();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <motion.div className="min-h-screen flex flex-col items-center bg-background text-text px-4 py-4 sm:px-6">
            <nav className="flex w-full items-start justify-end gap-2.5 pt-2 sm:absolute sm:right-5 sm:top-5 sm:w-auto">
                <div className="pt-1">
                    <button
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-xl"
                        onClick={toggleTheme}
                    >
                        <img
                            className="h-[16px] w-[16px] "
                            src={theme === "dark" ? sunIcon : moonIcon}
                            alt="Toggle theme"
                        />
                    </button>
                </div>
                <Navbar onLogout={handleLogout} />
            </nav>

            <div className="my-6 w-full max-w-[600px] rounded-lg border border-border bg-surface p-4 sm:my-8 sm:p-6">
                <h1 className="mb-5 text-center text-2xl font-bold text-secondary sm:text-3xl">
                    Taskflow
                </h1>
                <TaskInput addTask={handleAddTask} />
                <TaskList
                    tasks={tasks}
                    deleteTask={handleDeleteTask}
                    toggleTask={handleToggleTask}
                />
            </div>
        </motion.div>
    );
}

export default Home;
