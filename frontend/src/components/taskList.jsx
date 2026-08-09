function TaskList({ tasks, deleteTask, toggleTask }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <h3>Task List</h3>
        <p>No tasks yet</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h3>Task List</h3>

      {tasks.map((task, index) => (
        <div key={task._id} className="li">
          <div className="task-text">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task._id, !task.completed)}
            />

            <span className={task.completed ? "completed" : ""}>
              {index + 1}. {task.title}
            </span>
          </div>

          <button className="delete-btn" onClick={() => deleteTask(task._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
