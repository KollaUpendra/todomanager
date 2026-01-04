import { TodoModel } from "../models/Todo.js";
import exp from 'express';

export const todoRoute = exp.Router();

// Create Todo Route
todoRoute.post('/todos', async(request, response) => {

    let newTodoObj = request.body

    const newTodo = TodoModel(newTodoObj)

    const result = await newTodo.save();

    response.json({message : "Todo created", payload : result})
})

// Get Todos Route
todoRoute.get('/todos', async(request, response) => {

    const result = await TodoModel.find()

    response.json({message : "List of Todos", payload : result})
})

// Get Todo by ID Route
todoRoute.get('/todos/:id', async(request, response) => {
    
    let id = request.params.id

    const result = await TodoModel.findById(id)

    response.json({message : "Todo", payload : result})

})

// Update Todo by ID Route
todoRoute.put('/todos/:id', async(request, response) => {
    
    let id = request.params.id
    let newTodoObj = request.body

    const result = await TodoModel.findByIdAndUpdate(id, newTodoObj)

    response.json({message : "Todo updated", payload : result})
})

// Delete Todo by ID Route
todoRoute.delete('/todos/:id', async(request, response) => {
    
    let id = request.params.id

    const result = await TodoModel.findByIdAndDelete(id)

    response.json({message : "Todo deleted", payload : result})
})


