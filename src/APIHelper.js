import axios from "axios";

const port = process.env.PORT || 3000;

const API_URL= process.env.API_URL || `http://localhost:${port}/todos/`

async function createTodo(task) {
  const { data: newTodo } = await axios.post(API_URL, {
    task
  });
  return newTodo;
}

async function deleteTodo(id) {
  const message = await axios.delete(`${API_URL}${id}`);
  return message;
}

async function updateTodo(id, payload) {
  const {data:newTodo} = await axios.put(`${API_URL}${id}`, payload);
  return newTodo;
}

async function getAllTodos() {
  const { data: todos } = await axios.get(API_URL);
  return todos;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { createTodo, deleteTodo, updateTodo, getAllTodos };
