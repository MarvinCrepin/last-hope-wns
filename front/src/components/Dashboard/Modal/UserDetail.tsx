/* eslint-disable jsx-a11y/anchor-is-valid */
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
import ModalConfirm from "../../common/ModalConfirm";

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
    onCompleted: (data) => {
      notify("success", "Account succesfully updated");
      dispatch(
        UPDATE_USER_IN_STORE({
          user: data.UpdateUser,
        })
      );
    },
    onError: (error) => {
      notify(
        "error",
        `Something went wrong with the update [${error.message}]`
      );
    },
  });
  const [firstName, setFirstName] = useState(user.firstname);
  const [lastName, setLastName] = useState(user.lastname);
  const [email, setEmail] = useState(user.mail);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [detailsIsActive, setDetailsIsActive] = useState(true);
  const dispatch = useDispatch();

  const PasswordAndConfirmIsSame = (
    password: string,
    passwordConfirm: string
  ) => password === passwordConfirm;

  const submitPasswordChange = async () => {
    if (PasswordAndConfirmIsSame(password, passwordConfirm)) {
      try {
        await updateUser({
          variables: {
            userId: user.id,
            data: {
              password: password,
            },
          },
        });
        displayConfirmModalPassword(false);
      } catch (error) {
        console.error(error);
        notify("error", "Server error");
      }
    } else {
      return notify("error", "Password confirmation is not ok");
    }
  };

  const displayConfirmModalPassword = (state: boolean) => {
    setModalConfirmPassword(state);
  };

  const displayConfirmModalUser = (state: boolean) => {
    setModalConfirmUser(state);
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
    })
      .then(() => {
        displayConfirmModalUser(false);
      })
      .catch((error) => {
        console.error(error);
        notify("error", "Server error");
      });
  };

  const [modalConfirmPassword, setModalConfirmPassword] = useState(false);
  const [modalConfirmUser, setModalConfirmUser] = useState(false);

  return (
    <>
      <ModalConfirm
        textButtonConfirm="Save"
        textButtonCancel="Cancel"
        title="Change your password?"
        text="Are you sure you want to change your password? This action cannot be canceled."
        onConfirm={() => submitPasswordChange()}
        onCancel={() => setModalConfirmPassword(false)}
        isOpen={modalConfirmPassword ? true : false}
      />
      <ModalConfirm
        textButtonConfirm="Save"
        textButtonCancel="Cancel"
        title="Save your user info?"
        text="Are you sure you want to save your user info?"
        onConfirm={() => submitUserChange()}
        onCancel={() => setModalConfirmUser(false)}
        isOpen={modalConfirmUser ? true : false}
      />
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity "></div>
          <div className="inline-block text-left transform transition-all sm:align-middle user-modal h-[29em] w-full sm:w-[50%] lg:w-[30%]">
            <div className="flex">
              <div className="text-2xl font-title text-lh-light flex justify-center items-center rounded-t-lg mr-2">
                <a
                  onClick={() => setDetailsIsActive(true)}
                  className={
                    "pg-nav-user-modal py-1.5 px-2 font-title rounded-t-md cursor-pointer " +
                    theme(roleList[0], "nav-link", {
                      isActive: detailsIsActive,
                    })
                  }
                >
                  Details
                </a>
              </div>
              <div className="text-2xl font-title text-lh-light flex justify-center items-center rounded-t-lg">
                <a
                  onClick={(e) => setDetailsIsActive(false)}
                  className={
                    "pg-nav-user-modal py-1.5 px-2 font-title rounded-t-md cursor-pointer " +
                    theme(roleList[0], "nav-link", {
                      isActive: !detailsIsActive,
                    })
                  }
                >
                  Security
                </a>
              </div>
            </div>
            <div className="bg-white  rounder-user-modal h-full p-4 text-center sm:p-0 ">
              <div className="relative rounded-lg text-left overflow-hidden transform transition-all h-full">
                <button
                  className="close-modal-btn"
                  onClick={(e) => closeModal()}
                >
                  <AiOutlineClose className="close-modal-icon" />
                </button>

                <div className="py-8 px-2 sm:pl-6 sm:pr-6">
                  <div className="flex flex-col justify-center h-full">
                    <h1 className="font-title mb-1 text-center text-lh-dark text-4xl">
                      {user.firstname.concat(" ", user.lastname)}
                    </h1>
                    <h2 className="font-title mb-4 text-center text-lh-primary text-2xl">
                      {returnRoleName(user.roles)}
                    </h2>
                    {detailsIsActive && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          displayConfirmModalUser(true);
                        }}
                        className="flex-1"
                      >
                        <div className="flex flex-col justify-between h-full">
                          <div className="">
                            <div className="my-2 flex flex-col">
                              <label
                                htmlFor="email"
                                className="text-lh-primary text-2xl"
                              >
                                Mail
                              </label>
                              <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                type="email"
                              />
                            </div>
                            <div className="mb-2 flex flex-col">
                              <label
                                htmlFor="firstname"
                                className="text-lh-primary text-2xl"
                              >
                                Firstname
                              </label>
                              <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                id="firstname"
                                type="firstname"
                                placeholder="Jean"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="lastname"
                                className="text-lh-primary text-2xl"
                              >
                                Lastname
                              </label>
                              <input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                id="lastname"
                                type="lastname"
                                placeholder="Dupont"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end mt-4">
                            <ButtonForm
                              text="Save"
                              type="submit"
                              width="w-32"
                              textFont="title"
                            />
                          </div>
                        </div>
                      </form>
                    )}

                    {!detailsIsActive && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          displayConfirmModalPassword(true);
                        }}
                        className="flex-1"
                      >
                        <div className="flex flex-col justify-between h-full">
                          <div>
                            <div className="my-2 flex flex-col">
                              <label
                                htmlFor="password"
                                className="text-lh-primary text-2xl"
                              >
                                Password
                              </label>
                              <input
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                type="password"
                              />
                            </div>
                            <div className="mb-2 flex flex-col">
                              <label
                                htmlFor="confirmPassword"
                                className="text-lh-primary text-2xl"
                              >
                                Confirm password
                              </label>
                              <input
                                onChange={(e) =>
                                  setPasswordConfirm(e.target.value)
                                }
                                id="confirmPassword"
                                type="password"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end mt-4">
                            <ButtonForm
                              text="Save"
                              type="submit"
                              width="w-32"
                              textFont="title"
                            />
                          </div>
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
    </>
  );
}

export default UserDetail;
