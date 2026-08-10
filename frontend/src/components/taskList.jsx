import { motion, AnimatePresence } from "motion/react";

function TaskList({ tasks, deleteTask, toggleTask }) {
    return (
        <AnimatePresence>
            <div className="flex w-full flex-col items-center text-left">
                <h3 className="mb-4 text-center text-lg font-semibold text-secondary">
                    Task List
                </h3>

                {tasks.map((task, index) => (
                    <motion.div
                        key={task._id}
                        className="mb-1 flex w-full max-w-[300px] items-start justify-between gap-3 rounded-md border border-border bg-background px-3 py-2"
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex min-w-0 flex-1 items-baseline gap-2">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() =>
                                    toggleTask(task._id, !task.completed)
                                }
                            />

                            <p
                                className={
                                    task.completed
                                        ? "min-w-0 break-words text-text line-through opacity-60 "
                                        : "min-w-0 break-words text-text"
                                }
                            >
                                {task.title}
                            </p>
                        </div>

                        <button
                            className="shrink-0 rounded-md bg-danger px-2 py-1 text-sm text-white transition-colors duration-200 hover:bg-danger-hover"
                            onClick={() => deleteTask(task._id)}
                        >
                            Delete
                        </button>
                    </motion.div>
                ))}
            </div>
        </AnimatePresence>
    );
}

export default TaskList;
