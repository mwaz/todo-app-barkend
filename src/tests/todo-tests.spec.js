const nock = require('nock');
const got = require('got');
var getTodoItems = require('../../bffs/stormdb')
const expect = require('chai').expect;


describe('todo-app-barkend mocked tests', () => {
    it('can get todos', async () => {
        const response = await getTodoItems.getAllTodos();
        console.log(response)
    })
})
