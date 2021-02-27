<template>
  <v-container>
    <!-- Table section -->
    
    <v-card>
      <v-data-table :search="search" :headers="headers" :items="mDataArray" hide-default-footer disable-pagination>
        <!-- table top section -->
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Stock</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn
              @click="$router.push('/productType-create')"
              color="blue"
              dark
              class="mb-2"
            >
              <v-icon left>add</v-icon>
              <span>New ProductType</span>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              @click="$router.push('/product-create')"
              color="primary"
              dark
              class="mb-2"
            >
              <v-icon left>add</v-icon>
              <span>New Product</span>
            </v-btn>
          </v-toolbar>
        </template>

        <!-- table tr section -->
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>
              <v-img
                :src="item.product_image | imageUrl"
                lazy-src="http://www.codemobiles.com/biz/images/cm_logo.png?ref=10"
                aspect-ratio="1"
                max-width="50"
                max-height="50"
              ></v-img>
            </td>
            <td>{{ item.product_name }}</td>
            <td>{{ item.product_serving | number("0,0") }} ps</td>
            <td>{{ item.product_sell_price | currency("฿")  }}</td>
            <td>{{ item.product_buy_price | currency("฿") }}</td>
            <td>{{ item.product_qty | number("0,0") }}</td>
            <td>{{ item.productType.name }}</td>
            <td>{{ item.product_limit_time}}</td>
            <td>
              <v-icon class="mr-2" @click="editItem(item)">
                edit
              </v-icon>
              <span class="ma-1"></span>
              <v-icon @click="deleteItem(item)">
                delete
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>

      <v-dialog v-model="confirmDeleteDlg" max-width="290">
        <v-card>
          <v-card-title primary-title>
            Confirm Delete
          </v-card-title>

          <v-card-text class="body">
            Are you sure to delete this product? You cannot restore it after
            clicking confirm.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="confirmDeleteDlg = false">
              Cancel
            </v-btn>

            <v-btn color="error" text @click="confirmDelete">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import StockCard from "@/components/cards/StockCard";
import api from "@/services/api";
export default {
  name: "Stock",
  data() {
    return {
      search: "",
      selectedProductId: "",
      confirmDeleteDlg: false,
      mDataArray: [],
      headers: [
        {
          text: "Id",
          align: "left",
          value: "id"
        },
        { text: "Image", value: "image" },
        { text: "Name", value: "name" },
        { text: "Serving", value: "serving" },
        { text: "Sell Price", value: "sellPrice" },
        { text: "Buy Price", value: "buyPrice" },
        {text: "Qty", value:'qty'},
        { text:'Product Type', value:'productType'},
        { text:'Product Limit Time(s)', value:''},
        { text: 'Action', value:''}
      ]
    };
  },
  components: {
    StockCard
  },
  async mounted() {
    this.loadProducts();
  },
  methods: {
    editItem(item) {
      this.$router.push(`/product-edit/${item.id}`);
    },
    deleteItem(item) {
      this.selectedProductId = item.id;
      this.confirmDeleteDlg = true;
    },
    async confirmDelete() {
      await api.deleteProduct(this.selectedProductId);
      this.confirmDeleteDlg = false;
      this.loadProducts();
    },
    async loadProducts() {
      let result = await api.getProducts();

      this.mDataArray = result.data;
    }
    
  }
};
</script>

<style></style>
