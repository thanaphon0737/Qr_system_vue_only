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
    id:""
  },  
  getters: {
    isLogin(state) {
      return state.isLogged;
    },
    username(state) {
      return state.username;
    },
    role_name(state){
      return state.role_name;
    },
    id(state){
      return state.id;
    }
  },
  mutations: {
    SET_LOGGED_IN(state){
      state.isLogged = true
    },
    SET_LOGGED_OUT(state) {
      state.isLogged = false;
    },
    SET_USERNAME(state, value){
      state.username = value
    },
    SET_ROLE_NAME(state, value){
      state.role_name = value
    },
    SET_ID(state, value){
      state.id = value
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
        let role_name = localStorage.getItem('role_name')
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
        commit("SET_ROLE_NAME", role_name)
        commit("SET_ID",localStorage.getItem("id"))
      }
    },
  },
  modules: {}
});
