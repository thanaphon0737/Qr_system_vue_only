<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="8">
        <v-card class="mx-10  pa-5" outlined>
          <v-form @submit.prevent="submit">
            <v-text-field
              v-model="promo.discount_code"
              :counter="10"
              label="Code"
              required
            ></v-text-field>

            <v-text-field
              v-model="promo.discount_amount"
              
              type="number"
              label="Discount "
              required
            ></v-text-field>

            <v-text-field
              v-model="promo.discount_remain"
              type="number"
              label="Quantity"
              required
            ></v-text-field>
            <v-text-field
              v-model="promo.minimum"
              type="number"
              label="Minimum"
              required
            ></v-text-field>
            
            <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      {{ discountTypenamed}}
                    </v-btn>
                  </template>
                  <v-list dense>
                    <v-list-item-group color="primary">
                      <v-list-item v-for="(items, i) in discountType" :key="i">
                        <v-list-item @click="editRole(items)">
                          {{ items.name }}
                        </v-list-item>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-menu>
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
  name: "promo-edit",
  data: () => ({
    promo: {
      discount_code: "",
      discount_remain: "",
      discount_amount: "",
      discount_type_id: "",
      minimum:""
      
    },
    discountType:[],
    discountTypenamed:"None"
  }),
  mounted() {
    this.loadData();
  },
  methods: {
   async loadData(){
      let result = await api.getDiscountById(this.$route.params.id);
      let Type = await api.getDiscountType();
      
      this.discountType = Type.data
      this.discountType.forEach(el =>{
        if(el.id == result.data.discount_type_id){
          this.discountTypenamed = el.name
        }
      })
      let {discount_code,discount_remain,discount_amount,discount_type_id,minimum } = result.data
      this.promo.discount_code = discount_code
      this.promo.discount_remain = discount_remain
      this.promo.discount_amount = discount_amount
      this.promo.discount_type_id = discount_type_id
      this.promo.minimum = minimum
    },

    cancel() {
      this.$router.back();
    },
    editRole(obj) {
      this.promo.discount_type_id = obj.id;
      this.discountTypenamed = obj.name;
    },
    async submit() {
     
        let res = await api.editDiscount(this.$route.params.id,this.promo);
        console.log(res)
        this.$router.back();
      
    }
  }
};
</script>

<style></style>
