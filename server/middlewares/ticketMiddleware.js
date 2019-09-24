import models from '../models';

const resolvers = {
  Query: {
    seat: (root, args, context, info) => {
      console.log(`3. resolver: hello`)
      return `Hello ${args.name ? args.name : 'world'}!`
    }
  },
}

const ticketInput = async (resolve, root, args, context, info) => {
  const { input: { phone, ticketsCout } } = args;

  const tickets = await models.Ticket.create({
    phone,
    seatCodes: "AA1"
  });
  const res = {
    ticket: {
      phone,
      seatCodes: "AA1"
    }
  }
  console.log(`1. logInput: ${JSON.stringify(args)}`)
  const result = await resolve(root, res, context, info)
  console.log(`5. logInput`)
  return res
}

export const ticketMiddleware = {
  Query: {
    ticket: ticketInput
  },
  Mutation: {
    buyTickets: ticketInput
  }
}
