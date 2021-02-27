<template>
  <div>
    <div class="about text-center">
      <h1>Your role is {{ $store.getters["role_name"] }}</h1>
      <h1>Chef Dashboard</h1>
    </div>

    <v-container>
      <!-- Table section -->
      <v-card>
        <v-data-table
          :search="search"
          :headers="headers"
          :items="mDataArray"
          hide-default-footer
          disable-pagination
        >
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
                <strong>
                  {{ item.status }}
                </strong>
              </td>
              <td>{{ item.order_qty }}</td>
              <td>{{ item.order_id }}</td>
              <td>
                <v-btn class="mr-2" @click="markAccept(item)" color="warning">
                  In Kitchen
                </v-btn>
                <span class="ma-1"></span>
                <v-btn @click="markDone(item)" color="primary">
                  cooked
                </v-btn>
                <span class="ma-1"></span>
                <v-btn @click="markCancel(item)" color="error">
                  Cancel
                </v-btn>
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
      let numberDevlivered = 4;
      function checkUnBilled(data) {
        return data.order_product_status_id < 4;
      }
      let showdata = data.filter(checkUnBilled).map((data) => {
        return {
          id: data.id,
          product_name: data.product.product_name,
          order_qty: data.order_qty,
          status: data.orderProductStatus.name,
          order_id: data.order_id,
          limit_time: data.product.product_limit_time,
          status_id: data.orderProductStatus.id,
        };
      });
      console.log(showdata);
      this.mDataArray = showdata;
    },
    changeData() {
      this.socket.emit("initial_data_chef");
    },

    markAccept(item) {
      if (item.status_id == 1) {
        const data = {
          id: item.id,
          status_id: 2, // change proceeding to In kitchen
          cookedBy: Number(this.$store.getters.id),
        };
        this.socket.emit("accept_order", data);
      }else {
        alert('pleas accept order click this.')
      }
    },
    markDone(item) {
      if (item.status_id == 2) {
        const data = {
          id: item.id,
          status_id: 3, // change proceeding to In kitchen
          cookedBy: Number(this.$store.getters.id),
        };
        this.socket.emit("accept_order", data);
      } else {
        alert("please click in the kitchen before process. ");
      }
    },
    markCancel(item) {
      if (item.status_id == 1) {
        const data = {
          id: item.id,
          status_id: 999, // change cancel to In kitchen
          cookedBy: Number(this.$store.getters.id),
          order_qty:item.order_qty
        };
        this.socket.emit("accept_order", data);
      } else {
        alert("cant cancel now");
      }
    },
  },
  beforeDestroy() {
    this.socket.off("getDataChef");
    this.socket.off("changeData");
  },
};
</script>
