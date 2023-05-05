import {Router} from "express";
import {UserModel} from "../../database/models/User";

const userRoutes = Router();
const user: UserModel = new UserModel();

userRoutes.post("/login", async (req, res) => {
    const email =  req.body.email;
    const password = req.body.password;

    if (email && password) {
        const data = await user.resolveUser({
            email
        });
        const started = await user.startSession({
            email: email,
            password: password
        })
        if (started == null) return res.json({
            status: "Login failed"
        })
        if (started) {
            return res.json({
                status: "Logged in",
                user: {
                    id: data.dataValues.sessionId,
                    authenticated: true
                }
            })
        }
        return res.json({
            status: "Email or password not set"
        })
    }
})

userRoutes.post("/register", async (req, res) => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    if (email && password) {
        const created = await user.create({
            email: email,
            password: password,
        })
        if (created == null) return res.json({
            status: "Failed to register"
        })
        if (created) {
           return res.json({
                status: "User registered"
            })
        }
        return res.json({
            status: "Email or password not set"
        })
    }
})

export default userRoutes;