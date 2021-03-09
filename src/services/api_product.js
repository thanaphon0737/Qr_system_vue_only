import { imageUrl } from "./constants";
import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getProducts = () => {
  return httpClient.get(server.PRODUCT_URL);
};


export const getProductById = id => {
  return httpClient.get(server.PRODUCT_URL + `/id/${id}`);
};
export const getProductType = () =>{
  return httpClient.get('productType');
}

export const addProductType = data =>{
  return httpClient.post('productType',data)
}
export const addProduct = data => {
  return httpClient.post(server.PRODUCT_URL, data);
};

export const deleteProduct = id => {
  return httpClient.delete(server.PRODUCT_URL + `/id/${id}`);
};

export const updateProduct = data => {
  return httpClient.put(server.PRODUCT_URL, data);
};

export const getOrder = () => {
  return httpClient.get('order');
};

export const getOrderProductById = (id) => {
  return httpClient.get(`orderProduct/order-id/${id}`);
};

export const getOrderProductByCustomerId = (id) =>{
  return httpClient.get(`orderProduct/customer-id/${id}`)
}
export const getOrdersPriceAllYear = () =>{
  return httpClient.get(`ordersPriceAllYear`)
}

export const getOrderTypeQtyAllTime = () =>{
  return httpClient.get(`orderTypeQtyAllTime`)
}

export const getAllProductName = () =>{
  return httpClient.get(`getAllProductName`)
}
export const putOrderProductByCustomerId = (id,data) =>{
  return httpClient.put(`orderProduct/customer-id/${id}`,data)
}

export const addOrder = (data)=> {
  return httpClient.post('order', data);
}

export const addOrderProduct = (data) =>{
  return httpClient.post('orderProduct',data);
} 

export const updatePriceinOrder = (data) =>{
  return httpClient.put('updatePriceinOrder', data)
}

export const checkDelivered = (cust_id) =>{
  return httpClient.get(`checkDelivered/${cust_id}`)
}