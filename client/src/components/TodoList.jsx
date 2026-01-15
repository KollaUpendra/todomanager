import { formatDateForInput } from '../utils/dateUtils'

function TodoList({ handleSortByCompleted, handleSortByDueDate, handleSortByPriority, handleSortByTitle, FilterBarTodos, handleTaskCompletedChange, handleUpdateTodo, handleDeleteTodo }) {

    return (
        <>
            <table className="table">
                <thead >
                    <tr scope="row" className="bg-primary text-center">
                        <th scope='col'> <button className='btn' onClick={handleSortByTitle}>Title</button></th>
                        <th scope='col'> <span className='btn'>Description</span> </th>
                        <th scope='col'> <button className='btn' onClick={handleSortByPriority}>Priority</button> </th>
                        <th scope='col'> <button className='btn' onClick={handleSortByDueDate}>Due Date</button> </th>
                        <th scope='col'> <button className='btn' onClick={handleSortByCompleted}>Completed</button></th>
                        <th scope="col"> <button className='btn'>Actions</button>   </th>
                    </tr>
                </thead>
                <tbody>
                    {FilterBarTodos.map(todo => (
                        <tr scope="row" key={todo._id}>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>{todo.priority}</td>
                            <td>{formatDateForInput(todo.dueDate)}</td>
                            <td><button onClick={() => handleTaskCompletedChange(todo._id, !todo.completed)}>{todo.completed ? "✅" : "❌"}</button></td>
                            <td className="d-flex justify-content-center gap-5">
                                <button onClick={() => handleUpdateTodo(todo._id)} className="btn btn-primary">Update</button>
                                <button onClick={() => handleDeleteTodo(todo._id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TodoList