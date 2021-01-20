<template>
  <div>
    <div class="about text-center">
      <h1>Your role is {{ $store.getters["role_name"] }}</h1>
      <h1>Chef Dashboard</h1>
    </div>

    <v-container>
      <!-- Table section -->
      <v-card>
        <v-data-table :search="search" :headers="headers" :items="mDataArray">
          <!-- table top section -->
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>orders</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>

          <!-- table tr section -->
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.id }}</td>
              <td>{{ item.product_name }}</td>
              <td>
                {{ item.status }}
              </td>
              <td>{{ item.order_qty }}</td>
              <td>{{ item.order_id }}</td>
              <td>
                <v-icon class="mr-2" @click="markAccept(item)">
                  mdi-chef-hat
                </v-icon>
                <span class="ma-1"></span>
                <v-icon @click="markDone(item)">
                  mdi-check
                </v-icon>
                <span class="ma-1"></span>
                <v-icon @click="markCancel(item)">
                  mdi-cookie-remove
                </v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      items: [],
      mDataArray: [],
      socket: {},
      headers: [
        {
          text: "Id",
          align: "left",
          value: "id",
        },
        { text: "product_name", value: "" },
        { text: "status", value: "" },
        { text: "order_qty", value: "" },
        { text: "order_id", value: "" },
        { text: "operator", value: "" },
      ],
    };
  },
  created() {},

  mounted() {
    this.socket = this.$store.getters.socket[0];
    // console.log(this.socket);
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
          order_id: data.order_id,
        };
      });
      this.mDataArray = showdata;
    },
    changeData() {
      this.socket.emit("initial_data_chef");
    },

    markAccept(item){
      const data = {
        id: item.id,
        status_id:2 // change proceeding to In kitchen
      }
      this.socket.emit("accept_order", data)
    },
    markDone(item){
      const data = {
        id: item.id,
        status_id:3 // change proceeding to In kitchen
      }
      this.socket.emit("accept_order", data)
    },
    markCancel(item){
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
