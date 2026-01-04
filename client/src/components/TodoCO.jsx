
function TodoCO({ todos, value }) {

    const todoCompletedOnTime = (todos, value) => {
        const today = new Date().toISOString().split('T')[0]
        if(value === "true"){
            return todos.filter(todo => {
                const todoDueDate = todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
                return todo.completed && todoDueDate >= today
            })
        }else if(value === "false"){
            return todos.filter(todo => {
                const todoDueDate = todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
                return !todo.completed && todoDueDate < today
            })
        }
    }

    return (
        <div style = {{border: "1px solid black", padding: "10px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", minWidth: "35vw"}}>
            <h1 className="text-center display-6">{(value === "true")?"Todo Completed On Time":"Todo Not Completed On Time"}</h1>
            <table className="table">
                <thead>
                    <tr scope="row">
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Completed</th>
                    </tr>
                </thead>
                <tbody  style={{minHeight: "40vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    {todoCompletedOnTime(todos, value).map(todo => (
                        <tr scope="row" key={todo._id}>
                            <td scope="col">{todo.title}</td>
                            <td scope="col">{todo.description}</td>
                            <td scope="col">{todo.priority}</td>
                            <td scope="col">{todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''}</td>
                            <td scope="col">{todo.completed ? "✅" : "❌"}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default TodoCO