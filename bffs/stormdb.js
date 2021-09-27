const StormDB = require("stormdb");
const engine = new StormDB.localFileEngine("./bffs/db.stormdb");
const db = new StormDB(engine);

db.default({ todos: [] });

const createTodo = async (todoObject) => {
    let todoId = { _id: getRandomInt(1, 100), completed: false };
    const newTodoObject = { ...todoObject, ...todoId }
    await db.get("todos").push(newTodoObject);
    await db.save()
    return newTodoObject
}

const getTodo = async (todoItem) => {
    const todo = await db.get('todos')
        .filter(i => i._id == todoItem)
        .value();
    return todo
}

const getAllTodos = async () => {
    const todos = await db.get('todos').value();
    return todos
}

const updateTodoRecord = async (todoId, newTodoItem) => {
    await db.get('todos')
        .find({ id: todoId })
        .assign({ todoName: newTodoItem })
        .write();
}

const deleteTodo = async (todoId) => {
    const todo = await db.get('todos')
    .filter(i => i._id == todoId)
   
    db.get(todo.value()[0]._id).delete(true);
    db.get(todo.value()[0].task).delete(true);
    db.get(todo.value()[0].completed).delete(true);
    db.save();

    // let todoItem = await getTodo(todoId)
    // db.get(todo[0]).delete();
    // db.get(todo.value()[0].completed)
    // .delete();
}

const deleteAllTodos = async () => {
    await db.get('todos').set([]).save();
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

module.exports = {
    createTodo,
    getTodo,
    updateTodoRecord,
    deleteTodo,
    getAllTodos,
    deleteAllTodos
}
