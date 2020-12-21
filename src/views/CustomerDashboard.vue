<template>
  <div class="about text-center">
    <h1>Your role is {{$store.getters["role_name"]}}</h1>
    <h1>Customer Dashboard</h1>
    <h1>{{message.data}}</h1>
    <h1>{{message.id}}</h1>
    
    
    
  
  </div>
</template>
<script>
// import io from 'socket.io-client';
import io from "socket.io-client"
// var socket = null;


export default {
  data() {
      return {
        socket:{},
        message:{
          data:"",
          id:0
        },
      }
    },
    created(){
      console.log("create")
      
      // this.socket = io("http://localhost:8081")
    },
    mounted() {
      // this.socket = io("http://localhost:8081")
      console.log("mounted")
      this.$root.socket.on("test", (data)=>{
        console.log(data)
        this.message = data
      })
      // console.log(this.$root)
      
      // socket = io("http://localhost:8081");
      // this.socket.on("connect", ()=>{
      //   console.log(socket.id)
      // })
      
      // console.log(this.socket.on("connected"),{data:"connect"})
    },
};
</script>
