import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Tasks from "../components/Tasks";
import TaskForm from "../components/TaskForm";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/tasks/new" element={<TaskForm />} />
    </Routes>
  </Router>
);
