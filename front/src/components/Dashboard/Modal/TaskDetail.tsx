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

        <div className="p-8 inline-block align-bottom text-left transform transition-all  sm:align-middle  sm:w-full">
          <div className=" bg-white  rounded-lg  flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <div className=" relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all   sm:w-full ">
              test
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
