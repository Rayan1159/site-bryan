import {Sequelize} from "sequelize";

export const sequelize = new Sequelize("az", 'root', null, {
    host: 'localhost',
    dialect: "mysql"
})

sequelize.authenticate().then(() => {
    console.log("User 'root' has been authenticated for the database")
}).catch(err => {
    console.error("Failed to connect to the database")
})