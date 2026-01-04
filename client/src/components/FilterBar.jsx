import TodoList from './TodoList'
import { useState, useEffect } from 'react'

function FilterBar({ todos, handleUpdateTodo, handleDeleteTodo }) {

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
      <div className='border border-2 border-dark p-5 box-shadow-2' style={{borderRadius: "10px", backgroundColor: "#f8f9fa"}}>
        <h1 className="text-center display-4 mb-5">Todo List</h1>
        <table className="table">

          <thead >
            <tr scope="row" className="bg-primary text-center" style={{borderTopLeftRadius: "10px", borderTopRightRadius: "10px"}}> 
              <th scope='col'> <button className='btn' onClick={handleSortByTitle}>Title</button></th>
              <th scope='col'> <span className='btn'>Description</span> </th>
              <th scope='col'> <button className='btn' onClick={handleSortByPriority}>Priority</button> </th>
              <th scope='col'> <button className='btn' onClick={handleSortByDueDate}>Due Date</button> </th>
              <th scope='col'> <button className='btn' onClick={handleSortByCompleted}>Completed</button></th>
              <th scope="col"> <button className='btn'>Actions</button>   </th>
            </tr>
          </thead>
          <TodoList FilterBarTodos={filterTodos} handleUpdateTodo={handleUpdateTodo} handleDeleteTodo={handleDeleteTodo} />
        </table>
      </div>
    </>
  )
}

export default FilterBar