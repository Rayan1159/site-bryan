import {default as express} from 'express'
import * as bodyParser from "body-parser";
import {UserModel} from "./database/models/User";
//import cors
import cors from "cors";
import {NewsModel} from "./database/models/News";

const server = async () => {
    const app= express();
    const user: UserModel = new UserModel();
    const news: NewsModel = new NewsModel();

    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(cors())
    app.set('json spaces', 2)

    app.post("/auth/login", async (req, res) => {
        const email =  req.body.email;
        const password = req.body.password;

        if (email && password) {
            const data = await user.resolveUser({ email });
            const started = await user.startSession({
                email: email,
                password: password
            })
            if (started == null) return res.json({
                status: "Login failed"
            })
            if (started) {
                res.json({
                    status: "Logged in",
                    user: {
                        id: data.dataValues.sessionId,
                        authenticated: true
                    }
                })}
        } else {
            res.json({
                status: "Email or password not set"
            })
        }
    })

    app.post("/general/news/create", async (req, res) => {
        const title: string = req.body.title;
        const content: string = req.body.content;
        const sessionId: string = req.body.sessionId;
        const author: string = await user.getUsername({
            sessionId: sessionId
        })

        if (title && content && author) {
            const created = await news.create({
                title: title,
                content: content,
                author: author,
            })
            if (created == null) return res.json({
                status: "Failed to create news"
            })
            return res.json({
                status: "News created"
            })
        }
    })

    app.post("/services/user", async (req, res, next) => {
        const task: string = req.body.task;
        const sessionId: string = req.body.sessionId;

        if (task == "resolveName") {
            const data: string = await user.getUsername({
                sessionId: sessionId
            })
            if (data == null) return res.json({
                status: "Failed to resolve username"
            });
            res.json({
                status: "Username resolved",
                username: data
            });
        }

    })

    app.post("/auth/register", async (req, res) => {
        const email: string = req.body.email;
        const password: string = req.body.password;

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