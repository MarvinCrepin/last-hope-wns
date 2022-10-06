import { type } from "os";

// export type Project = {
//   product_owner: product_owner_in_project;
//   id: string;
//   title: string;
//   description: string;
//   start_at: Date;
//   end_at: Date;
//   due_at: Date;
//   advancement: number;
//   __typename: string;
//   participants: User[Participant];
//   children: JSX.Element | JSX.Element[];
// };

export type product_owner_in_project = {
  id: string;
  firstname: string;
  lastname: string;
};

export interface Participant {
  user: UserParticipant;
}

export interface UserParticipant {
  id: string;
  firstname: string;
  lastname: string;
  roles: string;
  tickerUserId: string;
}

export type User = {
  __typename?: "User";
  id: string;
  firstname: string;
  lastname: string;
  role: string;
  mail: string;
};

export interface Column {
  id: string;
  label: string;
  style: string;
  metadata?: any;
}

export type ProjectInTask = {
  id: string;
  title: string;
};

export type TaskInList = {
  id: string;
  title: string;
  advancement: number;
  due_at: Date;
  participants: UserParticipant[];
  project_name: string;
  estimated_time: number;
  description: string | null;
  state_id: string;
  state: State;
  project: ProjectInTask;
  isArchived: boolean;
};

export interface State {
  id: string;
  name: String;
}
