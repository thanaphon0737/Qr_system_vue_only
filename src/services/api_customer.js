import { imageUrl } from "./constants";
import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";




export const getCustomerById = () =>{
  return httpClient.get(`customer`);
}

