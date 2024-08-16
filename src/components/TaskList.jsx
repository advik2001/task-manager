import React, { useState } from 'react';
import './TaskList.css';

function TaskList({ tasks, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(null);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '' });

  const handleEdit = (index) => {
    setIsEditing(index);
    setCurrentTask(tasks[index]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTask(isEditing, currentTask);
    setIsEditing(null);
    setCurrentTask({ title: '', description: '' });
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks found.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              {isEditing === index ? (
                <form onSubmit={handleUpdate} className="edit-form">
                  <input
                    type="text"
                    value={currentTask.title}
                    onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    value={currentTask.description}
                    onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                    required
                  />
                  <button type="submit" className="update-button">Update</button>
                </form>
              ) : (
                <>
                  <span className="task-title">{task.title}</span>
                  <span className="task-description">{task.description}</span>
                  <div className="task-actions">
                    <button onClick={() => handleEdit(index)} className="edit-button">Edit</button>
                    <button onClick={() => deleteTask(index)} className="delete-button">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
