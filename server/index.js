import server from './server';
import models from './models';
import { buildDefaultSeats } from './utils/buildDefaultSeats';

const serverOpt = {
  cors: {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  },
  port: 4000,
}

/**
 * DISCLAIMER: using sequelize#sync is not recommended for production use. Please, please
 * use migrations. This method of creating a database is used in this demo for simplicity's sake.
 */
async function start() {
  // Make sure the database tables are up to date
  await models.sequelize.sync({ force: true });

  // Create sample data
  // const foo = await models.User.create({ name: 'Foo' });
  // const bar = await models.User.create({ name: 'Bar' });
  // await foo.createPet({ name: 'Bat' });
  // await bar.createPet({ name: 'Baz' });
  // await seat.createSeat({ seatLen:  51 });

  let defaultSeatsMap = buildDefaultSeats();
  const seats = await models.Seat.bulkCreate(defaultSeatsMap);
  console.log(defaultSeatsMap)

  // Start the GraphQL server
  server.start(serverOpt, ({ port }) => {
    console.log('Server is running on localhost:' + port);
  });
}

start();
