import { Routes, Route, NavLink, Navigate } from "react-router-dom";

import TaskList from "../../components/Dashboard/TaskList";
import EmployeesList from "../../components/Dashboard/EmployeesList";
import ProjectList from "../../components/Dashboard/ProjectList";

import { FaPencilAlt } from "react-icons/fa";

export default function Dashboard({}) {
  const ContainerRadiux = {
    boxShadow: "8px 8px 10px rgba(0, 0, 0, 0.25)",
  };

  return (
    <div className="flex items-centers flex-col justify-self-stretch">
      <header className=""></header>

      <div className="py-4 flex items-center justify-center space-x-4 text-6xl text-lh-dark font-title">
        <span>Dashboard</span>
        <FaPencilAlt size={45} />
      </div>
      <main className="mx-2 md:mx-12 lg:mx-28">
        <nav className="space-x-1.5 text-2xl py-1">
          <NavLink
            to="/dashboard/task"
            className={(el) =>
              "py-1.5 px-2 font-title rounded-t-md" +
              (el.isActive
                ? " bg-lh-primary text-lh-light"
                : " bg-lh-gray text-lh-dark")
            }
          >
            Tasks
          </NavLink>
          <NavLink
            to="/dashboard/projects"
            className={(el) =>
              "py-1.5 px-2 font-title rounded-t-md" +
              (el.isActive
                ? " bg-lh-primary text-lh-light"
                : " bg-lh-gray text-lh-dark")
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/dashboard/employees"
            className={(el) =>
              "py-1.5 px-2 font-title rounded-t-md" +
              (el.isActive
                ? " bg-lh-primary text-lh-light"
                : " bg-lh-gray text-lh-dark")
            }
          >
            Employees
          </NavLink>
        </nav>
        <div style={ContainerRadiux} className=" shadow-lg rounded-lg">
          <Routes>
            <Route index element={<Navigate replace to="/dashboard/task" />} />
            <Route path="/task" element={<TaskList />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/employees" element={<EmployeesList />} />
          </Routes>
          <div className="h-5 bg-lh-primary rounded-b-md"></div>
        </div>
      </main>
    </div>
  );
}