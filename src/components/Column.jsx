
import TaskCard from "./TaskCard";

function Column({ title, tasks, onDeleteTask, onMoveTask, onEditTask }) {
  return (
    <section className="column">
      <div className="column-header">
  <h2>{title}</h2>
  <span className="task-count">{tasks.length}</span>
</div>

      <div className="task-list">
  {tasks.length === 0 ? (
    <p className="empty-column">
      No tasks here yet
    </p>
  ) : (
    tasks.map((task) => (
          

<TaskCard
  key={task.id}
  title={task.title}
  description={task.description}
  priority={task.priority}
  status={task.status}
  onDelete={() => onDeleteTask(task.id)}
  onMove={(newStatus) => onMoveTask(task.id, newStatus)}
  onEdit={() => onEditTask(task)}
/>


        ))
        )}
      </div>
    </section>
  );
}

export default Column;
