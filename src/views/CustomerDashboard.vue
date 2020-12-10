<template>
  <div class="about text-center">
    <h1>Your role is {{$store.getters["role_name"]}}</h1>
    <h1>Customer Dashboard</h1>
    
    
    <!-- <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue> -->
  
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
export default {
  data() {
      return {
        value: 'https://google.com',
        size: 300,
      }
    },
    components: {
      QrcodeVue,
    }
};
</script>
