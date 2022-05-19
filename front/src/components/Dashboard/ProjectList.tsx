import TableDashboard from "./TableDashboard";

export default function ProjectList() {
  return (
    <div>
      <div className="w-full bg-lh-primary z-20 py-8 px-2 rounded-tr-md">
        <div className="flex items-center space-x-4">
          <label className="sr-only" htmlFor="filterSelect">
            Filter:
          </label>

          <select
            name="filterSelect"
            id="filterSelect"
            className="w-36 rounded-md bg-lh-secondary text-lh-light p-2"
          >
            <option value="allProject">All Projects</option>
          </select>
          <div className="">
            <input type="checkbox" name="" id="" />{" "}
            <span className="text-lh-light"> Assigned to me only</span>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <span className="text-lh-light"> Hide done</span>
          </div>
        </div>
        <div></div>
      </div>
      <div><TableDashboard /></div>
    </div>
  );
}
