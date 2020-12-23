<template>
  <div class="about text-center">
    <h1>Your role is {{ $store.getters["role_name"] }}</h1>
    <h1>Chef Dashboard</h1>
    <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card
            :color="'#34eb59'"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.product_name"
                ></v-card-title>


                <v-card-actions>
                  

                  <v-btn
                    
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                  >
                    confirm
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img
                :src="item.product_image | imageUrl"
                lazy-src="http://www.codemobiles.com/biz/images/cm_logo.png?ref=10"
                aspect-ratio="1"
                max-width="150"
                max-height="150"
              ></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>

    <!-- <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue> -->
  </div>
</template>
<script>
import QrcodeVue from "qrcode.vue";
import io from "socket.io-client";
export default {
  data() {
    return {
      items:[
      ],

    };
  },
  created() {
    this.socket = io("http://localhost:8081");
  },
  mounted() {
    this.socket.on("toChef", (data) => {
      console.log("added")
      this.items = data;
      console.log(this.items)
    });

    

    
  },
  components: {
    QrcodeVue,
  },
};
</script>
