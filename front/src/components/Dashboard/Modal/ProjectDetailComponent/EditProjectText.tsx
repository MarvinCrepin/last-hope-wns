import React, { useEffect } from "react";
import ButtonForm from "../../../Login/ButtonForm";

interface IProps {
  project: any;
  closeModal: () => void;
  updatedProject: (data: { title: string; description: string }) => void;
}

export default function EditProjectText({
  closeModal,
  project,
  updatedProject,
}: IProps) {
  const [projectInformation, setProjectInformation] = React.useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    setProjectInformation({
      title: project.title,
      description: project.description,
    });
  }, [project]);

  const isDifferent = () => {
    if (
      project.title !== projectInformation.title ||
      project.description !== projectInformation.description
    ) {
      return true;
    }
    return false;
  };

  const updatedProjectIfDifferent = () => {
    if (isDifferent()) {
      updatedProject(projectInformation);
    }
  };

  return (
    <div
      className="task-detail fixed z-20 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity "
          onClick={() => closeModal()}
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="p-8 inline-block align-bottom text-left transform transition-all  sm:align-middle w-1/2  h-full">
          <div className="w-full relative bg-white rounded-lg flex flex-col px-6 py-4">
            <h3 className="text-lh-primary font-title text-4xl pb-4">
              Informations
            </h3>
            <form>
              <div className="mb-4 relative flex flex-col">
                <label
                  htmlFor="title"
                  className="text-lh-primary text-2xl mb-1.5"
                >
                  Title
                </label>
                <input
                  required
                  onChange={(e) =>
                    setProjectInformation({
                      ...projectInformation,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={projectInformation.title}
                  className="rounded bg-lh-light text-lh-dark p-2 border-[1.5px] border-lh-dark focus-visible:ring-lh-primary"
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Task's title"
                />
              </div>

              <div className="mb-4 relative flex flex-col">
                <label
                  htmlFor="description"
                  className="text-lh-primary text-2xl mb-1.5"
                >
                  Description
                </label>
                <textarea
                  value={projectInformation.description}
                  onChange={(e) =>
                    setProjectInformation({
                      ...projectInformation,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="h-40 rounded bg-lh-light text-lh-dark p-2 border-[1.5px] border-lh-dark focus-visible:ring-lh-primary"
                  id="description"
                  name="description"
                  placeholder="Task's description"
                ></textarea>
              </div>
              <div className="flex justify-end ">
                <div className="space-x-2">
                  <ButtonForm
                    text="Cancel"
                    type="button"
                    textSize="text-2xl"
                    action={() => closeModal()}
                    textFont="title"
                  />
                  <ButtonForm
                    text="Modified"
                    type="button"
                    textSize="text-2xl"
                    action={() => updatedProjectIfDifferent()}
                    textFont="title"
                    isDisabled={!isDifferent()}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
