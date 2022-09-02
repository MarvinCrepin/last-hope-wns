import { useState } from "react";
import { useMutation } from "@apollo/client";
import UpdateUser from "../../../graphql/queries/User/UpdateUser";
import { User } from "../../global";
import ButtonForm from "../../Login/ButtonForm";
import "../../../assets/css/userModal.css";
import {
  notify,
  returnRoleName,
  roleList,
  theme,
  titleByRole,
} from "../../common/Utils";
import GetUserById from "../../../graphql/queries/User/GetUserById";
import { AiOutlineClose } from "react-icons/ai";
import { UPDATE_USER_IN_STORE } from "../../../slicer/authSlice";
import { useDispatch } from "react-redux";
import GetAllUsers from "../../../graphql/queries/User/GetAllUsers";

type Props = {
  user: any;
  closeModal: () => void;
};
function UserDetail({ user, closeModal }: Props) {
  const [updateUser, { data, loading, error }] = useMutation(UpdateUser, {
    refetchQueries: [
      { query: GetUserById, variables: { userId: user.id } },
      { query: GetAllUsers },
    ],
  });
  const [firstName, setFirstName] = useState(user.firstname);
  const [lastName, setLastName] = useState(user.lastname);
  const [email, setEmail] = useState(user.mail);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [detailsIsActive, setDetailsIsActive] = useState(true);
  const dispatch = useDispatch();

  const isConfirmPasswordOk = (password: string, passwordConfirm: string) =>
    password === passwordConfirm;

  const submitPasswordChange = () => {
    if (isConfirmPasswordOk(password, passwordConfirm)) {
      updateUser({
        variables: {
          userId: user.id,
          data: {
            password: password,
          },
        },
      });
    } else {
      return notify("error", "Password confirmation is not ok");
    }

    if (!error) {
      notify("success", "Password updated");
    } else {
      notify("error", error.message);
    }
  };

  const submitUserChange = () => {
    const updatedUser = {
      firstname: firstName,
      lastname: lastName,
      mail: email,
    };
    updateUser({
      variables: {
        userId: user.id,
        data: {
          ...updatedUser,
        },
      },
      onError: (error) => {
        notify("error", error.message);
      },
      onCompleted: (data) => {
        notify("success", "User updated");
        dispatch(
          UPDATE_USER_IN_STORE({
            user: data.UpdateUser,
          })
        );
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
        <div className="inline-block text-left transform transition-all sm:align-middle user-modal ">
          <a
            onClick={(e) => setDetailsIsActive(true)}
            className={
              "pg-nav-user-modal px-2 font-title rounded-t-md" +
              theme(roleList[0], "nav-link", { isActive: detailsIsActive })
            }
          >
            Details
          </a>
          <a
            onClick={(e) => setDetailsIsActive(false)}
            className={
              "pg-nav-user-modal px-2 font-title rounded-t-md" +
              theme(roleList[0], "nav-link", { isActive: !detailsIsActive })
            }
          >
            Security
          </a>

          <div
            className={
              "bg-white  rounder-user-modal min-h-full p-4 text-center sm:p-0"
            }
          >
            <div className="relative rounded-lg text-left overflow-hidden transform transition-all ">
              <button className="close-modal-btn" onClick={(e) => closeModal()}>
                <AiOutlineClose className="close-modal-icon" />
              </button>

              <div className="py-8 px-2 sm:pl-6 sm:pr-6">
                <div>
                  <div className="flex flex-col justify-center ">
                    <h1 className="font-title mb-3 text-center text-lh-dark text-4xl">
                      {user.firstname.concat(" ", user.lastname)}
                    </h1>
                    <h2 className="font-title  text-center text-lh-primary text-2xl">
                      {returnRoleName(user.roles)}
                    </h2>
                    {detailsIsActive && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          submitUserChange();
                        }}
                        className="flex flex-col   justify-center "
                      >
                        <div className={"details"}>
                          <div className="my-2">
                            <label  htmlFor="email">
                              Mail
                            <input
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full appearance-none border border-lh-dark rounded-lg py-2 px-3 text-gray-700 font-text leading-tight "
                              id="email"
                              type="email"
                            />
                            </label>

                          </div>
                          <div className="mb-2">
                            <label htmlFor="firstname">
                              Firstname
                              <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full appearance-none border border-lh-dark rounded-lg py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none"
                                id="firstname"
                                type="firstname"
                                placeholder="Jean"
                              />
                            </label>
                          </div>
                          <div className="mb-4">
                            <label  htmlFor="lastname">
                              Lastname

                            <input
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="w-full appearance-none border border-lh-dark rounded-lg py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none"
                              id="lastname"
                              type="lastname"
                              placeholder="Dupont"
                            />
                                                        </label>
                          </div>
                          <ButtonForm
                            text="Save"
                            type="submit"
                            customClass="w-32"
                          />
                        </div>
                      </form>
                    )}
                    <div>
                      {!detailsIsActive && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            submitPasswordChange();
                          }}
                        >
                          <div className={"security"}>
                            <div className="mb-4 mt-2 relative">
                              <label  htmlFor="password">
                                Password

                              <input
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full  appearance-none border border-lh-dark rounded-lg py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none"
                                id="password"
                                type="password"
                              />
                              </label>
                              <div className="mb-8 my-2 relative">
                                <label
                                 
                                  htmlFor="confirmPassword"
                                >
                                  Confirm password
                                <input
                                  onChange={(e) =>
                                    setPasswordConfirm(e.target.value)
                                  }
                                  className="w-full appearance-none border border-lh-dark rounded-lg mb-9 py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none"
                                  id="confirmPassword"
                                  type="password"
                                />
                                </label>

                              </div>
                            </div>

                            <ButtonForm
                              text="Save"
                              type="submit"
                              customClass="w-32 mt-4"
                            />
                          </div>
                        </form>
                      )}
                    </div>
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
