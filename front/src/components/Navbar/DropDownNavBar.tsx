import * as React from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import Logo from "../../assets/img/logo_LastHope_inline.png";
import "../../assets/styles/navbar.css";

import { FaLaptopCode } from "react-icons/fa";
// import { VscAccount } from "react-icons/vsc";
// import { IoIosLogIn } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
// import {MdMenuBook} from "react-icons/md";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDownNavBar() {
  const [menuType, setMenuType] = React.useState("NOTIFICATION");

  const toggleMenu = (type: string) => {
    setTimeout(() => {
      setMenuType(type);
    }, 75);
  };

  return (
    <nav className="py-4 px-10 shadow-md flex justify-between mb-10">
      <Link to="/dashboard">
        <img src={Logo} alt="logo-last-hope" className="w-40" />
      </Link>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <div className="flex ">
            <Menu.Button
              onClick={() => toggleMenu("PROFILE")}
              className="account rounded-l-lg inline-flex justify-center gap-x-2 items-center p-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-lh-primary"
            >
              <FaLaptopCode color="var(--primary-color)" size={18} /> John Doe
            </Menu.Button>
            <Menu.Button
              onClick={() => toggleMenu("NOTIFICATION")}
              className="notifications rounded-r-lg inline-flex justify-center gap-x-1 items-center shadow-sm p-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-lh-primary"
            >
              <span className="relative">
                <IoIosNotifications size={25} />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  99
                </span>
              </span>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-75"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              {menuType === "NOTIFICATION" && <div>Notif</div>}
              {menuType === "PROFILE" && <div>profile</div>}
              {/* <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Profil
                    </a>
                  )}
                </Menu.Item>
                <form method="POST" action="#">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="submit"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block w-full text-left px-4 py-2 text-sm"
                        )}
                      >
                        <RiLogoutBoxLine /> Sign out
                      </button>
                    )}
                  </Menu.Item>
                </form>
              </div> */}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
}
