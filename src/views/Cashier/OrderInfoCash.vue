<template>
  <v-container>
    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Id
          </th>
          <th class="text-left">
            product_name
          </th>
          <th class="text-left">
            order_id
          </th>
          <th class="text-left">
            status
          </th>
          <th class="text-left">
            price
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in mDataArray"
          :key="item.name"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.product_name }}</td>
          <td>{{ item.order_id}}</td>
          <td>{{ item.status}}</td>
          <td>{{ item.price}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  name: "Stock",
  data() {
    return {
      search: "",
      
      mDataArray: [],
      

      
    };
  },
  async mounted() {
    this.loadData();
  },
  methods: {
    


    async loadData() {
      let result = await api.getOrderProductByCustomerId(this.$route.params.id);
      let showdata = result.data.map((data)=>{
        return {
          id: data.id,
          order_qty: data.order_qty,
          product_id: data.product_id,
          product_name: data.product.product_name,
          order_id: data.order_id,
          status_id: data.order_product_status_id,
          status: data.orderProductStatus.name,
          price: data.price
        }
      })
      console.table(showdata)

      this.mDataArray = showdata;
    }
  }
};
</script>

<style></style>
