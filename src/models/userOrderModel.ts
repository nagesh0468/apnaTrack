import { DataTypes, Sequelize, Model } from "sequelize";
import type { Optional } from "sequelize";
export type orderAttributes = {
  id: number;
  amount: number;
  addressId: number;
  status: string;
  date: number;
};
export type orderCreationAttributes = Optional<orderAttributes, "id">;
const createOrderModel = (sequelize:Sequelize)=>{
  const Order = sequelize.define<Model<orderAttributes, orderCreationAttributes>>("Order",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
     
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      addressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Order Placed",
      },
      date: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
  },
  {tableName:"Order"}
);
return Order;

};
export default createOrderModel;