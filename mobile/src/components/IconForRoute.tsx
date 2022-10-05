const iconForRoute = (
  { name }: { name: string },
  size: number
): { name: string; size: number } => {
  switch (name) {
    case "Home":
      return { name: "home", size: size };
    case "Account":
      return { name: "person-circle", size: size + 5 };
    case "Search":
      return { name: "search-circle", size: size + 8 };
    default:
      return { name: "", size: size };
  }
};

export default iconForRoute;
