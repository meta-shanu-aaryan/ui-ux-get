import { useState } from 'react'
import taskContext from './taskContext'

const TaskState = (props) => {


  const [tasks, setTasks] = useState([
    {
      id: Date.now(),
      title: "Task 1",
      description: "Random event task",
      priority: "low",
      creationDate: new Date().toLocaleDateString(),
      completionDate: null,
      status: "new"
    }
  ]);

  const addTask = async (title, description, priority) => {
    const task = {
      id: Date.now(),
      title,
      description,
      priority,
      creationDate: new Date().toLocaleDateString(),
      completionDate: "",
      status: "new"
    };
    setTasks([...tasks, task]); // Spread operator ensures proper state update
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const editTask = (id, title, description, priority, status) => {
    console.log(id, title, description, priority, status);
    console.log(status.toLowerCase() === "completed");


    const newTasks = tasks.map(task =>
      task.id === id
        ? {
          ...task,
          title: title.length > 0 ? title : task.title,
          description: description.length > 0 ? description : task.description,
          priority: priority.length > 0 ? priority : task.priority,
          status: status.length > 0 ? status : task.status,
          completionDate: status.toLowerCase() === "completed" ? new Date().toLocaleDateString() : task.completionDate
        }
        : task
    );
    setTasks(newTasks);
  };


  return (
    <taskContext.Provider value={{ tasks, addTask, deleteTask, editTask, setTasks }}>
      {props.children}
    </taskContext.Provider>
  );
};

export default TaskState;