import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// to get all todos
export const getTodos = async () => {
    const response = await axios.get(API_URL)
    return response
}

// to create a todo
export const createTodo = async (todoData) => {
    const response = await axios.post(API_URL, todoData)
    return response
}

// to update a todo
export const updateTodo = async (id, todoData) => {
    const response = await axios.put(`${API_URL}/${id}`, todoData)
    return response
}

// to delete a todo
export const deleteTodo = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response
}


