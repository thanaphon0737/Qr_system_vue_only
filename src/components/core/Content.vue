<template>
  <v-content class="Vcontent">
    <router-view class=Rview></router-view>
    <Footer v-if="$store.getters.auth.isLogged"/>
  </v-content>
  
</template>

<script>
import Footer from "@/components/core/Footer"
export default {
  components:{
    Footer
  }
};
</script>

<style scoped>
.Vcontent{
  background-color: #f5f5f5;
  color: rgba(0, 0, 0, 0.87);
}
.Rview{
  min-height:640px
}
</style>>
