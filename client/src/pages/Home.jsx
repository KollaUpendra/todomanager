import { createTodo, getTodos, deleteTodo, updateTodo } from "../services/todoApi"
import FilterBar from "../components/FilterBar"
import TodoForm from "../components/TodoForm"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import TodoCompletionStats from "../components/TodoCompletionStats"
import { Modal } from "react-bootstrap"
import { formatDateForInput } from "../utils/dateUtils"

function Home() {

    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [updateId, setUpdateId] = useState(null)

    // to create a todo
    const handleCreateTodo = async (newtodo) => {
        try {
            setLoading(true)
            const response = await createTodo(newtodo);
            console.log(response)
            if (response.status === 201 || response.status === 200) {
                await handleGetTodos()

            } else {
                setError(response.statusText);
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false)
        }
    }

    // to get all todos
    const handleGetTodos = async () => {
        try {
            setLoading(true)
            const response = await getTodos()
            // Backend returns {message, payload} structure
            if (response.data && response.data.payload) {
                setTodos(response.data.payload)
            }
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetTodos()
    }, [])

    let [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
    };
    const handleClose = () => {
        setShow(false);
    };

    const { register, handleSubmit, setValue } = useForm();

    // to update a todo
    const handleUpdateTodo = (id) => {
        handleShow()
        setUpdateId(id)
        const updateTodo = todos.find(todo => todo._id === id)
        // console.log(updateTodo)
        setValue("_id", updateTodo._id)
        setValue("title", updateTodo.title)
        setValue("description", updateTodo.description)
        setValue("priority", updateTodo.priority)
        // Format date to yyyy-MM-dd for HTML5 date input (timezone-safe)
        setValue("dueDate", formatDateForInput(updateTodo.dueDate))
        setValue("completed", updateTodo.completed ? "true" : "false")
    }

    const handleTaskCompletedChange = async (id, value) => {
        try {
            // Optimistic update
            const updatedTodos = todos.map(todo => {
                if (todo._id === id) {
                    return { ...todo, completed : value }
                }
                return todo
            })
            setTodos(updatedTodos)
            
            // Persist to backend
            const todoToUpdate = todos.find(t => t._id === id);
            await updateTodo(id, { ...todoToUpdate, completed: value });
        } catch (error) {
            // Rollback on error
            setError(error.message);
            await handleGetTodos(); // Refresh from server
        }
    }

    const saveModifiedTodo = async (data) => {
        try {
            handleClose()
            setLoading(true)
            console.log(data)
            const response = await updateTodo(updateId, data)
            console.log(response)
            if (response.status === 200 || response.status === 201) {
                await handleGetTodos()
            } else {
                setError(response.statusText)
            }
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    const handleCancelUpdate = () => {
        setShow(false)
    }

    // to delete a todo
    const handleDeleteTodo = async (id) => {
        try {
            setLoading(true)
            const response = await deleteTodo(id)
            if (response.status === 200 || response.status === 201) {
                await handleGetTodos()
            } else {
                setError(response.statusText)
            }
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="d-grid ">

                <div className="row">
                    <div className="col-4">
                        <TodoForm onCreateTodo={handleCreateTodo} />
                    </div>
                    <div className="col-8">
                        <FilterBar handleTaskCompletedChange={handleTaskCompletedChange} todos={todos} handleUpdateTodo={handleUpdateTodo} handleDeleteTodo={handleDeleteTodo} />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <TodoCompletionStats todos={todos} value="true" />
                    </div>
                    <div className="col">
                        <TodoCompletionStats todos={todos} value="false" />
                    </div>
                </div>

            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error.message || error}
                </div>
            )}
            {loading && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            <Modal show={show}>
                <Modal.Dialog>
                    <Modal.Header closeButton onClick={handleCancelUpdate}>
                        <Modal.Title>Update Todo</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={handleSubmit(saveModifiedTodo)}>
                            <input type="text" {...register("_id")} hidden />
                            <label htmlFor="" className="form-label mb-3">Title</label>
                            <input type="text" {...register("title")}
                                placeholder="Title"
                                className="form-control mb-3"
                            />
                            <label htmlFor="" className="form-label mb-3">Description</label>
                            <input type="text" {...register("description")}
                                placeholder="Description"
                                className="form-control mb-3"
                            />
                            <label htmlFor="" className="form-label mb-3">Priority</label>
                            <select {...register("priority")}
                                className="form-control mb-3"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>

                            <label htmlFor="" className="form-label mb-3">Due Date</label>
                            <input type="date" {...register("dueDate")}
                                className="form-control mb-3"
                            />
                            <label htmlFor="" className="form-label mb-3">Completed</label>
                            <select {...register("completed")}
                                className="form-control mb-3"
                            >
                                <option value="true">completed</option>
                                <option value="false">not completed</option>
                            </select>
                            <button className="btn btn-success" type="submit"> Update </button>
                        </form>
                    </Modal.Body>
                </Modal.Dialog>
            </Modal>
        </>
    )
}

export default Home