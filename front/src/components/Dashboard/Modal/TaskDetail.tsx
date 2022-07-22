import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

import UpdateTicket from "../../../graphql/mutation/Ticket/UpdateTicket";
import getAllTickets from "../../../graphql/queries/Ticket/GetAllTicket";
import GetAllState from "../../../graphql/queries/State/GetAllState";

import { BsHourglass, BsHourglassBottom } from "react-icons/bs";
import { State, TaskInList } from "../../global";
import { FaPaperPlane, FaRegUserCircle } from "react-icons/fa";

import { AiOutlineClose } from "react-icons/ai";

import { loading as load, TOOGLE_LOAD } from "../../../slicer/appSlice";

type Props = {
  taskPassed: TaskInList;
  closeModal: () => void;
};

export default function TaskDetail({ taskPassed, closeModal }: Props) {
  const loadingInStore = useSelector(load);
  const dispatch = useDispatch();
  const { loading: loadingState, data: dataState } = useQuery(GetAllState);

  const [task, setTask] = useState<TaskInList | any>({});

  const [hourFrom, setHourFrom] = useState({ hourFrom: 0, minFrom: 0 });
  const [hourTo, setHourTo] = useState({ hourTo: 0, minTo: 0 });

  const [updateTicket, { data, loading, error }] = useMutation(UpdateTicket, {
    refetchQueries: [{ query: getAllTickets }],
  });

  useEffect(() => {
    if (taskPassed) {
      setTask(taskPassed);
    }
  }, [taskPassed]);

  useEffect(() => {
    if (data) {
      setTask(data.UpdateTicket);
    }
  }, [data]);

  const changehourFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name.includes("hour")) {
      if (parseInt(e.target.value) <= 24) {
        setHourFrom({ ...hourFrom, [e.target.name]: e.target.value });
      }
    }
    if (e.target.name.includes("min")) {
      if (parseInt(e.target.value) <= 59) {
        setHourFrom({ ...hourFrom, [e.target.name]: e.target.value });
      }
    }
  };

  const changehourTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name.includes("hour")) {
      if (parseInt(e.target.value) <= 24) {
        setHourTo({ ...hourTo, [e.target.name]: e.target.value });
      }
    }
    if (e.target.name.includes("min")) {
      if (parseInt(e.target.value) <= 59) {
        setHourTo({ ...hourTo, [e.target.name]: e.target.value });
      }
    }
  };

  const addSpentTime = () => {
    const timeFrom = moment().hour(hourFrom.hourFrom).minute(hourFrom.minFrom);
    const timeTo = moment().hour(hourTo.hourTo).minute(hourTo.minTo);

    const diff = timeTo.diff(timeFrom);
    const duration = moment.duration(diff);

    const differenceInHour = duration.hours() + duration.minutes() / 60;

    const newPassedTime = task.passed_time + differenceInHour;

    dispatch(TOOGLE_LOAD(true));
    updateTicket({
      variables: {
        ticketId: task.id,
        data: { passed_time: newPassedTime },
      },
    });
  };

  const changeEnum = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: String
  ) => {
    dispatch(TOOGLE_LOAD(true));
    let value = null;

    updateTicket({
      variables: {
        ticketId: task.id,
        data: {
          [e.target.name]:
            type === "int" ? parseInt(e.target.value) : e.target.value,
        },
      },
    });
  };

  return (
    <div
      className="task-detail fixed z-10 inset-0 overflow-y-auto"
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
          <div className=" bg-lh-primary text-xl h-12  font-text text-lh-light w-fit px-3 flex justify-center items-center rounded-t-lg">
            <div>{`Task detail - ${task.title}`}</div>
          </div>
          <div className="relative bg-white rounded-b-lg rounded-tr-lg flex flex-col lg:grid lg:grid-cols-2 py-8 ">
            <div
              className="absolute right-2 top-2 text-lh-primary cursor-pointer"
              onClick={() => closeModal()}
            >
              <AiOutlineClose size={30} />
            </div>
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
                    <div className="text-lh-dark font-semibold ">
                      {task.estimated_time} Hours
                    </div>
                    <div className="text-lh-primary font-semibold">{`${
                      task.passed_time
                    } Hours ( ${(
                      (task.passed_time * 100) /
                      task.estimated_time
                    ).toFixed(2)} % )`}</div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h3 className="text-lh-primary font-title text-4xl">
                    {task.title}
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
                          <div className="h-10">From</div>
                          <div className="h-10">To</div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex">
                            <input
                              value={hourFrom.hourFrom}
                              onChange={(e) => changehourFrom(e)}
                              className="bg-lh-primary w-10 h-10 mx-2 rounded-lg text-lh-light  text-center  "
                              min={0}
                              max={24}
                              type="number"
                              name="hourFrom"
                              id="hourFrom"
                            />
                            <div className="h-10 flex items-center">:</div>
                            <input
                              value={hourFrom.minFrom}
                              onChange={(e) => changehourFrom(e)}
                              min={0}
                              max={59}
                              className="bg-lh-primary w-10 h-10 mx-2 rounded-lg text-lh-light text-center "
                              type="number"
                              name="minFrom"
                              id="minFrom"
                            />
                          </div>

                          <div className="flex">
                            <input
                              value={hourTo.hourTo}
                              onChange={(e) => changehourTo(e)}
                              min={0}
                              max={24}
                              className="bg-lh-primary w-10 h-10 mx-2 rounded-lg text-lh-light flex items-center text-center "
                              type="number"
                              name="hourTo"
                              id="hourTo"
                            />
                            <div className="h-10 flex items-center">:</div>

                            <input
                              value={hourTo.minTo}
                              onChange={(e) => changehourTo(e)}
                              min={0}
                              max={59}
                              className="bg-lh-primary w-10 h-10 mx-2 rounded-lg text-lh-light text-center "
                              type="number"
                              name="minTo"
                              id="minTo"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 flex items-center justify-start lg:col-span-3">
                      <button
                        className="bg-lh-secondary font-text text-lh-light py-1.5 px-3 flex space-x-2 items-center rounded-lg "
                        onClick={() => addSpentTime()}
                      >
                        <BsHourglassBottom />
                        <div>Add to Spent Time</div>
                      </button>
                    </div>
                  </div>

                  {/* Advancement */}
                  <div className="flex  flex-col lg:grid  lg:grid-cols-5 gap-4">
                    <div className="font_weight_400 font-text text-xl	flex items-center space-x-2 lg:col-span-2">
                      <select
                        value={task.advancement}
                        onChange={(e) => changeEnum(e, "int")}
                        name="advancement"
                        id="advancement"
                        className="bg-lh-light w-1/2 border-2 border-lh-dark rounded-lg px-1.5"
                      >
                        <option value={0}>0%</option>
                        <option value={10}>10%</option>
                        <option value={20}>20%</option>
                        <option value={30}>30%</option>
                        <option value={40}>40%</option>
                        <option value={50}>50%</option>
                        <option value={60}>60%</option>
                        <option value={70}>70%</option>
                        <option value={80}>80%</option>
                        <option value={90}>90%</option>
                        <option value={100}>100%</option>
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
                        onChange={(e) => changeEnum(e, "char")}
                        defaultValue={task.state_id}
                        name="state_id"
                        id="state_id"
                        className="bg-lh-light w-1/2 border-2 border-lh-dark rounded-lg px-1.5"
                      >
                        {!loadingState &&
                          dataState.GetAllState.map((state: State) => (
                            <option value={state.id}>{state.name}</option>
                          ))}
                      </select>
                      <div></div>
                    </div>
                    <div className="space-y-4 flex items-center justify-start lg:col-span-3">
                      <label htmlFor="state_id">Status</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right column */}
            <div className="flex justify-center">
              <div className="space-y-8 py-4 w-4/5">
                <div className="space-y-4">
                  <h3 className="text-lh-primary font-title text-4xl">
                    Comments
                  </h3>
                  <form className="flex flex-col items-end  space-y-4">
                    <textarea
                      placeholder="Write a comment"
                      id="commentarea"
                      name="commentarea"
                      className="rounded-lg border-2 border-lh-gray p-2 text-lh-dark font-text w-full"
                      rows={5}
                      cols={5}
                    />
                    <button className="bg-lh-secondary font-text text-lh-light py-1.5 px-3 flex space-x-2 items-center rounded-lg w-fit">
                      <div>Post</div>
                      <FaPaperPlane />
                    </button>
                  </form>
                </div>
              </div>
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
