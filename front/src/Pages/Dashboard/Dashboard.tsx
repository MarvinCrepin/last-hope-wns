import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import TaskList from "../../components/Dashboard/TaskList";
import EmployeesList from "../../components/Dashboard/EmployeesList";
import ProjectList from "../../components/Dashboard/ProjectList";
import DropDownNavBar from "../../components/Navbar/DropDownNavBar";
import { role } from "../../slicer/authSlice";

import { FaPencilAlt } from "react-icons/fa";
import { theme, titleByRole } from "../../components/common/Utils";

export default function Dashboard() {
  const userRole: string = useSelector(role);
  const ContainerRadiux = {
    boxShadow: "8px 8px 10px rgba(0, 0, 0, 0.25)",
  };
  return (
    <div className="flex items-centers flex-col justify-self-stretch">
      <header className="">
        <DropDownNavBar />
      </header>

      <div className="py-4 flex items-center justify-center space-x-4 text-6xl text-lh-dark font-title text- ">
        <span>{titleByRole(userRole)}</span>
        <FaPencilAlt size={45} />
      </div>
      <main className="mx-2 md:mx-12 lg:mx-28">
        <nav className="space-x-1.5 text-2xl pt-1">
          <NavLink
            to="/dashboard/task"
            className={(el) =>
              "py-1.5 px-2 font-title rounded-t-md" +
              theme(userRole, "nav-link", { isActive: el.isActive })
            }
          >
            Tasks
          </NavLink>
          <NavLink
            to="/dashboard/projects"
            className={(el) =>
              "py-1.5 px-2 font-title rounded-t-md" +
              theme(userRole, "nav-link", { isActive: el.isActive })
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/dashboard/employees"
            className={(el) =>
              "py-1.5 px-2 font-title rounded-t-md" +
              theme(userRole, "nav-link", { isActive: el.isActive })
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
          <div
            className={`h-5 ${theme(userRole, "dashboard")} rounded-b-md`}
          ></div>
        </div>
      </main>
    </div>
  );
}
