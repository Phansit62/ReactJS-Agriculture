import axios from "axios";

export const baseURL = "http://10.103.0.30/cs62/s11/Project_RN_WEB/";

export default axios.create({
  baseURL: baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": ["application/json;multipart/form-data;"],
  },
});
