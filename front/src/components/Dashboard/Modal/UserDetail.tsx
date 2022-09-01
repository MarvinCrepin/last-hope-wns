import { useState } from "react";
import { useMutation } from "@apollo/client";
import UpdateUser from "../../../graphql/queries/User/UpdateUser";
import { User } from "../../global";
import ButtonForm from "../../Login/ButtonForm";
import "../../../assets/css/userModal.css";
import { roleList, theme } from "../../common/Utils";
import GetUserById from "../../../graphql/queries/User/GetUserById";
import { AiOutlineClose } from "react-icons/ai";
type Props = {
  user: any;
  closeModal: () => void;
};
function UserDetail({ user, closeModal }: Props) {
  const [updateUser, { data, loading, error }] = useMutation(UpdateUser, {
    refetchQueries: [{ query: GetUserById, variables: { userId: user.id } }],
  });
  const [firstName, setFirstName] = useState(user.firstname);
  const [lastName, setLastName] = useState(user.lastname);
  const [email, setEmail] = useState(user.mail);
  const [password, setPassword] = useState("");
  const [detailsIsActive, setDetailsIsActive] = useState(true);
  const submitPasswordChange = () => {
    updateUser({
      variables: {
        userId: user.id,
        data: {
          password: password
        }
      },
    });
  };

  const submitUserChange = () => {
    updateUser({
      variables: {
        userId: user.id,
        data: {
        firstname: firstName,
        lastname: lastName,
        mail: email
        },
      },
    });
  };
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity "></div>
        <div className="inline-block align-bottom text-left transform transition-all sm:align-middle user-modal project-modal">
          <a
            onClick={(e) => setDetailsIsActive(true)}
            className={
              "py-1.5 px-2 font-title rounded-t-md" +
              theme(roleList[0], "nav-link", { isActive: detailsIsActive })
            }
          >
            Details
          </a>
          <a
            onClick={(e) => setDetailsIsActive(false)}
            className={
              "py-1.5 px-2 font-title rounded-t-md" +
              theme(roleList[0], "nav-link", { isActive: !detailsIsActive })
            }
          >
            Security
          </a>

          <div
            className={
              "bg-white  rounded-lg  flex justify-center min-h-full p-4 text-center sm:p-0"
            }
          >
            <div className="relative rounded-lg text-left overflow-hidden transform transition-all ">
              <div className="py-8 px-2 sm:pl-6 sm:pr-6">
                <button
                  className="close-modal-btn"
                  onClick={(e) => closeModal()}
                >
                  <AiOutlineClose className="close-modal-icon" />{" "}
                </button>

                <div>
                  <div className="flex flex-col justify-center items-center">
                    <h1 className="font-title  text-lh-dark text-5xl">
                      {user.firstname.concat(" ", user.lastname)}
                    </h1>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        submitUserChange();
                      }}
                      className="flex flex-col pdng-5  justify-center items-center"
                    >
                      <div
                        className={
                          "details" +
                          theme(roleList[0], "hidden", {
                            isActive: detailsIsActive,
                          })
                        }
                      >
                        <div className="my-4 flex">
                          <label className="sr-only" htmlFor="email">
                            Email
                          </label>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full sm:w-96 appearance-none border border-lh-dark rounded-lg py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="sr-only" htmlFor="firstname">
                            firstname
                          </label>
                          <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full sm:w-96 appearance-none border border-lh-dark rounded-lg py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none focus:shadow-outline"
                            id="firstname"
                            type="firstname"
                            placeholder="Jean"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="sr-only" htmlFor="lastname">
                            lastname
                          </label>
                          <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full sm:w-96 appearance-none border border-lh-dark rounded-lg py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none focus:shadow-outline"
                            id="lastname"
                            type="lastname"
                            placeholder="Dupont"
                          />
                        </div>
                        <ButtonForm
                          text="Save"
                          type="submit"
                          customClass="w-32"
                        />
                      </div>
                    </form>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        submitPasswordChange();
                      }}
                    >
                      <div
                        className={
                          "security" +
                          theme(roleList[0], "hidden", {
                            isActive: !detailsIsActive,
                          })
                        }
                      >
                        <div className="mb-4 relative">
                          <label className="sr-only" htmlFor="password">
                            Password
                          </label>
                          <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full sm:w-96 appearance-none border border-lh-dark rounded-lg py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="password"
                          />
                          <div className="mb-8 my-4 relative">
                            <label
                              className="sr-only"
                              htmlFor="confirmPassword"
                            >
                              Confirm password
                            </label>
                            <input
                              className="w-full sm:w-96 appearance-none border border-lh-dark rounded-lg py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none focus:shadow-outline"
                              id="confirmPassword"
                              type="password"
                              placeholder="confirm password"
                            />
                          </div>
                        </div>

                        <ButtonForm
                          text="Save"
                          type="submit"
                          customClass="w-32"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
