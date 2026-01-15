import { formatDateForInput, isOnOrAfterToday, isBeforeToday } from '../utils/dateUtils'

function TodoCO({ todos, value }) {

    const todoCompletedOnTime = (todos, value) => {
        if (value === "true") {
            return todos.filter(todo => {
                return todo.completed && isOnOrAfterToday(todo.dueDate)
            })
        } else if (value === "false") {
            return todos.filter(todo => {
                return !todo.completed && isBeforeToday(todo.dueDate)
            })
        }
    }

    return (
        <div>
            <h1 className="text-center display-6">{(value === "true") ? "Todo Completed On Time" : "Todo Not Completed On Time"}</h1>
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
                <tbody>
                    {todoCompletedOnTime(todos, value).map(todo => (
                        <tr scope="row" key={todo._id}>
                            <td scope="col">{todo.title}</td>
                            <td scope="col">{todo.description}</td>
                            <td scope="col">{todo.priority}</td>
                            <td scope="col">{formatDateForInput(todo.dueDate)}</td>
                            <td scope="col">{todo.completed ? "✅" : "❌"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TodoCO