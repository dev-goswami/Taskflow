import { useState } from "react";

function TaskInput({ addTask }) {
    const [task, setTask] = useState("");

    function handleClicked() {
        if (task.trim() === "") return;
        addTask(task.trim());
        setTask("");
    }

    return (
        <div className="mb-10 flex w-full flex-col gap-2 sm:flex-row">
            <input
                className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2.5 text-text outline-none placeholder:text-muted"
                type="text"
                placeholder="Add new task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button
                className="w-full shrink-0 rounded-md bg-primary px-4 py-2.5 text-background transition-colors duration-200 hover:bg-primary-hover sm:w-auto"
                onClick={handleClicked}
            >
                Add Task
            </button>
        </div>
    );
}

export default TaskInput;
