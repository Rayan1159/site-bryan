import {Router} from "express";
import {UserModel} from "../../database/models/User";

const serviceRoutes: Router = Router();
const user: UserModel = new UserModel();

serviceRoutes.post("/services/user", async (req, res, next) => {
    const task: string = req.body.task;
    const sessionId: string = req.body.sessionId;

    if (task == "resolveName") {

        const data: string = await user.getUsername({
            sessionId: sessionId
        })
        if (data == null) return res.json({
            status: "Failed to resolve username"
        });
        return res.json({
            status: "Username resolved",
            username: data
        });
    }

    if (task == "getRole") {
        const role: string = await user.getRole({
            sessionId: sessionId
        })
        if (role == null) return res.json({
            status: "Failed to get role"
        });
        return res.json({
            status: "Role resolved",
            role: role
        });
    }

})

export default serviceRoutes;