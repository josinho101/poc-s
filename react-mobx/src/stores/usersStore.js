import * as userService from "../services/userdataservice";
import { toJS } from "mobx";

export const createUsersStore = () => {
  return {
    users: [],
    async getUsers() {
      // const users = await userService.getUsers();
      this.users = [{ id: 1, name: "test user" }];
      console.log(toJS(this.users));
    },
  };
};
