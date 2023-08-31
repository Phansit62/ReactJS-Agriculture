import Instance from "../helpers/ConnectAPI.axios";

export async function getOrders(pagesize = 10, currentpage = 1, status = 0,startDate, endDate) {
  try {
    const response = await Instance.get(`Orders/GetOrdersList?pagesize=${pagesize}&currentpage=${currentpage}&status=${status}&startDate=${startDate}&endDate=${endDate}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function changeStatus(id = 0, status = 0) {
  try {
    const response = await Instance.put(`Orders/ChangeStatus?id=${id}&status=${status}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}