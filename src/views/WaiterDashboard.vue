<template>
  <div class="about text-center">
    <v-card max-width="400" class="mx-auto">
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card color="#333333" dark>
              <v-card-title class="headline">
                Order
              </v-card-title>

              <v-card-subtitle
                >Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt facere, illo cum accusantium in assumenda perspiciatis
                rem, totam corrupti asperiores sit ratione adipisci odio error
                eius nobis ea reiciendis accusamus?</v-card-subtitle
              >
            </v-card>
            <v-container class="ml-2 mt-5"> </v-container>
          </v-col>
          <v-col v-for="(item, i) in items" :key="i" cols="12">
            <v-card :color="'#f4e7e2'">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="headline"
                    >customer no. {{ item.customer_id }}</v-card-title
                  >
                  <v-card-title>
                    food name: {{ item.product_name }}
                  </v-card-title>
                  <v-card-title>
                    order quantity: {{ item.order_qty }}
                  </v-card-title>
                  <v-card-title>
                    status order: {{item.status}}
                  </v-card-title>
                  <v-card-actions>
                    <v-btn
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                      @click="serve(item)"
                    >
                      serve
                    </v-btn>
                  </v-card-actions>
                </div>
                <v-avatar class="ma-3" size="125" tile>
                  <v-img
                    :src="item.product_image | imageUrl"
                    lazy-src="https://www.quickcleancode.com/wp-content/uploads/2019/06/LargeDependentGalapagoshawk-size_restricted.gif"
                    aspect-ratio="1"
                    max-width="150"
                    max-height="150"
                  ></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      socket: {},
    };
  },
  mounted() {
    this.socket = this.$store.getters.socket[0];
    this.socket.emit("initial_data_chef");
    this.socket.on("getDataChef", (data) => {
      this.getData(data);
    });
    this.socket.on("changeData", () => this.changeData());
  },
  methods: {
    getData(data) {
      // console.log("get")
      
      let showdata = data.map((data) => {
          return {
            id: data.id,
            product_name: data.product.product_name,
            order_qty: data.order_qty,
            status: data.orderProductStatus.name,
            status_id: data.order_product_status_id,
            order_id: data.order_id,
            price: data.price,
            customer_id: data.order.customer_id,
            product_image: data.product.product_image,
          };
        
      });
      //filter order product status < 4
      function checkDelivered(data){
        
        return data.status_id == 3;
      }
      this.items = showdata.filter(checkDelivered);
    },
    changeData() {
      this.socket.emit("initial_data_chef");
    },
    serve(item){
      const data = {
        id: item.id,
        status_id:4 // change proceeding to In kitchen
      }
      this.socket.emit("accept_order", data)
    }
  },
  beforeDestroy() {
    this.socket.off("getDataChef");
    this.socket.off("changeData");
  },
};
</script>
