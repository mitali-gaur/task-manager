import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TaskForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("to_do");

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/tasks";

    if (title.length == 0 || status.length == 0)
      return;

    const body = {
      title,
      description,
      status
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((response) => {
      if (response['success']) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Task created successfully'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: response['message']
        })
      }
      navigate('/tasks')
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
      });
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new task
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="taskTitle">Task title</label>
              <input
                type="text"
                name="title"
                id="taskTitle"
                className="form-control"
                required
                onChange={(event) => onChange(event, setTitle)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskDescription">Description</label>
              <textarea
                type="text"
                name="description"
                id="taskDescription"
                className="form-control"
                onChange={(event) => onChange(event, setDescription)}
              />
            </div>
            <label htmlFor="status">Task Status</label>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ marginRight: '10px' }}>
                <input
                  type="radio"
                  id="to_do"
                  name="status"
                  value="to_do"
                  checked={status === "to_do"}
                  onChange={(event) => onChange(event, setStatus)}
                />
                <label style={{ marginLeft: '4px' }} htmlFor="to_do">To Do</label>
              </div>
              <div style={{ marginRight: '10px' }}>
                <input
                  type="radio"
                  id="in_progress"
                  name="status"
                  value="in_progress"
                  checked={status === "in_progress"}
                  onChange={(event) => onChange(event, setStatus)}
                />
                <label style={{ marginLeft: '4px' }} htmlFor="in_progress">In Progress</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="done"
                  name="status"
                  value="done"
                  checked={status === "done"}
                  onChange={(event) => onChange(event, setStatus)}
                />
                <label style={{ marginLeft: '4px' }} htmlFor="done">Done</label>
              </div>
            </div>
            <button type="submit" className="btn custom-button mt-3">
              Create Task
            </button>
            <Link to="/tasks" className="btn btn-link mt-3">
              Back to tasks
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;