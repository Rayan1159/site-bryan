import {default as express} from 'express'
import * as bodyParser from "body-parser";
import {UserModel} from "./database/models/User";
//import cors
import cors from "cors";

const server = async () => {
    const app= express();
    const user: UserModel = new UserModel();

    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(cors())
    app.set('json spaces', 2)

    app.post("/auth/login", async (req, res) => {
        console.log("hit")
        const email =  req.body.email;
        const password = req.body.password;

        if (email && password) {
            const started = await user.startSession({
                email: email,
                password: password
            })
            console.log(started);
            if (started == null) return res.json({
                status: "Login failed"
            })
            if (started) {
                res.json({
                    status: "Logged in"
                })
            }
        } else {
            res.json({
                status: "Email or password not set"
            })
        }
    })

    app.post("/auth/register", async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        if (email && password) {
            const created = await user.create({
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

(async(): Promise<void> => {
    await server();
})()