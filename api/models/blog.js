const { DataTypes, Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const { sequelize } = require("../database/database");

class Blog extends Model { }

Blog.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: () => uuidv4().toString(),
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        references: {
            model: "users",
            key: "id",
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Blog',
    tableName: "blogs",
    indexes: [
        {
            fields: ["id"],
        },
        {
            fields: ["user_id"],
        }
    ],
});

(async () => {
    try {
        await Blog.sync({ alter: true });
        console.log("The table for the Blog model was just (re)created!");
    } catch (error) {
        console.error("Unable to synchronize models:", error);
    }
})();

// `sequelize.define` also returns the model
console.log(Blog === sequelize.models.Blog); // true

module.exports = Blog;