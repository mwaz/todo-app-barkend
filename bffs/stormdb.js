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
        .filter(i => i.task === todoItem )
        .value();
    return todo
}

const getAllTodos = async () => {
    const todos = await db.get('todos').state.todos
    return todos;
}

const updateTodoRecord = async (todoId, newTodoItem) => {
    await db.get('todos')
        .find({ id: todoId })
        .assign({ todoName: newTodoItem })
        .write();
}

const deleteTodo = async (todoId) => {
    // const todo = await db.get('todos')
    // .filter(i => i._id === 9 )
    
    // console.log(todo.value(), 'toso')
    // db.get(todo.value()[0].task)
    // db.get(todo.value()[0]._id)
    // db.get(todo.value()[0].completed)
    // .delete();
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
    getAllTodos
}
