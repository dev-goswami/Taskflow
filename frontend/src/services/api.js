const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
    return localStorage.getItem("token");
}

async function handleResponse(response) {
    const data = await response.json().catch(() => null);

    if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";

        return;
    }

    if (!response.ok) {
        throw new Error(data?.message || "Something went wrong");
    }

    return data;
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

    return handleResponse(response);
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

    return handleResponse(response);
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

    handleResponse(response);
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

    return handleResponse(response);
}
