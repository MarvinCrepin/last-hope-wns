// interface userInputRegister {
//   lastname: string;
//   firstname: string;
//   mail: string;
//   roles: string;
//   password: string;
// }

interface TicketInputPatch {
  title: ?String;
  estimated_time: ?Int;
  due_at: ?DateTime;
  passed_time: ?Int;
  advancement: ?Int;
  state_id: ?String;
  description: ?String;
}
