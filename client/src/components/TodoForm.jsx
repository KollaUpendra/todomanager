import { useForm } from "react-hook-form"

function TodoForm({ onCreateTodo }) {
  const { register, handleSubmit, reset } = useForm();
  
  const onSubmit = async (data) => {
    await onCreateTodo(data);
    reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h1>Add New Todo</h1>
        <label htmlFor="" className="form-label">Title</label>
        <input type="text" {...register("title")}
          placeholder="Title"
          className="form-control"
        />
        <label htmlFor="" className="form-label">Description</label>
        <input type="text" {...register("description")}
          placeholder="Description"
          className="form-control"
        />
        <label htmlFor="" className="form-label">Priority</label>
        <select {...register("priority")}
          className="form-control"
        >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
        </select>

        <label htmlFor="" className="form-label">Due Date</label>
        <input type="date" {...register("dueDate")}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default TodoForm;