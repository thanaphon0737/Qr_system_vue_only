<template>
  <div class="accounting">
    <h1>This is an accounting page</h1>
    
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
