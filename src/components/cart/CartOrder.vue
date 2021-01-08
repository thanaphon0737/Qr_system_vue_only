<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="400" class="mx-auto">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="green" dark v-bind="attrs" v-on="on">
          <v-btn icon>
          <v-icon>mdi-food</v-icon>
        </v-btn>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">My Order</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row v-for="(item, i) in items" :key="i" cols="12">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    name:{{ item.product_name }}
                  </v-list-item-title>
                  <v-list-item-title>
                    qty:{{ item.order_qty }}
                  </v-list-item-title>
                  <v-list-item-title>
                    status:{{ item.status}}
                  </v-list-item-title>
                  <v-list-item-title>
                    price: {{ item.price }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-row>
            <v-row>
              <v-col>
                <v-list-item>
                  <v-list-item-content>
                    All total
                  </v-list-item-content>
                  <v-list-item-content>
                    <h2>
                      {{ "฿" + total.toFixed(2) }}
                    </h2>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>tax 7%</v-list-item-content>
                  <v-list-item-content>
                    <h2>
                      {{ "฿" + (total * 1.07).toFixed(2) }}
                    </h2>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <v-btn icon @click="dialog= false">
              close
            </v-btn>
          </v-container>
        </v-card-text>
        
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from "@/services/api";
export default {
  name: "CartOrder",
  data() {
    return {
      dialog: false,
      items: [],
      total: 0,
      socket: {},
      dialog: false
    };
  },
  created() {},
  mounted() {
    this.socket = this.$store.getters.socket[0];
    console.log(this.socket);
    this.socket.emit("initial_data_chef");
    this.socket.on("getData", (data) => {
      this.getData(data);
    });
    this.socket.on("changeData", () => this.changeData());
  },
  methods: {
    
    getData(data) {
      // console.log("get")
      console.log(data)
      let showdata = data.map((data) => {
        return {
          id: data.id,
          product_name: data.product.product_name,
          order_qty: data.order_qty,
          status: data.orderProductStatus.name,
          order_id: data.order_id,
          price: data.price
        };
      });
      this.items = showdata;
    },
    changeData() {
      this.socket.emit("initial_data_chef");
    },
    
  },
};
</script>
