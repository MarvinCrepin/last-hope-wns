import { Column, DashboardTitle } from "../global";

import { BiTask } from "react-icons/bi";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { HiOutlineTicket } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";

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
    if (userRole !== "ROLE_DEVELOPER" /* && roleList.includes(userRole) */) {
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
