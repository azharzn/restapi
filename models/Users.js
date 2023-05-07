module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        "Users",
        {
            id : {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                required: true
            },
            email: {
                type: DataTypes.STRING,
                required: true
            },
            password: {
                type: DataTypes.STRING,
                required: true
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt : {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            tableName:"Users",
        }
    );
    return Users;
};