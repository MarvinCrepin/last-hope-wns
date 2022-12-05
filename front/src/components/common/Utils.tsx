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

export const ROLES = {
  ADMIN: "ROLE_ADMIN",
  PRODUCT_MANAGER: "ROLE_PROJECT_MANAGER",
  DEVELOPER: "ROLE_DEVELOPER",
};

export const roleList = [ROLES.ADMIN, ROLES.PRODUCT_MANAGER, ROLES.DEVELOPER];

export const ROLELISTFORSELECT = [
  { value: ROLES.ADMIN, label: "Administrator" },
  { value: ROLES.PRODUCT_MANAGER, label: "Product Manager" },
  { value: ROLES.DEVELOPER, label: "Developer" },
];

export const theme = (userRole: string, type: string, meta: any = {}) => {
  if (type === "dashboard") {
    if (userRole === ROLES.ADMIN) {
      return "bg-lh-dark";
    } else {
      return "bg-lh-primary";
    }
  } else if (type === "nav-link") {
    if (userRole === ROLES.ADMIN) {
      return meta.isActive
        ? " bg-lh-dark text-lh-light"
        : " bg-lh-gray text-lh-dark";
    } else {
      return meta.isActive
        ? " bg-lh-primary text-lh-light"
        : " bg-lh-gray text-lh-dark";
    }
  }
  if (type === "hidden") {
    return !meta.isActive ? " hidden" : "";
  }
};

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

/**
 * Retourne si l'utilisateur est authorisé à devenir project manager d'un projet
 * @param userRole "ROLE_ADMIN" | "ROLE_DEVELOPER" | "ROLE_PROJECT_MANAGER"
 * @returns Boolean
 */
export const isAuthorizedTakeProjectManagerRole = (userRole: string) => {
  const authorizedRole = ["ROLE_PROJECT_MANAGER", "ROLE_ADMIN"];

  if (authorizedRole.includes(userRole)) return true;
  else return false;
};

/**
 * Retourne true si l'utilisateur est autorisé à manager le projet
 * @param user
 * @param productOwnerId
 * @returns Boolean
 */
export const isAuthorizedToManageProject = (
  user: {
    roles: string;
    id: string;
  },
  productOwnerId: string
) => {
  if (!productOwnerId) {
    return false;
  }

  const authorizedRole = ["ROLE_PROJECT_MANAGER", "ROLE_ADMIN"];

  if (!authorizedRole.includes(user.roles)) return false;
  if (user.roles === ROLES.ADMIN) return true;
  if (user.id !== productOwnerId) return false;
  else return true;
};

export const returnRoleName = (role: string): string => {
  switch (role) {
    case "ROLE_DEVELOPER":
      return "Developer";
    case "ROLE_PROJECT_MANAGER":
      return "Project Manager";
    case "ROLE_ADMIN":
      return "Administrator";
    default:
      return "";
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
};

/**
 * @param type "success" | "error" | "info" | "warning"
 * @param message  message to display
 * @param options ToastOptions
 */
export const notify = (
  type: string,
  message: string,
  options = notifyDefaultOptions
) => {
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
};

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
