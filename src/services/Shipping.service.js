import Instance from "../helpers/ConnectAPI.axios";

export async function createShipping(data) {
  try {
    const response = await Instance.post(`Shipping/Create`, data);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}
