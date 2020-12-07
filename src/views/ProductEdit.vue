<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="8">
        <v-card class="mx-10  pa-5" outlined>
          <v-form @submit.prevent="submit">
            <v-text-field
              v-model="product.product_name"
              :counter="10"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="product.product_serving"
              suffix="ps"
              type="number"
              label="serving"
              required
            ></v-text-field>
            <v-text-field
              v-model="product.product_sell_price"
              suffix="THB"
              type="number"
              label="Price"
              required
            ></v-text-field>
            <v-text-field
              v-model="product.product_buy_price"
              suffix="THB"
              type="number"
              label="Price"
              required
            ></v-text-field>
            <v-text-field
              v-model="product.product_qty"
              suffix="ea"
              type="number"
              label="qty"
              required
            ></v-text-field>
            <v-text-field
              v-model="product.product_type_id"
              label="product_type_id"
              required
            ></v-text-field>
            <input @change="onFileSelected" type="file" name="" id="" />
            <br />
            <v-img              
              :src="getProductImage()"
              height="200"
              width="200"
              class="mt-3"
            ></v-img>
            <br />
            <br />
            <v-row>
              <v-spacer></v-spacer>
              <v-btn class="mr-4" @click="cancel">
                Cancel
              </v-btn>

              <v-btn color="success" type="submit">
                Confirm
              </v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  name: "stock-create",
  data: () => ({
    product: {
      product_name: "",
      product_serving: "",
      product_sell_price: "",
      product_buy_price:"",
      product_qty:"",
      product_type_id:"",
    }
  }),
  async mounted() {
    let result = await api.getProductById(this.$route.params.id);
    this.product = result.data;
    console.log(this.product)
  },

  methods: {
    cancel() {
      this.$router.back();
    },
    onFileSelected(event) {
      const reader = new FileReader();
      reader.onload = event => {
        // for preview
        this.product.product_image = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);

      // for upload
      this.imageFile = event.target.files[0];
    },
     async submit() {
      let formData = new FormData();
      const { product_name, 
      product_serving, 
      product_sell_price ,
      product_buy_price,
      product_qty,
      product_type_id,
      } = this.product;
      formData.append("id", this.$route.params.id)
      formData.append("product_name", product_name);
      formData.append("product_serving", product_serving);
      formData.append("product_sell_price", product_sell_price);
      formData.append("product_buy_price", product_buy_price);
      formData.append("product_qty", product_qty);
      formData.append("product_type_id", product_type_id);
      if (this.imageFile != null) {
        formData.append("image", this.imageFile);
      }

      await api.updateProduct(formData);
      this.$router.back();
    },
    getProductImage() {
      if (this.product.product_image.length > 100) {
        return this.product.product_image;
      } else {
        return this.$options.filters.imageUrl(this.product.product_image);
        // return `${imageUrl}/${this.product.image}`;
      }
    }
  }
};
</script>

<style></style>
