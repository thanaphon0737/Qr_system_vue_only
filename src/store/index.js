import Vue from "vue";
import Vuex from "vuex";
import api from "@/services/api";
import { server } from "@/services/constants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    username: "",
    role_name:"",
    id:"",
    collection_food:[],
    user:{
      isLogged: false,
      isChef: false,
      isWaiter: false,
      isManager: false,
      isCashier: false,
      isCustomer: false,
    }
  },  
  getters: {
    auth(state) {
      return state.user;
    },
    username(state) {
      return state.username;
    },
    role_name(state){
      return state.role_name;
    },
    id(state){
      return state.id;
    },
    foods(state){
      return state.collection_food;
    }
  },
  mutations: {
    SET_LOGGED_IN(state){
      state.user.isLogged = true
    },
    SET_LOGGED_OUT(state) {
      state.user.isLogged = false;
    },
    SET_USERNAME(state, value){
      state.username = value
    },
    SET_ROLE_NAME(state, value){
      value.toString();
      if(value.toLowerCase() === 'manager' ){
        state.isManager = true;
      }else if(value.toLowerCase() === 'chef' ){
        state.isChef = true;
      }else if(value.toLowerCase() === 'waiter' ){
        state.isWaiter = true;
      }else if(value.toLowerCase() === 'cashier' ){
        state.isCashier = true;
      }else if(value.toLowerCase() === 'customer' ){
        state.isCustomer = true;
      }else {
        console.log("null role");
      }
      state.role_name = value
    },
    SET_ID(state, value){
      state.id = value
    },
    SET_FOOD(state, value){
      state.collection_food = value;
    }
  },
  actions: {
    async doLogin({ commit, dispatch }, { username, password }) {
      let result = await api.login({ username, password });
      if (result == true) {
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
        commit("SET_ROLE_NAME", localStorage.getItem("role_name"))
        commit("SET_ID",localStorage.getItem("id"))
      } else {
        dispatch("doLogout", {});
      }
    },
    doLogout({ commit }) {
      api.logoff();
      commit("SET_LOGGED_OUT");
      commit("SET_USERNAME", "");
      commit("SET_ROLE_NAME","");
      commit("SET_ID","");
    },
    restoreLogin({ commit }) {
      if (api.isLoggedIn() == true) {
        let username = localStorage.getItem(server.USERNAME);
        let role_name = localStorage.getItem('role_name');
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
        commit("SET_ROLE_NAME", role_name);
        commit("SET_ID",localStorage.getItem("id"));
      }
    },
    addfoods({commit}) {
      let getfood = localStorage.getItem('collection_food');
      commit("SET_FOOD", getfood);
    },
    setCustomerId({commit}, { id}){
      localStorage.setItem("id",id);
      localStorage.setItem("ROLE_NAME", "customer")
      commit("SET_ID",id);
      commit("SET_ROLE_NAME", 'customer');
    }
  },
  modules: {}
});
