import { imageUrl } from "./constants";
import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";



export const getDiscountAll = () => {
  return httpClient.get(`discount`)
};

export const deleteDiscount = id =>{
  return httpClient.delete(`discount-delete/${id}`)
}

export const editDiscount = (id,data) =>{
  return httpClient.put(`discount-edit/${id}`,data)
}

export const addDiscount = data =>{
  return httpClient.post(`discount`,data)
}

export const getDiscountType = () =>{
  return httpClient.get('discountType')
}
export const getDiscountById = id =>{
  return httpClient.get(`discount/${id}`);
}