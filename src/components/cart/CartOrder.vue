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
            <!-- <v-row v-for="(item, i) in items" :key="i" cols="12">
              <v-list-item>
                <v-list-item-content>
                  <v-divider></v-divider>
                  <v-list-item-title>
                    name:{{ item.product_name }} {{item.id}}
                  </v-list-item-title>
                  <v-list-item-title>
                    qty:{{ item.order_qty }}
                  </v-list-item-title>
                  <v-list-item-title>
                    status:{{ item.status }}
                  </v-list-item-title>
                  <v-list-item-title>
                    price: {{ item.price }}
                  </v-list-item-title>
                  <v-divider></v-divider>
                </v-list-item-content>
                
              </v-list-item>
              
            </v-row> -->
            <v-data-table
              :headers="headers"
              :items="items"
              :items-per-page="5"
              hide-default-footer
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td>{{ item.product_name }}</td>

                  <td>
                    {{ item.order_qty }}
                  </td>
                  <td>{{ item.status }}</td>
                  <td>{{ item.price }}</td>
                  <td>{{ item.pricetotal }}</td>
                  <td>
                    <v-btn icon color="red" @click="markCancel(item)">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
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
            <v-btn icon @click="dialog = false">
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
      headers: [
        { text: "name", value: "product_name" },
        { text: "qty", value: "order_qty" },
        { text: "status", value: "status" },
        { text: "price/piece.", value: "price" },
        ,
        { text: "price", value: "pricetotal" },
        { text: "cancel", value: "" },
      ],
      items: [],
      total: 0,
      socket: {},
      dialog: false,
      customer_id: this.$store.getters.id,
    };
  },
  created() {},
  mounted() {
    this.socket = this.$store.getters.socket[0];
    // console.log(this.socket);
    this.socket.emit("initial_data_customer", { id: this.customer_id });
    this.socket.on("getDataCustomer", (packet) => {
      this.getData(packet);
    });
    this.socket.on("changeData", () => this.changeData());
  },
  methods: {
    markCancel(item) {
      if (item.status_id == 1) {
        const data = {
          id: item.id,
          status_id: 999, // change cancel to In kitchen
        };
        this.socket.emit("accept_order", data);
      }else {
        alert('cant cancel now')
      }
    },
    getData(packet) {
      // console.log("get")
      //filter data
      this.total = 0;
      let filtered = 0;
      console.table(packet);
      if (packet.customer_id_from_page == this.customer_id) {
        filtered = packet.data;
      }
      console.log(filtered);
      function checkIsNotBilled(data) {
        return data.order_product_status_id <= 5;
      }
      let showdata = filtered.filter(checkIsNotBilled).map((data) => {
        return {
          id: data.id,
          product_name: data.product.product_name,
          order_qty: data.order_qty,
          status: data.orderProductStatus.name,
          status_id: data.order_product_status_id,
          order_id: data.order_id,
          price: data.price,
          pricetotal: data.price * data.order_qty,
        };
      });
      showdata.forEach((el) => {
        if (el.status_id != 999) {
          this.total += el.pricetotal;
        }
      });
      this.items = showdata;
    },
    changeData() {
      this.socket.emit("initial_data_customer", { id: this.customer_id });
    },
  },
  beforeDestroy() {
    this.socket.off("getDataCustomer");
    this.socket.off("changeData");
  },
};
</script>
