
import { useEffect, useState } from "react";

function TaskForm({ onAddTask, editingTask, onUpdateTask, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
    }
    setError("");
  }, [editingTask]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    setError("");
    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
    };

    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        ...taskData,
      });
    } else {
      onAddTask({
        id: crypto.randomUUID(),
        ...taskData,
        status: "To Do",
      });
    }
  }

  function handleCancel() {
    onCancelEdit();
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? "Edit task" : "Add a task"}</h2>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <label>
        Task title
        <input
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            if (event.target.value.trim()) setError("");
          }}
          aria-invalid={Boolean(error)}
          placeholder="e.g. Build login page"
          required
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="What needs to be done?"
          rows={3}
        />
      </label>

      <label>
        Priority
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>

      <div className="form-actions">
        <button type="submit">
          {editingTask ? "Save changes" : "Add task"}
        </button>

        {editingTask && (
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
