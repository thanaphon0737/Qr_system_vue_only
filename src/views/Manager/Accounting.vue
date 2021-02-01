<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-data-table :search="search" :headers="headers" :items="mDataArray" hide-default-footer disable-pagination>
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
            <td>{{ item.order_date }}</td>
            <td>{{ item.customer_id}}</td>
            <td>
              {{ item.orderStatus.name }}
            </td>
            <td>{{ item.note }}</td>
            <td>{{item.total_price}}</td>
            <td>
              <v-icon class="mr-2" @click="editEmployeeInfo(item)">edit</v-icon>
              
            </td>
          </tr>
        </template>
      </v-data-table>

      
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  name: "Accouting",
  socket:{},
  data() {
    return {
      search: "",
      selectedProductId: "",
      selectedRole: "",
      selectedRoleId: "",
      confirmDeleteDlg: false,
      confirmEditRoleDlg: false,
      mDataArray: [],
      roleArray: [],

      headers: [
        {
          text: "Id",
          align: "left",
          value: "id"
        },
        { text: "order_date", value: "" },
        { text: "customer_id", value:""},
        { text: "status", value: "" },
        { text: "note", value: "" },
        { text: "total_price", value: ""}
        
      ]
    };
  },
  async mounted() {
    this.socket = this.$store.getters.socket[0];
    this.socket.emit("initial_data_acc");
    this.socket.on("getDataAcc", data => {this.getData(data)})
    this.socket.on("changeData", () => this.changeData())
  },
  methods: {
    editEmployeeInfo(item) {
      this.$router.push(`/order-info/${item.id}`);
    },

    //realtime update
    getData(data) {
        this.mDataArray = data;
    },
    changeData(){
      this.socket.emit("initial_data_acc");
      
    },


    async loadData() {
      let result = await api.getOrder();
      this.mDataArray = result.data;
      
    }
  },
  beforeDestroy() {
    this.socket.off("getDataAcc");
    this.socket.off("changeData");
  },
};
</script>

<style></style>
