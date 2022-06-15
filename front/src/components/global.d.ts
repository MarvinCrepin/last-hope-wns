import { StoreReaderConfig } from "@apollo/client/cache/inmemory/readFromStore";

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
  subject: string;
  advancement: number;
  due_at: Date;
  project_name: string;
  assignee: string;
  assignee_id: string;
  description: string | null;
};

type RowElement = any;
