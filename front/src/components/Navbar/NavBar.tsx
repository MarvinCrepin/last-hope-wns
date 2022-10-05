import { FaLaptopCode } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoIosLogIn } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { MdMenuBook } from "react-icons/md";

import Logo from "../../assets/img/logo_LastHope_inline.png";
import DropDownMenu from "./DropDownMenu"


export default function Navbar() {
  return (
      <nav className="flex justify-end p-5">
        <div>
           <DropDownMenu/>
        </div>
        
      </nav>
   
  );
}
