import { FaDumpsterFire } from "react-icons/fa";

type Props = {
  project: Project;
  closeModal: () => void;
};

function ProjectDetail({ project, closeModal }: Props) {
  console.log(project);
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
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

        <div className="p-8 inline-block align-bottom text-left transform transition-all  sm:align-middle  sm:w-full">
          <div className=" bg-white  rounded-lg  flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <div className=" relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all   sm:w-full ">
              <div>
                <h3 className="text-2xl lh-primary font-bold mb-2">{"{ " + project.title + " }"}</h3>
                <p className="text-gray-700 text-base">
                  {project.description}
                </p>
              </div>
              <div>
                <h3 className="text-2xl lh-primary font-bold mb-2">Project Owner</h3>
                <h4 className="text-gray-700 text-base">{project.product_owner.firstname} {project.product_owner.lastname}</h4>
              </div>
              <div>
                <h3 className="text-2xl lh-primary font-bold mb-2">Members</h3>
                <ul className="list-disc list-inside">
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;