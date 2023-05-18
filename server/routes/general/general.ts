import {Router} from "express";
import {NewsModel} from "../../database/models/News";
import {UserModel} from "../../database/models/User";

const news: NewsModel = new NewsModel();
const user: UserModel = new UserModel();
const generalRoutes = Router();

generalRoutes.post("news/create", async (req, res) => {
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
            status: "Failed to create general"
        })
        return res.json({
            status: "News created"
        })
    }
})

generalRoutes.post("/news", async (req, res) => {
    const task = req.body.task;
    const data: any[] = await news.getNews();

    if (task == "getNews") {
        if (data == null) return res.json({
            status: "Failed to get news"
        })
        return res.json({
            status: "News retrieved",
            news: data
        })
    }
    return;
});

export default generalRoutes;