import {default as express} from 'express'
import * as bodyParser from "body-parser";
import {UserModel} from "./database/models/User";
import serviceRoutes from "./routes/services/services";
import generalRoutes from "./routes/general/general";
import userRoutes from "./routes/user/user";
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
    app.use("/auth", userRoutes);
    app.use("/services", serviceRoutes)
    app.use("/general", generalRoutes)

    app.listen(1337, () => {
        console.log("Server listening for requests")
    })

}

(async(): Promise<void> => {
    await server();
})()