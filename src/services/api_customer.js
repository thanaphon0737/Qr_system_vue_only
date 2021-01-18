import { imageUrl } from "./constants";
import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";




export const getCustomerById = async (id) =>{
  let result = await httpClient.get(`customer/${id}`);

  if(result.data.result == 'ok'){
    localStorage.setItem("id", id);
    localStorage.setItem("role_name", "customer");
    return true;
  }else{

    return false; 
  }
}

export const getTableAll = async () =>{
  return httpClient.get('table')
}

export const getCustomerAll = async () =>{
  return httpClient.get('customer')
}
