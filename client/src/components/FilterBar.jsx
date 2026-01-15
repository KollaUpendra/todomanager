import TodoList from './TodoList'
import { useState, useEffect } from 'react'

function FilterBar({ todos, handleUpdateTodo, handleDeleteTodo, handleTaskCompletedChange }) {

  const [filterTodos, setFilterTodos] = useState(todos)

  // Sync filterTodos with todos prop changes
    useEffect(() => {
        setFilterTodos(todos)
    }, [todos])

    const handleSortByCompleted = () => {
        const sorted = [...filterTodos].sort((a, b) => a.completed - b.completed)
        setFilterTodos(sorted)
    }
    const handleSortByTitle = () => {
        const sorted = [...filterTodos].sort((a, b) => a.title.localeCompare(b.title))
        setFilterTodos(sorted)
    }
    const handleSortByPriority = () => {
        const sorted = [...filterTodos].sort((a, b) => a.priority.localeCompare(b.priority))
        setFilterTodos(sorted)
    }
    const handleSortByDueDate = () => {
        const sorted = [...filterTodos].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        setFilterTodos(sorted)
    }


  return (
    <>
      <div>
        <h1 className="text-center display-4 mb-5">Todo List</h1>
        <TodoList handleSortByCompleted={handleSortByCompleted} handleTaskCompletedChange={handleTaskCompletedChange} handleSortByTitle={handleSortByTitle} handleSortByPriority={handleSortByPriority} handleSortByDueDate={handleSortByDueDate} FilterBarTodos={filterTodos} handleUpdateTodo={handleUpdateTodo} handleDeleteTodo={handleDeleteTodo} />
      </div>
    </>
  )
}

export default FilterBar