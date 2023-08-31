import Instance from "../helpers/ConnectAPI.axios";

export async function getCouponList(pagesize = 10, currentpage = 1, search) {
  try {
    const response = await Instance.get(`Coupon/GetCouponList?pagesize=${pagesize}&currentpage=${currentpage}&search=${search}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getCouponDetail(id) {
  try {
    const response = await Instance.get(`Coupon/GetCouponDetail/${id}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function createCoupon(data) {
  try {
    const response = await Instance.post(`Coupon/Create`,data);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function updateCoupon(data) {
  try {
    const response = await Instance.post(`Coupon/Update`,data);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function deleteCoupon(id) {
  try {
    const response = await Instance.delete(`Coupon/Delete/${id}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}