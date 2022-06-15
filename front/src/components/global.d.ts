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
};

interface Participant {
  user: UserParticipant;
}

interface UserParticipant {
  id: string;
  firstname: string;
  lastname: string;
}

interface Column {
  id: string;
  label: string;
  style: string;
  metadata?: any;
}

type TaskInList = {
  id: string;
  subject: string;
  advancement: number;
  due_at: Date;
  project_name: string;
  assignee: string;
  assignee_id: string;
  description: string | null;
};

type RowElement = any;
