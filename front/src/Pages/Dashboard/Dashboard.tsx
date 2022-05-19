import { Routes, Route } from "react-router-dom";

import TaskList from "../../components/Dashboard/TaskList";
import EmployeesList from "../../components/Dashboard/EmployeesList";
import ProjectList from "../../components/Dashboard/ProjectList";

import { FaPencilAlt } from "react-icons/fa";

export default function Dashboard({}) {
  return (
    <div>
      <header className=""></header>

      <div className="py-4 flex items-center justify-center space-x-4 text-6xl text-lh-dark font-title">
        <span>Dashboard</span>
        <FaPencilAlt size={45} />
      </div>
      <main className="">
        <Routes>
          <Route path="" element={<TaskList />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/employees" element={<EmployeesList />} />
        </Routes>
      </main>
    </div>
  );
}
