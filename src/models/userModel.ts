import { DataTypes, Sequelize, Model } from "sequelize";
import type { Optional } from "sequelize";

export type UserData = {
    id: string;
    emailId: string;
    passwordKey: string;
};

// For creation, id is optional
 export type UserCreationAttributes = Optional<UserData, "id">;

const createUserModel = (sequelize: Sequelize) => {
    const User = sequelize.define<Model<UserData, UserCreationAttributes>>("User", {
        id: {
            type: DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true,
        },
        emailId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true },
        },
        passwordKey: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
{tableName:"users"});

    return User;
};

export default createUserModel;