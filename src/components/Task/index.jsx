import "./Task.css";
import { MdDoneAll } from "react-icons/md";
import { GoTrash } from "react-icons/go";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const Task = ({ task, tasks, setTasks, index, dark }) => {
  const handleComplete = (e) => {
    e.preventDefault();
    let newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const saveToLocal = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
  };

  const handleRemove = (e) => {
    e.preventDefault();
    let newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    saveToLocal("Todo-List", newTasks);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        const handleClick = (e) => {
          handleRemove(e);
          onClose();
        };
        
        return (
          <div className="alert-box">
            <h1 className="alert-text">Are you sure to delete this task?</h1>
            <button className="alert-button" onClick={onClose}>
              No
            </button>
            <button className="alert-button" onClick={handleClick}>
              Yes
            </button>
          </div>
        );
      },
    });
  };

  return (
    <div
      className={`${
        dark ? "darkMode-task-container" : "lightMode-task-container"
      } box-task-container`}
    >
      <div
        className={`${
          dark ? "darkMode-box-task" : "lightMode-box-task"
        } box-task`}
      >
        <div
          className={`${
            dark ? "darkMode-task-title" : "lightMode-task-title"
          } box-task-title`}
          style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
          {task.title}
        </div>
        <div
          className={`${
            dark ? "darkMode-task-description" : "lightMode-task-description"
          } box-task-description`}
          style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
          {task.description}
        </div>
      </div>
      <div className={`${dark ? "darkMode" : "lightMode"} box-task-action`}>
        <button
          className={`${
            dark ? "darkMode-task-completed" : "lightMode-task-completed"
          } box-task-completed ${
            dark ? "darkMode-task-btn" : "lightMode-task-btn"
          } box-task-btn`}
          onClick={handleComplete}
        >
          <MdDoneAll size={20} />
        </button>
        <button
          className={`${
            dark ? "darkMode-task-remove" : "lightMode-task-remove"
          } box-task-remove ${
            dark ? "darkMode-task-btn" : "lightMode-task-btn"
          } box-task-btn`}
          onClick={(e) => handleDelete(e)}
        >
          <GoTrash size={20} />
        </button>
      </div>
    </div>
  );
};

export default Task;
