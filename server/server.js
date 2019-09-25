import { GraphQLServer } from 'graphql-yoga';
import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize';
import { resolver } from 'graphql-sequelize';
import { ticketMiddleware } from './middlewares/ticketMiddleware';
import models from './models';

const typeDefs = `
type Query {
  seat(id: ID!): Seat
  seats: [Seat]
  ticket(phone: Int): Ticket
  tickets: [Ticket]
}

type Seat {
  id: ID!
  seatLen: Int
  seatCodes: String
}

type Ticket {
  id: ID
  phone: String
  seatCodes: String
}

input BuyTicketsInfo {
  phone: String
  ticketsCout: Int
}

type BuyTicketsPayload {
  ticket: Ticket
}

type Mutation {
  buyTickets(input: BuyTicketsInfo!): BuyTicketsPayload
}


`;

const resolvers = {
  Query: {
    seat: resolver(models.Seat),
    seats: resolver(models.Seat),
    ticket: resolver(models.Ticket),
    tickets: resolver(models.Ticket),
  },
  Mutation: {
    buyTickets: () => ({}),
  },
};

// Tell `graphql-sequelize` where to find the DataLoader context in the
// global request context
resolver.contextToOptions = { [EXPECTED_OPTIONS_KEY]: EXPECTED_OPTIONS_KEY };

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  middlewares: [ticketMiddleware],
  context(req) {
    const dataloaderContext = createContext(models.sequelize);

    return {
      [EXPECTED_OPTIONS_KEY]: dataloaderContext,
    };
  },
});

export default server;
