<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="8">
        <v-card class="mx-10  pa-5" outlined>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Id
                  </th>
                  <th class="text-left">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,i) in mDataArray" :key="i">
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-row>
            <v-col>
              <v-text-field
                v-model="product_type_name"
                label="add Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="product_type_note"
                label="add Note"
              ></v-text-field>
              <v-btn class="mr-4" @click="cancel">
                Cancel
              </v-btn>

              <v-btn color="success" @click="submit">
                Confirm
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  name: "productType-create",
  async mounted() {
    let result = await api.getProductType();

    this.mDataArray = result.data;
  },
  data: () => ({
    mDataArray: [],
    product_type_name: "",
    product_type_note: ""
  }),

  methods: {
    cancel() {
      this.$router.back();
    },
    async submit() {
      let data = {
        name:this.product_type_name,
        note:this.product_type_note
      }
      await api.addProductType(data);
      this.$router.back();
    },
  },
};
</script>

<style></style>
