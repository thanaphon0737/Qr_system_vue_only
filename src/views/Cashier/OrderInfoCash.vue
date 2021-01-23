<template>
  <div>
    <v-container>
      <div class="text-center">
        <h1>Cashier Dashboard</h1>
      </div>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                OrderProductId
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
              <th>
                quantity
              </th>
              <th class="text-left">
                price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in mDataArray" :key="item.name">
              <td>{{ item.id }}</td>
              <td>{{ item.product_name }}</td>
              <td>{{ item.order_id }}</td>
              <td>{{ item.status }}</td>
              <td>{{ item.order_qty }}</td>
              <td>{{ item.price | currency("฿")}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>Subtotal</th>
              <th>{{ totalprice | currency("฿")}}</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>Vat 7%</th>
              <th>{{ totalprice * 0.07 | currency("฿")}}</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>Total</th>
              <th>{{ totalprice * 1.07 | currency("฿")}}</th>
            </tr>
          </tfoot>
        </template>
      </v-simple-table>
      <div align="end">
        <v-row>
          <v-col>
            <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="#febd2e" v-bind="attrs" v-on="on"
                  >Check out</v-btn
                >
              </template>
              <template v-slot:default="">
                <v-card>
                  <v-toolbar color="#febd2e">Table 1 john doe</v-toolbar>
                  <v-card>
                    <v-row no-gutters>
                      <v-col
                        cols="12"
                        sm="12"
                        v-for="(item, index) in mDataArray"
                        :key="index"
                      >
                        <v-list-item>
                          <v-list-item-content>
                            {{ item.product_name }}
                          </v-list-item-content>
                          <v-list-item-content>{{
                            item.order_qty
                          }}</v-list-item-content>
                          <v-list-item-content class="align-end"
                            ><strong>{{ item.price | currency("฿") }}</strong>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content>
                            price:
                            {{ (item.price * item.order_qty) | currency("฿") }}
                          </v-list-item-content>
                          
                        </v-list-item>
                      </v-col>
                      
                      <v-col 
                      cols="12" 
                      sm="12"
                      
                      >
                      <v-divider></v-divider>
                        <v-list-item>
                          
                          <v-list-item-content>
                            Subtotal
                          </v-list-item-content>
                          
                          <v-list-item-content>

                          </v-list-item-content>
                          <v-list-item-content>
                            {{totalprice | currency("฿")}}
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="12" sm="12"
                        ><v-list-item>
                          <v-list-item-content>
                            Tax
                          </v-list-item-content>
                          <v-list-item-content>
                            
                          </v-list-item-content>
                          <v-list-item-content>
                            {{totalprice*0.07 | currency("฿")}}
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="12" sm="12"
                        ><v-list-item>
                          <v-list-item-content>
                            Total
                          </v-list-item-content>
                          <v-list-item-content>
                            
                          </v-list-item-content>
                          <v-list-item-content>
                            {{totalprice*1.07 | currency("฿")}}
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-card>

                  <v-card-actions class="justify-end">
                    <v-btn color="#febd2e" @click="billOrder()">pay</v-btn>
                    <v-btn text @click="close()">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import api from "@/services/api";
export default {
  name: "orderinfo",
  data() {
    return {
      search: "",
      dialog: false,
      mDataArray: [],
      totalprice: 0,
      socket:{}
    };
  },
  async mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      let result = await api.getOrderProductByCustomerId(this.$route.params.id);
      let showdata = result.data.map((data) => {
        return {
          id: data.id,
          order_qty: data.order_qty,
          product_id: data.product_id,
          product_name: data.product.product_name,
          order_id: data.order_id,
          status_id: data.order_product_status_id,
          status: data.orderProductStatus.name,
          price: data.price,
          pricetotal: data.price * data.order_qty
        };
      });

      
      function checkIsDelivered(data) {
        return data.status_id >= 4;
      }
      let filtered = showdata.filter(checkIsDelivered)
      filtered.forEach((element) => {
        if(element.status_id != 999){
          this.totalprice += element.pricetotal;
        }
        
      });
      this.mDataArray = filtered;
    },
      async billOrder(){
      this.socket = this.$store.getters.socket[0];
      try{
        let data = {
          status_id :5 // 5 is status success
        }
        const result = await api.putOrderProductByCustomerId(this.$route.params.id, data) 
        this.socket.emit("payOrder");
        let dataSent = {
          id:this.$route.params.id,
          totalPrice: this.totalprice
        }
        const updatePrice = await api.updatePriceCustomer(dataSent)
        if(updatePrice){
          alert("updatePrice total already")
        }
        this.$router.back()
      }catch(err){
        console.log(err)
      }

    
      this.dialog = false
    },
    close(){
      this.dialog = false
    }
  },
};
</script>

<style></style>
