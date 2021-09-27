const express = require("express");
const path = require("path");
const cors = require("cors");

const db = require("./stormdb");
const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = "https://todo-app-barkend.herokuapp.com/todos/";
// const API_URL = `http://localhost:${PORT}/todos/`;

app.use(cors());
app.use(express.json());

function success(res, payload) {
  return res.status(200).json(payload);
}

// app.use(express.static(path.join(__dirname, '../build')));


app.get("/todos", async (req, res, next) => {
  try {
    const todos = await db.getAllTodos();
    return success(res, todos);
  } catch (err) {
    next({ status: 400, message: "failed to get todos" });
  }
});

app.get("/todos/:id", async (req, res, next) => {
  try {
    const todos = await db.getTodo(req.params.id);
    return success(res, todos);
  } catch (err) {
    next({ status: 400, message: "failed to get todos" });
  }
});

app.post("/todos", async (req, res, next) => {
  try {
    const todo = await db.createTodo(req.body);
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: "failed to create todo" });
  }
});

app.put("/todos/:id", async (req, res, next) => {
  try {
    const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: "failed to update todo" });
  }
});

app.delete("/todos/:id", async (req, res, next) => {
  try {
    await db.deleteTodo(req.params.id);
    return success(res, "todo deleted!");
  } catch (err) {
    next({ status: 400, message: "failed to delete todo" });
  }
});

app.delete("/todos/", async (req, res, next) => {
  try {
    await db.deleteAllTodos();
    return success(res, "todos deleted!");
  } catch (err) {
    next({ status: 400, message: "failed to delete todos" });
  }
});

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request"
  });
});

app.get("/*", function (req, res) {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

