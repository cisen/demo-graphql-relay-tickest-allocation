import Sequelize, { Model } from 'sequelize';

class Ticket extends Model {
  static tableName = 'tickets';

  // static associate(models) {
  //   User.Pets = User.hasMany(models.Pet, {
  //     foreignKey: 'ownerId',
  //   });
  // }
}

const schema = {
  phone: { type: Sequelize.STRING, unique: true},
  seatCodes: { type: Sequelize.STRING, unique: true},
};

export default (sequelize) => {
  Ticket.init(schema, {
    sequelize,
    tableName: Ticket.tableName,
  });

  return Ticket;
};
