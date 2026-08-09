import { useState } from "react";

function TaskInput({ addTask }) {
  const [task, setTask] = useState("");

  function handleClicked() {
    if (task.trim() === "") return;
    addTask(task.trim());
    setTask("");
  }

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Enter Your Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="add-task-btn" onClick={handleClicked}>
        Add Task
      </button>
    </div>
  );
}

export default TaskInput;
