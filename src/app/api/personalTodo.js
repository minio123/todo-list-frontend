import { response } from "../slices/todoSlice";
import api from "./api";

// src/app/api/personalTodo.js
// Simulated API services for personal todo tasks

// Simulate an API call to fetch tasks
const fetchTodo = async (params) => {
  let url_params = `?search=${params.search}&page=${params.page}&sort_by=${params.sortBy}&sort=${params.sortDirection}&limit=${params.itemsPerPage}&category=personal`;
  if (params.search == "") {
    url_params = `?page=${params.page}&sort_by=${params.sortBy}&sort=${params.sortDirection}&limit=${params.itemsPerPage}&category=personal`;
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

  // const response = data.filter((todo) => {
  //   if (
  //     todo.todo_id.includes(params.search) ||
  //     todo.todo_name.includes(params.search)
  //   ) {
  //     return todo;
  //   }
  // });
  return api_response;
};

const createTodo = async (params) => {
  const api_response = await api
    .post("/todo/create", params, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return api_response;
};

const updateTodo = async (params) => {
  const api_response = await api
    .put(`/todo/update/${params.todo_id}`, params, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return api_response;
};

const updateStatus = async (params) => {
  const api_response = await api
    .put(`/todo/update-status`, params, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return api_response;
};

const deleteTodo = async (params) => {
  console.log(params);
  const api_response = await api
    .delete(
      `/todo/delete`,
      { data: params },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return api_response;
};

export { fetchTodo, createTodo, updateTodo, updateStatus, deleteTodo };
