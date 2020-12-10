<template>
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
            <td>{{ item.product_id }}</td>
            <td>{{ item.product_name}}</td>
            <td>{{ item.order_qty }}</td>
            <td>
              {{ item.product_status_name }}
            </td>
            <td>{{ item.price }}</td>
            
          </tr>
        </template>
      </v-data-table>

      
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  name: "Stock",
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
          text: "ProductId",
          align: "left",
          sort:false,
          
        },
        { text: "ProductName", value: "" },
        { text: "amount", value: "" },
        { text: "orderStatus", value: "" },
        { text: "Price", value: "" },
        
      ]
    };
  },
  async mounted() {
    this.loadData();
  },
  methods: {
    


    async loadData() {
      let result = await api.getOrderProductById(this.$route.params.id);
      this.mDataArray = result.data;
    }
  }
};
</script>

<style></style>
