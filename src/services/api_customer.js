import { imageUrl } from "./constants";
import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";


export const validCustomer = (tokenfront) => {
  let token = localStorage.getItem("tokenCustomer");
  return (tokenfront == token) ?  true :  false
};
export const updatePriceCustomer = (data) =>{
  return httpClient.put('updatePriceCustomer',data);
}
export const getCustomerByTableId = async (id) =>{
  let result = await httpClient.get(`customer/table/${id}`);
  console.log(id)
  if(result.data.result == 'ok'){
    let url = result.data.message.url_image;
    const token = url.toString().split("/")[1]
    localStorage.setItem("table_id", id);
    localStorage.setItem("id", result.data.message.id)
    localStorage.setItem("tokenCustomer",token)
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
