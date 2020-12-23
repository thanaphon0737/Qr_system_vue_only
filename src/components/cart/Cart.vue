<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="400" class="mx-auto">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="orange" dark v-bind="attrs" v-on="on" @click="onclick">
          Cart
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
                    qty:{{ item.product_qty_added }}
                  </v-list-item-title>
                  <v-list-item-title>
                    id:{{ item.product_id }}
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
                      {{ total | currency("฿") }}
                    </h2>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>tax 7%</v-list-item-content>
                  <v-list-item-content>
                    <h2>
                      {{ (total * 1.07) | currency("฿") }}
                    </h2>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="orderConfirm">
            Order
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import io from "socket.io-client";
import api from "@/services/api";
export default {
  name: "Cart",
  data() {
    return {
      dialog: false,
      items: [],
      total: 0,
    };
  },
  created() {
    this.socket = io("http://localhost:8081");
  },
  mounted() {
    this.loadData();
  },
  methods: {
    onclick() {
      this.loadData();
    },
    loadData() {
      let getData = JSON.parse(localStorage.getItem("collection_food"));
      this.items = getData;
      getData.forEach((elem) => {
        this.total += elem.price;
      });
    },
    async orderConfirm(){
        let createOrder = {
          customer_id:1
        }
       await api.addOrder();
    }
  },
};
</script>
