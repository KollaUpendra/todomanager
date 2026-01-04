import { createTodo, getTodos, deleteTodo, updateTodo } from "../services/todoApi"
import TodoForm from "../components/TodoForm"
import TodoItem from "../components/TodoItem"
import TodoList from "../components/TodoList"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import TodoCO from "../components/TodoCO"
import { Modal } from "react-bootstrap"
import FilterBar from "../components/FilterBar"

function Home() {

    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [updateId, setUpdateId] = useState(null)

    // to create a todo
    const handleCreateTodo = async (newtodo) => {
        try {
            setLoading(true)
            console.log(newtodo)
            const response = await createTodo(newtodo);
            console.log(response)
            if (response.status === 201 || response.status === 200) {
                // Add the new todo to the list
                if (response.data.payload) {
                    setTodos([...todos, response.data.payload])
                }

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
        // Format date to yyyy-MM-dd for HTML5 date input
        const formattedDate = updateTodo.dueDate ? new Date(updateTodo.dueDate).toISOString().split('T')[0] : ''
        setValue("dueDate", formattedDate)
        setValue("completed", updateTodo.completed ? "true" : "false")
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
            <div className="container mb-5 mt-5 ">
                <div className="pb-5">
                    <FilterBar todos={todos} handleUpdateTodo={handleUpdateTodo} handleDeleteTodo={handleDeleteTodo} />
                </div>
                <div className="pb-5 max-w-50 mx-auto">
                    <TodoForm onCreateTodo={handleCreateTodo} />
                </div>
                <div className="d-lg-flex justify-content-between">
                    <div>
                        <TodoCO todos = {todos} value ="true"/>
                    </div>
                    <div>
                        <TodoCO todos = {todos} value ="false"/>
                    </div>
                </div>
            </div>
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