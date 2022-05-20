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
