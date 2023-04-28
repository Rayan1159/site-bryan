"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize("az", 'root', null, {
    host: 'localhost',
    dialect: "mysql"
});
exports.sequelize.authenticate().then(function () {
    console.log("User 'root' has been authenticated for the database");
}).catch(function (err) {
    console.error("Failed to connect to the database");
});
