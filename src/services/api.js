import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";
import router from "@/router";
import * as productApis from "@/services/api_product.js"
import * as employeeApis from "@/services/api_employee.js"
import * as customerApis from "@/services/api_customer.js"
import * as discountApis from "@/services/api_discount.js"
const isLoggedIn = () => {
  let token = localStorage.getItem(server.TOKEN_KEY);
  return token != null;
};

const login = async values => {
  const result = await httpClient.post(server.LOGIN_URL, values);
  if (result.data.result == "ok") {
    localStorage.setItem(server.USERNAME, values.username);
    localStorage.setItem(server.TOKEN_KEY, result.data.token);
    localStorage.setItem("role_name",result.data.message.role_name)
    localStorage.setItem("id",result.data.message.id)
    return true;
  } else {
    return false;
  }
};

const register = async values => {
  let result = await httpClient.post(server.REGISTER_URL, values);
  if (result.data.result == "ok") {
    router.go(-1);
  } else {
    alert(JSON.stringify(result));
  }
};

const logoff = () => {
  localStorage.removeItem(server.TOKEN_KEY);
  localStorage.removeItem(server.USERNAME);
  localStorage.removeItem("role_name")
  localStorage.removeItem("id")
  router.push("/login");
};

export default {
  isLoggedIn,
  login,
  register,
  logoff,
  ...productApis,
  ...employeeApis,
  ...customerApis,
  ...discountApis
};
