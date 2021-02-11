import Vue from "vue";
import Vuex from "vuex";
import api from "@/services/api";
import { server } from "@/services/constants";
import router from "../router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    role_name: "",
    id: "",
    collection_food: [],
    socket: [],
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    user: {
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
    role_name(state) {
      return state.role_name;
    },
    id(state) {
      return state.id;
    },
    
    foods(state) {
      return state.collection_food;
    },
    socket(state){
      return state.socket;
    }
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    //view---
    SET_LOGGED_IN(state) {
      state.user.isLogged = true
    },
    SET_LOGGED_OUT(state) {
      state.user.isLogged = false;
    },
    SET_USERNAME(state, value) {
      state.username = value
    },
    SET_ROLE_NAME(state, value) {
      state.role_name = value
      if (value.toLowerCase() === 'manager') {
        state.user.isManager = true;
        return
      } else if (value.toLowerCase() === 'chef') {
        state.user.isChef = true;
        return
      } else if (value.toLowerCase() === 'waiter') {
        state.user.isWaiter = true;
        return
      } else if (value.toLowerCase() === 'cashier') {
        state.user.isCashier = true;
        return
      } else if (value.toLowerCase() === 'customer') {
        state.user.isCustomer = true;
        return
      } else {
        console.log("null role");
        return
      }
      
    },
    SET_ID(state, value) {
      state.id = value
    },
    
    SET_FOOD(state, value) {
      state.collection_food = value;
    },
    SET_SOCKET(state, value){
      state.socket.push(value)
    }
  },
  actions: {
    async doLogin({ commit, dispatch }, { username, password }) {
      let result = await api.login({ username, password });
      if (result == true) {
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
        commit("SET_ROLE_NAME", localStorage.getItem("role_name"))
        commit("SET_ID", localStorage.getItem("id"))
      } else {
        dispatch("doLogout", {});
      }
    },
    doLogout({ commit }) {
      api.logoff();
      commit("SET_LOGGED_OUT");
      commit("SET_USERNAME", "");
      commit("SET_ROLE_NAME", "");
      commit("SET_ID", "");
    },
    restoreLogin({ commit }) {
      if (api.isLoggedIn() == true) {
        let username = localStorage.getItem(server.USERNAME);
        let role_name = localStorage.getItem('role_name');
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
        commit("SET_ROLE_NAME", role_name);
        commit("SET_ID", localStorage.getItem("id"));
      }
    },
    addfoods({ commit }) {
      let getfood = localStorage.getItem('collection_food');
      commit("SET_FOOD", getfood);
    },
    setSocket({commit}, {socket}){
      commit("SET_SOCKET", socket)
    },
    async setCustomerId({ commit }, { table_id ,token}) {
      let Cid = await api.getCustomerByTableId(table_id);
      console.log(Cid)
      let id = localStorage.getItem("id");
      if (Cid == true && api.validCustomer(token)) {
        
        commit("SET_ROLE_NAME", localStorage.getItem('role_name'));
        commit("SET_ID", localStorage.getItem('id'));
        router.push(`/customer/${id}`)
      }else {
        // router.push('/dashboard')
        alert("not authurized")
        console.log("no id match")
      }
    },
    
  },
  modules: {}
});
