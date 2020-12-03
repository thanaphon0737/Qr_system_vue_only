<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="8">
        <v-card class="mx-10  pa-5" outlined>
          <v-form @submit.prevent="submit">
            <v-text-field
              v-model="promo.code"
              :counter="10"
              label="Code"
              required
            ></v-text-field>

            <v-text-field
              v-model="promo.discountpercent"
              suffix="%"
              type="number"
              label="Discount Percentage"
              required
            ></v-text-field>

            <v-text-field
              v-model="promo.remaining"
              type="number"
              label="Quantity"
              required
            ></v-text-field>
            <v-text-field
              v-model="promo.note"
              type="text"
              label="Note"
            ></v-text-field>

            <br />
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
  name: "promo-create",
  data: () => ({
    promo: {
      id: "",
      code: "",
      discountpercent: "",
      note: "",
      Remaining: ""
    }
  }),

  methods: {
    cancel() {
      this.$router.back();
    },
    async submit() {
      let formData = new FormData();
      const { code, discountpercent, Remaining, note } = this.promo;
      formData.append("name", code);
      formData.append("stock", discountpercent);
      formData.append("price", Remaining);
      formData.append("note", note);
      await api.addProduct(formData);
      this.$router.back();
    }
  }
};
</script>

<style></style>
