import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Task = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ ingredients: "" });

  useEffect(() => {
    const url = `/api/v1/tasks/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {debugger; setTask(response)})
      .catch(() => navigate("/tasks"));
  }, [params.id]);

  

  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        {/* <img
          src={recipe.image}
          alt={`${recipe.name} image`}
          className="img-fluid position-absolute"
        /> */}
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {task.title}
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <ul className="list-group">
              <h5 className="mb-2">Description</h5>
              {task.description}
            </ul>
          </div>
          <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Status</h5>
            {task.status}
          </div>
          <div className="col-sm-12 col-lg-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteTask}
            >
              Delete Task
            </button>
          </div>
        </div>
        <Link to="/tasks" className="btn btn-link">
          Back to tasks
        </Link>
      </div>
    </div>
  );
};

export default Task;
