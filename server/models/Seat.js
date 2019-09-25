import Sequelize, { Model } from 'sequelize';

class Seat extends Model {
  static tableName = 'seats';

}

const schema = {
  seatLen: { type: Sequelize.BOOLEAN, unique: true},
  seatCodes: Sequelize.STRING
};

export default (sequelize) => {
  Seat.init(schema, {
    sequelize,
    tableName: Seat.tableName,
  });

  return Seat;
};
