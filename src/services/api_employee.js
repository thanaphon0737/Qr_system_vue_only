import { imageUrl } from "./constants";
import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";




export const getRoles = () =>{
  return httpClient.get(`role`);
}

export const getEmployee = () =>{
  return httpClient.get(`employee`);
}
export const updateEmployee = (id,data) =>{
  return httpClient.put('employee'+ `/id/${id}`, data)
}
export const getEmployeeById = (id) =>{
  return httpClient.get('employee' + `/id/${id}`);
}

export const deleteEmployee = id => {
  return httpClient.delete('employee' + `/id/${id}`);
};

export const updateSalary =(data) =>{
  return httpClient.put('employeeSalary',data);
}