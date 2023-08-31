import Instance from "../helpers/ConnectAPI.axios";

export async function getProducts(pagesize = 10, currentpage = 1, search) {
  try {
    const response = await Instance.get(`Products/GetProducts?pagesize=${pagesize}&currentpage=${currentpage}&search=${search}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getProductsDetail(id) {
  try {
    const response = await Instance.get(`Products/GetProductDetail/${id}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function createProducts(value) {
  try {
    let formData = new FormData();
    formData.append("Name", value.name);
    formData.append("Description", value.description);
    formData.append("Price", value.price);
    formData.append("Category", value.category);
    formData.append("Unit", value.unit);
    formData.append("Stock", value.stock);
    if (value.upload.length > 0) {
      for (const key in value.upload) {
        formData.append(`Upload`, value.upload[key]);
      }
    }
    const response = await Instance.post(`Products/CreateProduct`, formData);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}
export async function updateProducts(value) {
  try {
    let formData = new FormData();
    formData.append("Id", value.id);
    formData.append("Name", value.name);
    formData.append("Description", value.description);
    formData.append("Price", value.price);
    formData.append("Category", value.category);
    formData.append("Unit", value.unit);
    formData.append("Stock", value.stock);
    if (value.upload.length > 0) {
      for (const key in value.upload) {
        formData.append(`Upload`, value.upload[key]);
      }
    }
    if(value.remove.length > 0){
      for (const key in value.remove) {
        formData.append(`removeImage`, value.remove[key]);
      }
    }
    const response = await Instance.put(`Products/UpdateProduct`, formData);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function deleteProduct(id) {
  try {
    const response = await Instance.delete(`Products/DeleteProduct/${id}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}