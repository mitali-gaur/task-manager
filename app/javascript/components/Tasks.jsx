import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const STATUSES = ['to_do', 'in_progress', 'done']

  useEffect(() => {
    const url = "/api/v1/tasks";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setTasks(res.data)
      })
      .catch(() => navigate("/"));
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, statusFilter]);

  const deleteTask = (taskId) => {
    const url = `/api/v1/tasks/${taskId}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== taskId));
        navigate("/tasks");
      })
      .catch((error) => console.log(error.message));
  };

  const updateStatus = (taskId, status) => {
    const url = `/api/v1/tasks/${taskId}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const body = { status };

    fetch(url, {
      method: "PATCH",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        var newTasks = tasks
        setTasks(newTasks.map(_task => {
          if (_task.id === response['data']['id']) {
            return response['data'];
          }
          return _task;
        }));
        navigate("/tasks");
      })
      .catch((error) => console.log(error.message));
  };

  const filterTasks = () => {
    if (statusFilter === 'all') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task => task.status === statusFilter);
      setFilteredTasks(filtered);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'to_do':
        return 'badge-danger';
      case 'in_progress':
        return 'badge-warning';
      case 'done':
        return 'badge-success';
      default:
        return 'badge-secondary';
    }
  };

  const allTasks = filteredTasks.map((task, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{task.title}</h5>
          <div>
            <span className={`badge ${getStatusBadgeClass(task.status)}`}>{task.status.replace('_', ' ')}</span>
          </div>
          <p />
          <div className="card-body">{task.description || '--'}</div>
          <div>
            <select id="status" onChange={(event) => updateStatus(task.id, event.target.value)}>
              <option value=''>change status</option>
              {
                STATUSES.filter(status => task.status !== status).map(_status => (
                  <option key={_status} value={_status}>
                    {_status.replace('_', ' ').toUpperCase()}
                  </option>
                ))
              }
            </select>
            <button
              type="button"
              className="btn btn-danger"
              style={{ float: 'right' }}
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  const noTask = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No tasks yet. Why not <Link to="/tasks/new">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Tasks</h1>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div>
            Filter (by Status):
            <select id="task_filter" onChange={(event) => setStatusFilter(event.target.value)} style={{ marginLeft: '5px' }}>
              <option value='all' className={`${statusFilter === 'all' ? 'active' : ''}`}>All</option>
              <option value='to_do' className={`${statusFilter === 'to_do' ? 'active' : ''}`}>To Do</option>
              <option value='in_progress' className={`${statusFilter === 'in_progress' ? 'active' : ''}`}>In Progress</option>
              <option value='done' className={`${statusFilter === 'done' ? 'active' : ''}`}>Done</option>
            </select>
          </div>

          <div className="text-end mb-3">
            <Link to="/tasks/new" className="btn custom-button">
              Create New Task
            </Link>
          </div>
          <div className="row">
            {tasks.length > 0 ? allTasks : noTask}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
};

export default Tasks;
