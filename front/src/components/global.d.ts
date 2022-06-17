import { StoreReaderConfig } from "@apollo/client/cache/inmemory/readFromStore";

type Project = {
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
  children: JSX.Element|JSX.Element[];
};

interface Participant {
  user: UserParticipant;
}

interface UserParticipant {
  id: string;
  firstname: string;
  lastname: string;
  roles: string;
}

type User = {
  id: string;
  firstname: string;
  lastname: string;
  role: string;
  mail: string;
}

interface Column {
  id: string;
  label: string;
  style: string;
  metadata?: any;
}

type TaskInList = {
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

interface State {
  id: string;
  name: String;
}

type RowElement = any;
