import DropDownMenu from "./DropDownMenu";

export default function Navbar() {
  return (
    <nav className="flex justify-end p-5">
      <div>
        <DropDownMenu />
      </div>
    </nav>
  );
}
