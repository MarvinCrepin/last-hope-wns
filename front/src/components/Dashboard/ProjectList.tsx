
import TableDashboard from "./TableDashboard";
import { FaSearch } from "react-icons/fa";


export default function ProjectList() {
  return (
    <div>
      <div className="w-full bg-lh-primary z-20 py-8 px-2 rounded-tr-md md:h-30">
        <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row justify-between items-center">
          <div className="flex items-center flex-col space-y-2 md:space-y-0 md:flex-row">
            <div className="mx-2 flex items-center space-x-1">
              <input
                className="rounded-md h-5 w-5"
                type="checkbox"
                name="hideDone"
                id="hideDone"
              />
              <label htmlFor="hideDone" className="text-lh-light">
                Hide done
              </label>
            </div>
          </div>

          <div className="relative flex item-centers">
            <label htmlFor="searchInput" className="sr-only">
              Recherche
            </label>
            <input
              type="text"
              id="searchInput"
              name="searchInput"
              placeholder="Search"
              className="rounded-md h-8 mx-2 px-8"
            />
            <FaSearch className="absolute top-2 left-4 text-gray-500" />
          </div>
        </div>
      </div>
      <div><TableDashboard /></div>
    </div>
  );
}
