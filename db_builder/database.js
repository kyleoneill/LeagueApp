const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'champions.sqlite'
})

const Model = Sequelize.Model;

class Build extends Model{}
Build.init({
    champion: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    items: {
        type: Sequelize.STRING,
        allowNull: false
    },
    runePrimary: {
        type: Sequelize.STRING,
        allowNull: false
    },
    runeSecondary: {
        type: Sequelize.STRING,
        allowNull: false
    },
    runeTertiary: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'build'
})

class Counter extends Model{}
Counter.init({
    champion: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    strongAgainst: {
        type: Sequelize.STRING,
        allowNull: false
    },
    weakAgainst: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'counter'
})

sequelize.sync().then(() => {
    console.log("Database and tables ready");
})
module.exports = {
    Build,
    Counter
}