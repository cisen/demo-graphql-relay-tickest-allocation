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

async function start() {
  // 每次启动清空数据
  await models.Seat.drop();
  await models.Ticket.drop();
  // 每次启动确认数据库表已同步
  await models.sequelize.sync({ force: true });

  let defaultSeatsMap = buildDefaultSeats();
  await models.Seat.bulkCreate(defaultSeatsMap);

  server.start(serverOpt, ({ port }) => {
    console.log('Server is running on localhost:' + port);
  });
}

start();
