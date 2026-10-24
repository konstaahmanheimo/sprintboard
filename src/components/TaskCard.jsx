import { Pencil, Trash2, ArrowRight, RotateCcw } from "lucide-react";

function TaskCard({
  title,
  description,
  priority,
  onDelete,
  onMove,
  onEdit,
  status,
}) {
  const nextStatus = {
    "To Do": "In Progress",
    "In Progress": "Done",
    Done: "To Do",
  };

  return (
    <article className="task-card">
      <span className={`priority priority-${priority.toLowerCase()}`}>
  {priority}
</span>

      <h3>{title}</h3>
      <p>{description}</p>

      <div className="task-actions">

        <button
  type="button"
  onClick={() => onMove(nextStatus[status])}
>
  {status === "Done" ? (
    <RotateCcw size={16} aria-hidden="true" />
  ) : (
    <ArrowRight size={16} aria-hidden="true" />
  )}
  <span>{status === "Done" ? "Reopen" : "Move forward"}</span>
</button>

        <button type="button" onClick={() => {
  const confirmed = window.confirm(
    `Delete "${title}"? This cannot be undone.`
  );

  if (confirmed) {
    onDelete();
  }
}}>
  <Trash2 size={16} aria-hidden="true" />
  <span>Delete</span>
</button>

        <button type="button" onClick={onEdit}>
  <Pencil size={16} aria-hidden="true" />
  <span>Edit</span>
</button>
      </div>
    </article>
  );
}

export default TaskCard;
