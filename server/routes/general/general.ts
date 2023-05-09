import {Router} from "express";
import {NewsModel} from "../../database/models/News";
import {UserModel} from "../../database/models/User";

const general: NewsModel = new NewsModel();
const user: UserModel = new UserModel();
const generalRoutes = Router();

generalRoutes.post("/general/news/create", async (req, res) => {
    const title: string = req.body.title;
    const content: string = req.body.content;
    const sessionId: string = req.body.sessionId;
    const author: string = await user.getUsername({
        sessionId: sessionId
    })

    if (title && content && author) {
        const created = await general.create({
            title: title,
            content: content,
            author: author,
        })
        if (created == null) return res.json({
            status: "Failed to create general"
        })
        return res.json({
            status: "News created"
        })
    }
})

export default generalRoutes;