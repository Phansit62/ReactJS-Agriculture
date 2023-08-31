import Instance from "../helpers/ConnectAPI.axios";

export async function getNews(pagesize = 10, currentpage = 1, search) {
  try {
    const response = await Instance.get(`News/GetNews?pagesize=${pagesize}&currentpage=${currentpage}&search=${search}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getNewsDetail(id) {
  try {
    const response = await Instance.get(`News/GetNewsDetail/${id}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function createNews(value) {
  try {
    let formData = new FormData();
    formData.append("Title", value.title);
    formData.append("Description", value.description);
    if (value.upload.length > 0) {
      formData.append(`Upload`, value.upload[0]);
    }
    const response = await Instance.post(`News/Create`, formData);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function updateNews(value) {
  try {
    let formData = new FormData();
    formData.append("Id", value.id);
    formData.append("Title", value.title);
    formData.append("Description", value.description);
    if (value.upload.length > 0) {
      formData.append(`Upload`, value.upload[0]);
    }
    const response = await Instance.put(`News/Update`, formData);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function Delete(id) {
    try {
      const response = await Instance.delete(`News/Delete/${id}`);
      return await response.data;
    } catch (error) {
      console.log("error", error);
    }
  }