const express = require("express");
const path = require("path");
const cors = require("cors");
const nocache = require('nocache');

const db = require("./stormdb");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(nocache());

function success(res, payload) {
  return res.status(200).json(payload);
}


app.get("/todos", async (req, res, next) => {
  try {
    const todos = await db.getAllTodos();
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
  console.log(req.params.id)
  try {
    await db.deleteTodo(req.params.id);
    return success(res, "todo deleted!");
  } catch (err) {
    next({ status: 400, message: "failed to delete todo" });
  }
});

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request"
  });
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../build')));


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

