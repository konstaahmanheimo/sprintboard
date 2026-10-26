
import { useState, useEffect } from "react";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";
import Toast from "./components/Toast";

const initialTasks = [
  {
    id: 1,
    title: "Create project",
    description: "Set up the React application",
    priority: "High",
    status: "To Do",
  },
  {
    id: 2,
    title: "Build components",
    description: "Create reusable UI components",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Test application",
    description: "Check the basic functionality",
    priority: "Low",
    status: "Done",
  },
];

function App() {
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("sprintboard-tasks");

    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch {
        return initialTasks;
      }
    }

    return initialTasks;
  });

    const completedTasks = tasks.filter(
      (task) => task.status === "Done"
    ).length;

    const progress =
      tasks.length === 0
        ? 0
        : Math.round((completedTasks / tasks.length) * 100);

    const filteredTasks = tasks.filter((task) => {

      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });

  const todoTasks = filteredTasks.filter((task) => task.status === "To Do");
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "In Progress"
  );
  const doneTasks = filteredTasks.filter((task) => task.status === "Done");

  useEffect(() => {
    localStorage.setItem("sprintboard-tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(newTask) {
    setTasks((currentTasks) => [...currentTasks, newTask]);
    showToast("Task created successfully");
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId));
    showToast("Task deleted");
  }

  function moveTask(taskId, newStatus) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    showToast("Task status updated");
  }


function updateTask(updatedTask) {
  setTasks((currentTasks) =>
    currentTasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    )
  );

  setEditingTask(null);
  showToast("Task updated successfully");
}

function cancelEdit() {
  setEditingTask(null);
}

function showToast(message, type = "success") {
  setNotification({ message, type });
}

useEffect(() => {
  if (!notification) return;

  const timer = setTimeout(() => {
    setNotification(null);
  }, 3000);

  return () => clearTimeout(timer);
}, [notification]);



  return (
    <main className="app">
      <header className="app-header">
        <Toast
  message={notification?.message}
  type={notification?.type}
  onClose={() => setNotification(null)}
/>
        <h1>Sprintboard</h1>   
      </header>

      <section className="progress-section">
  <div className="progress-header">
    <h2>Sprint progress</h2>
    <span>{progress}%</span>
  </div>

  <div
    className="progress-track"
    role="progressbar"
    aria-label="Sprint progress"
    aria-valuenow={progress}
    aria-valuemin={0}
    aria-valuemax={100}
  >
    <div
      className="progress-fill"
      style={{ width: `${progress}%` }}
    />
  </div>

  <p>
    {completedTasks} of {tasks.length} tasks completed
  </p>
</section>

      <div className="search-bar">
  <input
    type="search"
    placeholder="Search tasks..."
    value={searchQuery}
    onChange={(event) => setSearchQuery(event.target.value)}
    aria-label="Search tasks"
  />
</div>

<div className="priority-filter">
  <label htmlFor="priority-filter">
    Filter by priority
  </label>

  <select
    id="priority-filter"
    value={priorityFilter}
    onChange={(event) => setPriorityFilter(event.target.value)}
  >
    <option value="All">All priorities</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>
</div>

    <TaskForm
     onAddTask={addTask}
     editingTask={editingTask}
     onUpdateTask={updateTask}
     onCancelEdit={cancelEdit}
     onEditTask={setEditingTask}
/>

      <div className="board">
        {["To Do", "In Progress", "Done"].map((status) => (
          <Column
            key={status}
            title={status}
            tasks={
              status === "To Do"
                ? todoTasks
                : status === "In Progress"
                  ? inProgressTasks
                  : doneTasks
            }
            onDeleteTask={deleteTask}
            onMoveTask={moveTask}
            onEditTask={setEditingTask}
          />
        ))}
      </div>
    </main>
  );  
}

export default App;
