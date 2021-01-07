import axios from "axios";

export const getUsers = async () => {
  const url = "https://jsonplaceholder.typicode.com/users";
  const response = await axios.get(url);
  return response.data;
};
