import express from 'express'
import bodyParser from "body-parser";
import {UserModel} from "./database/models/User";

const user = new UserModel();

const server = async () => {
    const app = express()

    app.use(bodyParser);
    app.set('json spaces', 2)

    app.post("/auth/login", async (req, res) => {
        const email =  req.body.username;
        const password = req.body.password;

        if (email && password) {
            const started = await user.startSession({
                username: email,
                password: password
            })
            if (started == null) return res.json({
                status: "Login failed"
            })
            if (started) {
                res.json({
                    status: "logged ins"
                })
            }
        } else {
            res.json({
                status: "Email or password not set"
            })
        }
    })

    app.post("/auth/register", (req, res) => {
        const email = req.body.username;
        const password = req.body.password;

        if (email && password) {
            const created = user.create({
                email: email,
                password: password
            })
            if (created == null) return res.json({
                status: "Failed to register"
            })
            if (created) {
                res.json({
                    status: "User registered"
                })
            }
        } else {
            res.json({
                status: "Email or password not set"
            })
        }
    })

    app.listen(1337, () => {
        console.log("Server listening for requests")
    })
}

(async() => {
    await server();
})()