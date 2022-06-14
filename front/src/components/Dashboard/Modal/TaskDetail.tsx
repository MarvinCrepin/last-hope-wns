import { BsHourglass, BsHourglassBottom } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";

type Props = {
  task: TaskInList;
  closeModal: () => void;
};

function TaskDetail({ task, closeModal }: Props) {
  console.log(task);

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

        <div className="p-8 inline-block align-bottom text-left transform transition-all  sm:align-middle  w-full h-full">
          <div className=" bg-lh-primary text-xl h-14  font-text text-lh-light w-fit p-4 rounded-t-lg">
            <div>{`Task detail - ${task.subject}`}</div>
          </div>
          <div className=" bg-white rounded-b-lg rounded-tr-lg grid grid-cols-2 py-4">
            <div className="flex flex-col items-center justify-center">
              <div className="space-y-8 py-4 w-4/5">
                {/* ZONE TIME */}
                <div className="flex space-x-3 font-text text-xl	">
                  <div className="space-y-2">
                    <div className="space-x-3 flex items-center inset-1">
                      <BsHourglass size={20} />
                      <div className="">Initial Time Spent Estimee</div>
                    </div>
                    <div className="space-x-3 flex items-center inset-1">
                      <BsHourglassBottom size={20} />
                      <div className="">Total Time Spent</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-lh-dark font-semibold ">{`1 Hours`}</div>
                    <div className="text-lh-primary font-semibold">{`${task.advancement} Hours (46,45%)`}</div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h3 className="text-lh-primary font-title text-4xl">
                    {task.subject}
                  </h3>
                  <p className="font_weight_400 font-text text-xl	">
                    {task.description}
                  </p>
                </div>

                {/* Assignee */}
                <div className="space-y-4">
                  <h3 className="text-lh-primary font-title text-4xl">
                    Assignee
                  </h3>
                  <div className="font_weight_400 font-text text-xl	flex items-center space-x-2">
                    <FaRegUserCircle size={30} /> <span>{task.assignee}</span>
                  </div>
                </div>

                {/* <div>ASSIGNE</div>
              <div>DOCUMENT</div>
              <div>EDIT</div> */}
              </div>
            </div>
            <div className="flex justify-center"></div>
          </div>
          {/* <div className=" bg-white  rounded-lg  flex items-end sm:items-center justify-center p-4 text-center sm:p-0 h-full">
            <div className=" relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:w-full">
              test
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
