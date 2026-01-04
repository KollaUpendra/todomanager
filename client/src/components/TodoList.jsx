
function TodoList({FilterBarTodos, handleUpdateTodo, handleDeleteTodo}) {

    return (
        <>      
            <tbody>
                {FilterBarTodos.map(todo => (
                    <tr scope="row" key={todo._id}>
                        <td>{todo.title}</td>
                        <td>{todo.description}</td>
                        <td>{todo.priority}</td>
                        <td>{todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''}</td>
                        <td>{todo.completed ? "✅" : "❌"}</td>
                        <td className="d-flex justify-content-center gap-5">
                            <button onClick={() => handleUpdateTodo(todo._id)} className="btn btn-primary">Update</button>
                            <button onClick={() => handleDeleteTodo(todo._id)} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                ))}

            </tbody>
        </>
    )
}

export default TodoList