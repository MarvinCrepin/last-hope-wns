export interface TicketDurationUserInput {
  ticket_id: string;
  minute_passed: number;
}

export interface TicketDurationUser {
  id: ID;
  user: User;
  user_id: ID;
  ticket: Ticket;
  ticket_id: ID;
  created_at: DateTime;
  minute_passed: Int;
}

export type DataStat = {
  label: string[];
  data: number[];
  user: User;
};

export type UserStat = {
  id: string;
  lastname: string;
  firstname: string;
  mail: string;
};
