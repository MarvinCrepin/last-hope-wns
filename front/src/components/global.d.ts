type Project = {
  id: string;
  title: string;
  description: string;
  start_at: Date;
  end_at: Date;
  due_at: Date;
  product_owner_id: number;
  advancement: number;
  __typename: string;
};

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
};

type RowElement = any;
