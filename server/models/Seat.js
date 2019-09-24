import Sequelize, { Model } from 'sequelize';

class Seat extends Model {
  static tableName = 'seats';

  // static associate(models) {
  //   User.Pets = User.hasMany(models.Pet, {
  //     foreignKey: 'ownerId',
  //   });
  // }
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
