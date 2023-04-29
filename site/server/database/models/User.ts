import {User, UserIn} from "../classes/User";
import {verify} from "argon2";

export class UserModel extends User {

  public async login(payload: Partial<UserIn>): Promise<boolean> {
    if (await this.exists(payload)){
      const password = await this.getPassword(payload);
      return await verify(payload.password as string, payload.password as string);
    } else {
      return false;
    }
  }

  public async register(payload: Partial<UserIn>): Promise<boolean> {
    if (!(await this.getPassword(payload))) {
      const user = await User.create(payload);
      return !!user;
    } else {
      return false;
    }
  }

  public async updateRank(payload: Partial<UserIn>): Promise<boolean> {
    if (await this.exists(payload)) {
      const updated = await User.update({
        rank: payload.rank
      }, {
        where: {
          username: payload.username
        }
      })

      if (updated) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public async exists(payload: Partial<UserIn>): Promise<boolean> {
    const user = await User.findOne({
      where: {
        username: payload.username
      }
    })
    return !!user;
  }

  public async getPassword(payload: Partial<UserIn>): Promise<string | undefined> {
    const user = await User.findOne({
      where: {
        username: payload.username
      }
    })

    if (!user) return;
    return user.password as string;
  }
}
