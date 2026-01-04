import { useForm } from "react-hook-form";
import "./form.css"

function TodoForm({ onCreateTodo }) {
  const { register, handleSubmit } = useForm();

  return (
    <>
      <form onSubmit={handleSubmit(onCreateTodo)} className="form">
        <h1>Add New Todo</h1>
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default TodoForm;