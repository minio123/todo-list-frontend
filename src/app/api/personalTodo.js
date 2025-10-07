import api from "./api";

// src/app/api/personalTodo.js
// Simulated API services for personal todo tasks

// Simulate an API call to fetch tasks
const fetchTasks = async (params) => {
  let url_params = `?search=${params.search}&page=${params.page}&sort_by=${params.columnSort}&sort=${params.sortDirection}&limit=${params.itemsPerPage}&category=personal`;
  if (params.search == "") {
    url_params = `?page=${params.page}&sort_by=${params.columnSort}&sort=${params.sortDirection}&limit=${params.itemsPerPage}&category=personal`;
  }

  const api_response = await api
    .get(`/todo${url_params}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });

  const data = api_response.data;

  console.log(data);

  const response = data.filter((todo) => {
    if (
      todo.todo_id.includes(params.search) ||
      todo.todo_name.includes(params.search)
    ) {
      return todo;
    }
  });
  return response;
};

// Simulate an API call to create a new task
const createTasks = async (taskData) => {
  const { taskName, dueDate, taskStatus } = taskData;
  // field validations
  if (!taskName || taskName == "") {
    return {
      status: "error",
      message: "All fields are required",
    };
  }

  return {
    status: "success",
    message: "Task created successfully",
  };
};

// Simulate an API call to update a task
const updateTasks = async (taskId, updatedData) => {
  return { id: taskId, ...updatedData }; // Return the updated task data for simplicity
};

// Simulate an API call to delete tasks
const deleteTasks = async (taskIds) => {
  return taskIds; // Return the IDs of deleted tasks for simplicity
};

// Simulate an API call to mark tasks as done
const markTasksAsDone = async (taskIds) => {
  if (taskIds.length == 0) {
    return false;
  }

  return taskIds; // Return the IDs of updated tasks for simplicity
};

// Simulate an API call to mark tasks as pending
const markTasksAsPending = async (taskIds) => {
  if (taskIds.length == 0) {
    return false;
  }
  return taskIds; // Return the IDs of updated tasks for simplicity
};

export {
  fetchTasks,
  createTasks,
  updateTasks,
  deleteTasks,
  markTasksAsDone,
  markTasksAsPending,
};
