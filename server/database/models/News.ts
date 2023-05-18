import {NewsInput, NewsOutput, News} from "../classes/News";

export class NewsModel extends News {

    public async create(payload: Partial<NewsInput>): Promise<boolean | null> {
        if (!await this.exists(payload)){
            const created = News.create(payload);
            if (created == null) return;
            return true;
        }
    }

    public async exists(payload: Partial<NewsInput>): Promise<boolean | null> {
        const data = await News.findOne({
            where: payload
        })
        if (data == null) return;
        return true;
    }

    public async delete(payload: Partial<NewsInput>): Promise<boolean> {
        if (await this.exists(payload)) {
            await News.destroy({
                where: payload
            })
            return true;
        }
        return false;
    }

    public async getNews(): Promise<any[]> {
        const data = await News.findAll();
        return data.map((news) => {
            return news.toJSON();
        });
    }

}