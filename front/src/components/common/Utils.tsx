import { Column } from "../global";

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
export const roleList = ["Developer", "Project Manager", "Admin"];
export const titleByRole = (userRole: string) => {
  const dashboardTitle: any = {
    Developer: "Dashboard",
    Project_Manager: "Dashboard Manager",
    Admin: "Admin Dashboard",
  };
  return dashboardTitle[userRole];
};

export const columnsByRole = (
  userRole: string,
  type: string,
  meta: any = {}
): any => {
  if (type === "actions") {
    const columns: Column[] = [
      { id: "user", label: "User", style: "text", metadata: {} },
      { id: "roles", label: "Role", style: "select", metadata: {} },
    ];
    if (userRole !== "Developer" /* && roleList.includes(userRole) */) {
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
