import Instance from "../helpers/ConnectAPI.axios";

export async function getUsers(pagesize = 10, currentpage = 1, search) {
  try {
    const response = await Instance.get(`Users/GetUsers?pagesize=${pagesize}&currentpage=${currentpage}&search=${search}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}
