export const theme = (userRole: string, type: string) => {
  if (type === "dashboard") {
    if(userRole === "administrator") {
      return "bg-lh-dark"
    } 
    else {
      return "bg-lh-primary"
    }
  }
  else if(type === "nav-link") {
    if(userRole === "administrator") {
      return "bg-lh-dark text-lh-light"
    } 
    else {
      return "bg-lh-primary text-lh-light"
    }
  }
};

export const titleByRole = (userRole: string) => {
  const dashboardTitle: any = {
    dev: "Dashboard",
    product_owner: "Dashboard Manager",
    administrator: "Admin Dashboard",
  };
  return dashboardTitle[userRole]
};
