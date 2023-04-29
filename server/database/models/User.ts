import {User, UserIn} from "../classes/User";
import {hash, verify} from "argon2";

export class UserModel extends User {

    public async startSession(payload: Partial<UserIn>): Promise<boolean | null> {
        if (await this.exists(payload)) {
            return await verify(payload.password as string, await this.getPassword(payload) as string);
        }
        return null
    }

    public async getPassword(payload: Partial<UserIn>): Promise<string | null | undefined> {
        if (await this.exists(payload)) {
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            if (user == null) return null;
            return user.dataValues.password;
        }
        return null;
    }

    public async create(payload: Partial<UserIn>): Promise<boolean | null> {
        if (await this.exists(payload)) {
            const created = User.create({
                email: payload.email,
                password: await hash(payload.password as string)
            })
            return !!created;
        }
        return null
    }

    public async exists(payload: Partial<UserIn>): Promise<boolean> {
        const found = await User.findOne({
            where: {
                email: payload.email
            }
        })
        return !!found;
    }
}