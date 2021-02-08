<template>
  <v-app> 
    <Header v-if="$store.getters.auth.isLogged"/>
    <Menu v-if="$store.getters.auth.isLogged"/>
    <Content/>
  </v-app>
</template>

<script>
import Header from "@/components/core/Header"
import Menu from "@/components/core/Menu"
import Content from "@/components/core/Content"
import io from "socket.io-client";
import {ipglobal} from "@/services/constants"
export default {
  name: "App",
  components:{
    Header,
    Menu,
    Content
  },
  created(){
    this.socket = io(`http://${ipglobal}:8081`);
    this.$store.dispatch({
        type: "setSocket",
        socket: this.socket
      });
  },
  mounted() {
    this.$store.dispatch({ type: "restoreLogin" });

  },

};
</script>

<style></style>
