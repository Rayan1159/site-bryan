import {User, UserIn} from "../classes/User";
import {hash, verify} from "argon2";

export class UserModel extends User {

    public async startSession(payload: Partial<UserIn>): Promise<boolean | null> {
        if (await this.exists(payload)) {
            const password = await this.getPassword(payload);
        }
        return null
    }

    public async generateStaticSessionId(length: number): Promise<string> {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    public async updateRank(payload: Partial<UserIn>): Promise<boolean | string> {
        if (await this.exists(payload)) {
            const updated = await User.update({
                rank: payload.rank,
                rTitle: payload.rTitle
            }, {
                where: {
                    sessionId: payload.sessionId
                }
            })
            return !!updated;
        }
        return false;
    }

    public async getPassword(payload: Partial<UserIn>): Promise<string | null | undefined> {
        if (await this.exists(payload)) {
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            return user.dataValues.password;
        }
        return null;
    }

    public async create(payload: Partial<UserIn>): Promise<boolean | null | string> {
        const emailRegex: RegExp = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
        if (!emailRegex.test(payload.email as string)) return "Invalid email format";

        if (!(await this.exists(payload))) {
            const created = User.create({
                email: payload.email,
                password: await hash(payload.password as string),
                sessionId: await this.generateStaticSessionId(35)
            })
            return !!created;
        }
        return null
    }

    public async exists(payload: Partial<UserIn>): Promise<boolean | string> {
        const found = await User.findOne({
            where: {
                email: payload.email
            }
        })
        return !!found;
    }

    public async resolveUser(payload: Partial<UserIn>): Promise<User> {
        return await User.findOne({
            where: {
                sessionId: payload.sessionId
            }
        })
    }

    public async getUsername(payload: Partial<UserIn>): Promise<string | null> {
        const resolvedUser = await this.resolveUser(payload);
        const data = await User.findOne({
            where: {
                email: resolvedUser.dataValues.email
            }
        })
        if (data == null) return;
        return data.dataValues.username;
    }
}