<template>
  <div class="about">
    <h1>This is an about page</h1>
    <span>Your role is {{$store.getters["role_name"]}}</span>
    <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
  
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
