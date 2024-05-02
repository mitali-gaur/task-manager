import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <hr className="my-4" />
        <Link
          to="/tasks"
          className="btn btn-lg custom-button"
          role="button"
        >
          View tasks
        </Link>
      </div>
    </div>
  </div>
)
