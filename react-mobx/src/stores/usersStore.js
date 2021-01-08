import { toJS } from "mobx";
import * as userService from "../services/userdataservice";

export const createUsersStore = () => {
  return {
    users: [],
    async getUsers() {
      const users = await userService.getUsers();
      this.setUsers(users);
      console.log(toJS(this.users));
    },
    setUsers(users) {
      this.users = users;
    },
  };
};
