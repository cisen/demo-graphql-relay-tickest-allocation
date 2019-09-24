import models from '../models';
import { formatSeatsToSeatsMap, getRandomSeat } from '../utils/ticketAllocateAlogrithm';

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

  const allRemainingSeats = await models.Seat.findAll();
  const allRemainingSeatsMap = formatSeatsToSeatsMap(allRemainingSeats);
  const allocateSeats = getRandomSeat(allRemainingSeatsMap, ticketsCout)

  // const tickets = await models.Ticket.create({
  //   phone,
  //   seatCodes: "AA1"
  // });
  const res = {
    ticket: {
      phone,
      seatCodes: allocateSeats.resSeatCodes.join(',')
    }
  }
  console.log(`1. logInput: ${JSON.stringify(args)}`)
  const result = await resolve(root, res, context, info)
  console.log(`5. logInput`)
  return res
}

export const ticketMiddleware = {
  Mutation: {
    buyTickets: ticketInput
  }
}
