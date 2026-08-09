const API_URL = "http://localhost:5000/api/todos";

function getToken() {
    return localStorage.getItem("token");
}

// ---------- Functions ----------

//get Todos
export async function getTodos() {
    const token = getToken();

    const response = await fetch(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Something went wrong");
    }

    const data = await response.json();

    return data;
}

//add task
export async function addTask(task) {
    const token = getToken();

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            title: task,
        }),
    });

    if (!response.ok) {
        throw new Error("Something went wrong");
    }
}

// delete task

export async function deleteTask(id) {
    const token = getToken();

    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Something went wrong");
    }
}

//toggleTask
export async function toggleTask(id, completed) {
    const token = getToken();

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            completed,
        }),
    });

    if (!response.ok) {
        throw new Error("Something went wrong");
    }
}
