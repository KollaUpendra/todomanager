import { body, validationResult } from 'express-validator';
import { TodoModel } from "../models/Todo.js";
import mongoose from 'mongoose';
import exp from 'express';

export const todoRoute = exp.Router();

const validateTodo = [
    body('title').trim().notEmpty().withMessage('Title is required')
        .isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),
    body('description').optional().trim().isLength({ max: 500 }),
    body('priority').optional().isIn(['Low', 'Medium', 'High']),
    body('dueDate').optional().isISO8601().toDate(),
    body('completed').optional().isBoolean()
];

// Create Todo Route
todoRoute.post('/todos', validateTodo, async(request, response, next) => {
    try {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        let newTodoObj = request.body
        const newTodo = TodoModel(newTodoObj)
        const result = await newTodo.save();
        response.status(201).json({message : "Todo created", payload : result})
    } catch (error) {
        next(error)
    }
})

// Get Todos Route
todoRoute.get('/todos', async(request, response, next) => {
    try {
        const result = await TodoModel.find()
        response.json({message : "List of Todos", payload : result})
    } catch (error) {
        next(error)
    }
})

// Get Todo by ID Route
todoRoute.get('/todos/:id', async(request, response, next) => {
    try {
        const id = request.params.id;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ 
                message: "Invalid todo ID format" 
            });
        }
        
        const result = await TodoModel.findById(id);
        
        if (!result) {
            return response.status(404).json({ 
                message: "Todo not found" 
            });
        }
        
        response.json({message : "Todo", payload : result});
    } catch (error) {
        next(error);
    }
});

// Update Todo by ID Route
todoRoute.put('/todos/:id', async(request, response, next) => {
    try {
    let id = request.params.id
    let newTodoObj = request.body

    const result = await TodoModel.findByIdAndUpdate(
    id, 
    newTodoObj,
    { new: true, runValidators: true }
)
    response.json({message : "Todo updated", payload : result})
    } catch (error) {
        next(error)
    }
})

// Delete Todo by ID Route
todoRoute.delete('/todos/:id', async(request, response, next) => {
    try {
    let id = request.params.id

    const result = await TodoModel.findByIdAndDelete(id)

    response.json({message : "Todo deleted", payload : result})
    } catch (error) {
        next(error)
    }
})


