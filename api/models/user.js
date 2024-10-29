const { DataTypes, Model } = require("sequelize");
const { v4: uuidv4, stringify } = require("uuid");

const { sequelize } = require("../database/database");

class User extends Model {
    static getFullName() {
        return [this.first_name, this.last_name].join(" ");
    }
}

User.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: () => uuidv4().toString(),
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "User",
    tableName: "users",
    indexes: [
        {
            fields: ["id"],
        },
        {
            fields: ["email"],
        }
    ],
});


(async () => {
    try {
        await User.sync({ alter: true });
        console.log("The table for the User model was just (re)created!");
    } catch (error) {
        console.error("Unable to synchronize models:", error);
    }
})();



// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = User;