// interface userInputRegister {
//   lastname: string;
//   firstname: string;
//   mail: string;
//   roles: string;
//   password: string;
// }

import { TicketUser } from "@prisma/client";

interface TicketInputPatch {
  title: ?String;
  estimated_time: ?Int;
  due_at: ?DateTime;
  advancement: ?Int;
  state_id: ?String;
  description: ?String;
}

interface AddTicketInput {
  title: string;
  project_id: string;
  estimated_time: ?int;
  due_at: ?DateTime;
  description: ?string;
  state_id: string;
  ticketUser:[TicketUser];
}
