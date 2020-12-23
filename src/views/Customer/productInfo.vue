<template>
  <div class="about text-center">
    <v-card max-width="400" class="mx-auto">
      <Appbar />
      <v-container>
        <v-row>
          <v-col>
            <v-card :color="'#34eb59'" dark>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="headline"
                    v-text="item.product_name"
                  ></v-card-title>
                </div>

                <v-avatar class="ma-3" size="125" tile>
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
            <v-card-actions>
              <v-row>
                <v-btn
                  elevation="2"
                  icon
                  raised
                  @click="count <= 0 ? (count = 0) : count--"
                  >-</v-btn
                >

                <span> {{ count }}</span>

                <v-btn elevation="2" icon raised @click="count++">+</v-btn>
                <v-btn outlined rounded @click="addfood(item)">
                  add to cart
                </v-btn>
              </v-row>
            </v-card-actions>

            <v-alert dense type="success" v-model="alert">
              add <strong>{{ count }}</strong> to cart
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
// import io from 'socket.io-client';
import io from "socket.io-client";
import api from "@/services/api";
import Appbar from "@/components/mobile/Appbar.vue";
export default {
  components: {
    Appbar,
  },
  data() {
    return {
      socket: {},
      item: {},
      count: 0,
      alert: false
    };
  },
  created() {
    this.socket = io("http://localhost:8081");
  },
  mounted() {
    this.loadProductById();
  },
  methods: {
    async loadProductById() {
      let data = await api.getProductById(this.$route.params.id);
      this.item = data.data;
      // console.log(this.items)
    },
    addfood(item) {
      //check data existed
      let previous_data = JSON.parse(localStorage.getItem("collection_food"));
      let exist = false;
      let initArray = []
      let data = {
        product_name: item.product_name,
        product_id: item.id,
        price: item.product_sell_price * this.count,
        product_qty_added: this.count,
      };
      if (previous_data) {
        previous_data.forEach((elem) => {
          if (elem.product_id === item.id) {
            // add qty in exist product
            elem.price += (item.product_sell_price*this.count)
            elem.product_qty_added += this.count;
            exist = true;
          }
        });
        if(!exist){
          previous_data.push(data);
        }
        
      }else {
        //generate new data
        previous_data = [data];
      }
      if (this.count > 0) {
        localStorage.setItem("collection_food", JSON.stringify(previous_data));
      }
      this.alert = true
      setTimeout(()=>{this.alert = false; this.count =0}, 1000)
    },
  },
};
</script>
