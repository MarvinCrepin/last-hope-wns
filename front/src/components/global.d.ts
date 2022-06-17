export type Project = {
  product_owner: any;
  id: string;
  title: string;
  description: string;
  start_at: Date;
  end_at: Date;
  due_at: Date;
  product_owner_id: number;
  advancement: number;
  __typename: string;
  participants: User[Participant];
  children: JSX.Element | JSX.Element[];
};

export interface Participant {
  user: UserParticipant;
}

export interface UserParticipant {
  id: string;
  firstname: string;
  lastname: string;
  roles: string;
}

export type User = {
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

export type TaskInList = {
  id: string;
  title: string;
  advancement: number;
  due_at: Date;
  project_name: string;
  passed_time: number;
  assignee: string;
  assignee_id: string;
  estimated_time: number;
  description: string | null;
  state_id: string;
  state: State;
};

export interface State {
  id: string;
  name: String;
}

export type RowElement = any;
