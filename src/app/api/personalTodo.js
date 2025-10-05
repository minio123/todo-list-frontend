// src/app/api/personalTodo.js
// Simulated API services for personal todo tasks

// Simulate an API call to fetch tasks
const fetchTasks = async (params) => {
  const testData = [
    {
      todoId: "TAUG25-001",
      status: "Overdue",
      todoName: "Test",
      dueDate: "August 18, 2025",
    },
    {
      todoId: "TAUG25-002",
      status: "Done",
      todoName: "Test 1",
      dueDate: "July 26, 2025",
    },
    {
      todoId: "TAUG25-003",
      status: "Done",
      todoName: "Test 2",
      dueDate: "July 26, 2025",
    },
    {
      todoId: "TAUG25-004",
      status: "Done",
      todoName: "Test 3",
      dueDate: "July 26, 2025",
    },
    {
      todoId: "TAUG25-005",
      status: "Done",
      todoName: "Test 4",
      dueDate: "July 16, 2025",
    },
    // {
    //   todoId: "TAUG25-006",
    //   status: "Pending",
    //   todoName: "Test 5",
    //   dueDate: "August 15, 2025",
    // },
    // {
    //   todoId: "TAUG25-007",
    //   status: "Pending",
    //   todoName: "Test 6",
    //   dueDate: "August 12, 2025",
    // },
    // {
    //   todoId: "TAUG25-008",
    //   status: "Overdue",
    //   todoName: "Test 6",
    //   dueDate: "July 26, 2025",
    // },
    // {
    //   todoId: "TAUG25-009",
    //   status: "Overdue",
    //   todoName: "Test 8",
    //   dueDate: "July 26, 2025",
    // },
    // {
    //   todoId: "TAUG25-010",
    //   status: "Done",
    //   todoName: "Test",
    //   dueDate: "July 26, 2025",
    // },
    // {
    //   todoId: "TAUG25-011",
    //   status: "Done",
    //   todoName: "Test 1",
    //   dueDate: "July 26, 2025",
    // },
    // {
    //   todoId: "TAUG25-012",
    //   status: "Done",
    //   todoName: "Test 2",
    //   dueDate: "July 26, 2025",
    // },
    // {
    //   todoId: "TAUG25-013",
    //   status: "Done",
    //   todoName: "Test 3",
    //   dueDate: "July 26, 2025",
    // },
    // {
    //   todoId: "TAUG25-014",
    //   status: "Done",
    //   todoName: "Test 4",
    //   dueDate: "July 16, 2025",
    // },
    // {
    //   todoId: "TAUG25-015",
    //   status: "Pending",
    //   todoName: "Test 5",
    //   dueDate: "August 15, 2025",
    // },
    // {
    //   todoId: "TAUG25-016",
    //   status: "Done",
    //   todoName: "Test 1",
    //   dueDate: "July 26, 2025",
    // },
    // {
    //   todoId: "TAUG25-017",
    //   status: "Done",
    //   todoName: "Test 2",
    //   dueDate: "July 26, 2025",
    // },
    // {
    //   todoId: "TAUG25-018",
    //   status: "Done",
    //   todoName: "Test 3",
    //   dueDate: "July 26, 2025",
    // },
    // {
    //   todoId: "TAUG25-019",
    //   status: "Done",
    //   todoName: "Test 4",
    //   dueDate: "July 16, 2025",
    // },
    // {
    //   todoId: "TAUG25-020",
    //   status: "Pending",
    //   todoName: "Test 5",
    //   dueDate: "August 15, 2025",
    // },
    // {
    //   todoId: "TAUG25-021",
    //   status: "Pending",
    //   todoName: "Test 5",
    //   dueDate: "August 15, 2025",
    // },
    // {
    //   todoId: "TAUG25-022",
    //   status: "Pending",
    //   todoName: "Test 5",
    //   dueDate: "August 15, 2025",
    // },
    // {
    //   todoId: "TAUG25-023",
    //   status: "Pending",
    //   todoName: "Test 5",
    //   dueDate: "August 15, 2025",
    // },
    // {
    //   todoId: "TAUG25-024",
    //   status: "Pending",
    //   todoName: "Test 5",
    //   dueDate: "August 15, 2025",
    // },
    // {
    //   todoId: "TAUG25-025",
    //   status: "Pending",
    //   todoName: "Test 5",
    //   dueDate: "August 15, 2025",
    // },
  ];

  const response = testData.filter((todo) => {
    if (
      todo.todoId.includes(params.search) ||
      todo.todoName.includes(params.search)
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
  // Simulate an API call to mark tasks as done
  return taskIds; // Return the IDs of updated tasks for simplicity
};

// Simulate an API call to mark tasks as pending
const markTasksAsPending = async (taskIds) => {
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
