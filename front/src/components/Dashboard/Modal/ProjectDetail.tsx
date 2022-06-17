import { FaCalendarDay, FaCalendarCheck } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import Moment from "react-moment";
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import "../../../assets/css/projectDetail.css";
Chart.register(...registerables);

const projectStats = {
  labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi','Vendredi', 'Samedi'],
  datasets: [{
    label: 'Project Statistics (tasks/day)',
    data: [4, 1, 3, 3, 6, 2],
    fill: false,
    borderColor: 'rgb(214 96 96)',
    backgroundColor: 'rgb(214 96 96)',
    pointRadius: 5,
    pointHoverRadius: 10,
    pointHitRadius: 30,
    pointBorderWidth: 2,  
  }]
};

const memberStats = {
  labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi','Vendredi', 'Samedi'],
  datasets: [{
    label: 'Project Statistics (hours/day)',
    data: [3, 5, 5, 4, 7, 1, 0],
    fill: false,
    borderColor: 'rgb(214 96 96)',
    backgroundColor: 'rgb(214 96 96)',
    pointRadius: 5,
    pointHoverRadius: 10,
    pointHitRadius: 30,
    pointBorderWidth: 2,  
  }]
};

const options: any = {
  maintaintAspectRatio: false,
};


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

        <div className="inline-block align-bottom text-left transform transition-all sm:align-middle project-modal">
          <div className=" bg-white  rounded-lg  flex justify-center min-h-full p-4 text-center sm:p-0">
            <div className=" relative bg-white rounded-lg text-left overflow-hidden transform transition-all project-modal-inside">
              <div className="project-modal-infos py-8 px-2 sm:pl-6 sm:pr-10">
                <div>
                  <h2 className="text-4xl font-title text-lh-primary ">{"{ " + project.title + " }"}</h2>
                  <p className="text-gray-700 pt-4 pb-6 text-xl">
                    {(project.description) === "null" ? "No description defined" : project.description}
                  </p>
                </div>
                <div>
                  <h2 className="text-4xl font-title text-lh-primary ">Project Owner</h2>
                  <div className="pt-4 pb-6 flex items-center">
                    <MdOutlineAccountCircle size={30} /><p className="text-gray-700 font-title pl-3 text-xl">{(project.product_owner) ? project.product_owner.firstname + ' ' + project.product_owner.lastname : 'No project manager defined'}</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-4xl font-title text-lh-primary ">Members</h2>
                  <ul className="list-disc list-inside pt-4 pb-6 flex flex-wrap">
                    {(project.participants).length === 0 ? <p>No members defined</p> :
                    
                    project.participants.map((participant: Participant) => (
                      <li key={participant.user.id} className="flex items-center py-2 pr-4">
                        <MdOutlineAccountCircle size={30} /><p className="text-gray-700 font-title pl-3 text-xl">{participant.user.firstname} {participant.user.lastname} - <span className="text-lh-light-gray">{participant.user.roles}</span></p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-4xl font-title text-lh-primary ">Infos</h2>
                    <div className="pt-4 pb-6">
                      <p className="text-gray-700 font-title text-xl flex"><FaCalendarDay /><span className="pl-3">Start date: <Moment format="MM/DD/YYYY">{(project.start_at) ? project.start_at.toString() : 'Not Defined'}</Moment></span></p> 
                      <p className="text-gray-700 font-title text-xl flex pt-3"><FaCalendarCheck /><span className="pl-3">End day: <Moment format="MM/DD/YYYY">{(project.end_at) ? project.end_at.toString() : 'Not Defined'}</Moment></span></p>
                    </div>
                </div>
              </div>
              <hr />
              <div className="project-modal-stats py-8 px-2 sm:pl-6 sm:pr-10">
                <div className="project-modal-pstats pb-10">
                  <h2 className="text-4xl font-title text-lh-primary ">Project Statistics</h2>
                  <div>
                    <Line data={projectStats} options={options}/>
                  </div>
                </div>
                <div className="project-modal-mstats">
                  <h2 className="text-4xl font-title text-lh-primary ">Member Statistics</h2>
                  <div>
                    <Line data={memberStats} options={options}/>
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

export default ProjectDetail;