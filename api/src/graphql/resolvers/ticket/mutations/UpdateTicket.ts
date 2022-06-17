export default async (
  _: any,
  { ticketId, data }: { ticketId: string; data: TicketInputPatch },
  context: Context
) => {
  const oldData = await context.prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  for (const property in data) {
    if (property === "due_at") {
      data[property] = new Date(data[property]);
    }
  }

  const newData = { ...oldData, ...data };

  return await context.prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: newData,
  });
};
