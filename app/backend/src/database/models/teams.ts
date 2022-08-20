import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  id!: number;
  teamName!: string;
}

Teams.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  modelName: 'teams',
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default Teams;
