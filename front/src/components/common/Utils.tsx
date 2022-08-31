import { Column, DashboardTitle } from "../global";
import { toast, ToastOptions } from "react-toastify";
import { BiTask } from "react-icons/bi";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { HiOutlineTicket } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { FaRegHandSpock } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

export const notificationIcone = (type: string, classname: string) => {
  switch (type) {
    case "task":
      return <BiTask className={classname} />;
    case "project":
      return <AiOutlineFundProjectionScreen className={classname} />;
    case "ticket":
      return <HiOutlineTicket className={classname} />;
    case "user":
      return <FaRegUser className={classname} />;
    case "welcome":
      return <FaRegHandSpock className={classname} />;
    case "deletion":
      return <RiDeleteBin6Line className={classname} />;
  }
};

export const theme = (userRole: string, type: string, meta: any = {}) => {
  if (type === "dashboard") {
    if (userRole === "administrator") {
      return "bg-lh-dark";
    } else {
      return "bg-lh-primary";
    }
  } else if (type === "nav-link") {
    if (userRole === "administrator") {
      return meta.isActive
        ? " bg-lh-dark text-lh-light"
        : " bg-lh-gray text-lh-dark";
    } else {
      return meta.isActive
        ? " bg-lh-primary text-lh-light"
        : " bg-lh-gray text-lh-dark";
    }
  }
};

export const roleList = [
  "ROLE_DEVELOPER",
  "ROLE_PROJECT_MANAGER",
  "ROLE_ADMIN",
];

export const titleByRole = (userRole: string): string => {
  const dashboardTitle: DashboardTitle = {
    ROLE_DEVELOPER: "Dashboard",
    ROLE_PROJECT_MANAGER: "Dashboard Manager",
    ROLE_ADMIN: "Admin Dashboard",
  };
  return dashboardTitle[userRole];
};

export const columnsByRole = (
  userRole: "ROLE_ADMIN" | "ROLE_DEVELOPER" | "ROLE_PROJECT_MANAGER" | "",
  type: string,
  meta: any = {}
): any => {
  if (type === "actions") {
    const columns: Column[] = [
      { id: "user", label: "User", style: "text", metadata: {} },
      { id: "roles", label: "Role", style: "select", metadata: {} },
    ];
    if (userRole !== "ROLE_DEVELOPER") {
      columns.push({
        id: "actions",
        label: "Actions",
        style: "actions",
        metadata: {},
      });
    }
    return columns;
  }
};

export const isAuthorizedToManageProject = (userRole: string) => {
  const authorizedRole = ["ROLE_PROJECT_MANAGER", "ROLE_ADMIN"];

  if (authorizedRole.includes(userRole)) return true;
  else return false;
};

export const returnRoleName = (role: string): string => {
  switch (role) {
    case "ROLE_DEVELOPER":
      return "Developer";
    case "ROLE_PROJECT_MANAGER":
      return "Project Manager";
    case "ROLE_ADMIN":
      return "Administrator";
    default: return "";
  }
};

const notifyDefaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored"
  }

export const notify = (type: string, message: string, options = notifyDefaultOptions) => {
  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warning":
      toast.warn(message, options);
      break;
  }
}

