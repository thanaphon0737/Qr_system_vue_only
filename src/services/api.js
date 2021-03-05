import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";
import router from "@/router";
import * as productApis from "@/services/api_product.js";
import * as employeeApis from "@/services/api_employee.js";
import * as customerApis from "@/services/api_customer.js";
import * as discountApis from "@/services/api_discount.js";
import jwt from 'jsonwebtoken';
const isLoggedIn = () => {
  let token = localStorage.getItem(server.TOKEN_KEY);
  return token !== null;
};

const asyncLocalStorage = {
  setItem: function (key, value) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    });
  },
  getItem: function (key) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key);
    });
  }
};
const login = async values => {
  const result = await httpClient.post(server.LOGIN_URL, values);
  const token = result.data.token;

  if (token) {
    var decoded = jwt.verify(token, 'secretkey');

    await asyncLocalStorage.setItem(server.USERNAME, decoded.data.username);
    await asyncLocalStorage.setItem(server.TOKEN_KEY, token);
    await asyncLocalStorage.setItem(server.ROLENAME, decoded.data.role_name);
    await asyncLocalStorage.setItem(server.ID, decoded.data.id);
    
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
  localStorage.removeItem(server.ROLENAME)
  localStorage.removeItem(server.ID)
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
