import Instance from "../helpers/ConnectAPI.axios";

export async function dashboardMobile(type, year) {
  try {
    const response = await Instance.get(`Reports/DashboardMobile?type=${type}&year=${year}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function reportOrders(status, startDate, endDate) {
  try {
    const response = await Instance.get(`Reports/ReportOrders?status=${status}&startDate=${startDate}&endDate=${endDate}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}
