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
          <div className=" bg-white rounded-b-lg rounded-tr-lg flex flex-col lg:grid lg:grid-cols-2 py-4 ">
            {/* Left column */}
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
                    <div className="text-lh-primary font-semibold">{`${
                      task.advancement
                    } Hours (${task.advancement * 100} %)`}</div>
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

                {/* Document */}
                <div className="space-y-4">
                  <h3 className="text-lh-primary font-title text-4xl">
                    Documents
                  </h3>
                  <div className="font_weight_400 font-text text-xl	flex items-center space-x-2">
                    No documents found
                  </div>
                </div>

                {/* Edit */}
                <div className="space-y-4">
                  <h3 className="text-lh-primary font-title text-4xl">Edit</h3>
                  <div className="flex  flex-col lg:grid  lg:grid-cols-5 gap-4">
                    <div className="font_weight_400 font-text text-xl	flex items-center space-x-2  lg:col-span-2 ">
                      <div className="flex items-center">
                        <div className=" space-y-4">
                          <div>From</div>
                          <div>To</div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex">
                            <input
                              className="bg-lh-primary w-10 mx-2 rounded-lg text-lh-light block"
                              min={0}
                              max={24}
                              type="number"
                              name="fromTimeHour"
                              id="fromTimeHour"
                            />
                            <div>:</div>
                            <input
                              min={0}
                              max={59}
                              className="bg-lh-primary w-10 mx-2 rounded-lg text-lh-light"
                              type="number"
                              name="fromTimeMin"
                              id="fromTimeMin"
                            />
                          </div>

                          <div className="flex">
                            <input
                              min={0}
                              max={24}
                              className="bg-lh-primary w-10 mx-2 rounded-lg text-lh-light"
                              type="number"
                              name="toTimeHour"
                              id="toTimeHour"
                            />
                            <div>:</div>
                            <input
                              min={0}
                              max={59}
                              className="bg-lh-primary w-10 mx-2 rounded-lg text-lh-light"
                              type="number"
                              name="toTimeMin"
                              id="toTimeMin"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 flex items-center justify-start lg:col-span-3">
                      <button className="bg-lh-secondary text-lh-light px-2 py-1.5 rounded-lg">
                        Add to Spent Time
                      </button>
                    </div>
                  </div>

                  {/* Advancement */}
                  <div className="flex  flex-col lg:grid  lg:grid-cols-5 gap-4">
                    <div className="font_weight_400 font-text text-xl	flex items-center space-x-2 lg:col-span-2">
                      <select
                        name="advancement"
                        id="advancement"
                        className="bg-lh-light w-1/2 border-2 border-lh-dark rounded-lg px-1.5"
                      >
                        <option value="0">0%</option>
                        <option value="10">10%</option>
                        <option value="20">20%</option>
                        <option value="30">30%</option>
                        <option value="40">40%</option>
                        <option value="50">50%</option>
                        <option value="60">60%</option>
                        <option value="70">70%</option>
                        <option value="80">80%</option>
                        <option value="90">90%</option>
                        <option value="100">100%</option>
                      </select>
                      <div></div>
                    </div>
                    <div className="space-y-4 flex items-center justify-start lg:col-span-3">
                      <label htmlFor="advancement">Advancement</label>
                    </div>
                  </div>

                  {/* Advancement */}
                  <div className="flex  flex-col lg:grid  lg:grid-cols-5 gap-4">
                    <div className="font_weight_400 font-text text-xl	flex items-center space-x-2 lg:col-span-2">
                      <select
                        name="status"
                        id="status"
                        className="bg-lh-light w-1/2 border-2 border-lh-dark rounded-lg px-1.5"
                      >
                        <option value="0">In Progress</option>
                        <option value="10">stat 2</option>
                        <option value="20">20%</option>
                      </select>
                      <div></div>
                    </div>
                    <div className="space-y-4 flex items-center justify-start lg:col-span-3">
                      <label htmlFor="status">Status</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right column */}
            <div className="flex justify-center">
              <div className="space-y-8 py-4 w-4/5"></div>
            </div>
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
