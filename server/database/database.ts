import {Sequelize} from "sequelize";

export const sequelize = new Sequelize("az", 'root', '', {
    host: 'localhost',
    dialect: "mysql"
})

sequelize.authenticate().then(() => {
    console.log("User 'root' has been authenticated for the database")
}).catch(err => {
    console.error(err)
})