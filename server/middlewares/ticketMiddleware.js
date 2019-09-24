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
  const { resSeatCodes, dbEffects } = getRandomSeat(allRemainingSeatsMap, ticketsCout);
  const resSeatCodesStr = resSeatCodes.join(',');

  await models.Ticket.findOrCreate({
    where: {
      phone
    },
    defaults: { phone, seatCodes: resSeatCodesStr }
  });

  for (var i = 0; i < dbEffects.length; i++) {
    let item = dbEffects[i];
    switch (item.tag) {
      case 'del':
        await models.Seat.destroy(
          {where: { seatLen: item.seatLen }}
        );
        break;
      case 'update':
        await models.Seat.upsert(
          { seatLen: item.seatLen, seatCodes: item.seatCodes },
          {fields: ['seatLen', 'seatCodes']}
        );
        // await models.Seat.upsert(
        //   { seatCodes: item.seatCodes },
        //   {where: { seatLen: item.seatLen }}
        // );
        break;
      case 'create':
        await models.Seat.create(
          { seatLen: item.seatLen, seatCodes: item.seatCodes}
        );
        break;
      default:
        break;
    }
  }

  // const tickets = await models.Ticket.create({
  //   phone,
  //   seatCodes: "AA1"
  // });
  const res = {
    ticket: {
      phone,
      seatCodes: resSeatCodes.join(',')
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
