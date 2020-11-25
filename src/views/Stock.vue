<template>
  <v-container>
    <!-- Summary section -->
    <v-row>
      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard
          title="TOTAL"
          subtitle="1,800"
          avatar_bg="#00a65a"
          avatar_ic="mdi-cart-outline"
        />
      </v-col>

      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard
          title="SOLD-OUT"
          avatar_ic="mdi-flask-empty-outline"
          avatar_bg="#f39c12"
          subtitle="12"
        />
      </v-col>

      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard
          title="RETURN"
          avatar_ic="mdi-keyboard-return"
          avatar_bg="#dd4b39"
          subtitle="2"
        />
      </v-col>

      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard
          title="DISCOUNT"
          avatar_ic="mdi-gift-outline"
          avatar_bg="#00c0ef"
          subtitle="101"
        />
      </v-col>
    </v-row>

    <!-- Table section -->

    <v-card>
      <v-data-table :search="search" :headers="headers" :items="mDataArray">
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
              @click="$router.push('/stock-create')"
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
                :src="item.image | imageUrl"
                lazy-src="http://www.codemobiles.com/biz/images/cm_logo.png?ref=10"
                aspect-ratio="1"
                max-width="50"
                max-height="50"
              ></v-img>
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.price | currency("฿") }}</td>
            <td>{{ item.stock | number("0,0") }} pcs.</td>
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
          sortable: false,
          value: "id"
        },
        { text: "Image", value: "image" },
        { text: "Name", value: "name" },
        { text: "Price", value: "price" },
        { text: "Stock", value: "stock" },
        { text: "Action", value: "action" }
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
      this.$router.push(`/stock-edit/${item.id}`);
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
