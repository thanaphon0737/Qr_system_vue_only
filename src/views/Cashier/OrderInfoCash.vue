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
              <td>{{ item.price | currency("฿") }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>Total</th>
              <th>{{ totalprice | currency("฿") }}</th>
            </tr>
          </tfoot>
        </template>
      </v-simple-table>
      <div align="end">
        <v-row>
          <v-col>
            <v-dialog
              v-model="dialog"
              transition="dialog-top-transition"
              max-width="600"
            >
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
                        v-for="(item, index) in mDialogArray"
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

                      <v-col cols="12" sm="12">
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content>
                            discount
                          </v-list-item-content>
                          <v-list-item-content>
                            <v-text-field
                              v-model="discountCode"
                              type="text"
                              label="ใส่ส่วนลด"
                              required
                            ></v-text-field>
                            <v-btn text color="primary" @click="checkDiscount()"
                              >check</v-btn
                            >
                            Code:{{ discountDetail.discount_code }} amount:{{
                              discountDetail.discount_amount
                            }}
                            type:{{ discountDetail.discountType.name }}
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content>
                            Subtotal
                          </v-list-item-content>

                          <v-list-item-content> </v-list-item-content>
                          <v-list-item-content>
                            {{ totalprice | currency("฿") }}
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <!-- <v-col cols="12" sm="12"
                        ><v-list-item>
                          <v-list-item-content>
                            Tax
                          </v-list-item-content>
                          <v-list-item-content> </v-list-item-content>
                          <v-list-item-content>
                            {{ (totalprice * 0.07) | currency("฿") }}
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="12" sm="12"
                        ><v-list-item>
                          <v-list-item-content>
                            Total
                          </v-list-item-content>
                          <v-list-item-content> </v-list-item-content>
                          <v-list-item-content>
                            {{ (totalprice * 1.07) | currency("฿") }}
                          </v-list-item-content>
                        </v-list-item>
                      </v-col> -->
                    </v-row>
                  </v-card>

                  <v-card-actions class="justify-end">
                    <v-btn color="#febd2e" @click="checkDeliveredBeforeSent()">pay</v-btn>
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
      mDialogArray:[],
      totalprice: 0,
      socket: {},
      cancelOrder: [],
      discountCode: "",
      discountDetail: {
        discount_code: "",
        discount_amount: "",
        discountType: {
          name: "",
        },
      },
    };
  },
  async mounted() {
    this.loadData();
  },
  methods: {
    async checkDeliveredBeforeSent(){
      let {data} = await api.checkDelivered(this.$route.params.id);
      console.log(data)
      if(data.DeliveredAll){
        this.billOrder()
      }else {
        alert('order in processing...')
      }
    },
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
          pricetotal: data.price * data.order_qty,
        };
      });

      function checkIsDelivered(data) {
        return data.status_id >= 4;
      }
      function findCancelOrder(data) {
        return data.status_id == 999;
      }
      function filterCancelOrder(data){
        return data.status_id !== 999;
      }
      this.cancelOrder = showdata.filter(findCancelOrder);
      let filtered = showdata.filter(checkIsDelivered);
      filtered.forEach((element) => {
        if (element.status_id != 999 && element.status_id != 5) {
          this.totalprice += element.pricetotal;
        }
      });
      this.mDataArray = filtered;
      this.mDialogArray = filtered.filter(filterCancelOrder)
    },
    async billOrder() {
      this.socket = this.$store.getters.socket[0];
      try {
        if (this.discountDetail.discount_code !== "") {
          let updateDis = {
            discount_id: this.discountDetail.id,
            customer_id: this.$route.params.id,
          };
          const updateDiscountInOrder = await api.updateDiscountInOrder(
            updateDis
          );
        }
        let data = {
          status_id: 5, // 5 is status success
        };
        const result = await api.putOrderProductByCustomerId(
          this.$route.params.id,
          data
        );
        this.socket.emit("payOrder");
        let dataSent = {
          id: this.$route.params.id,
          totalPrice: this.totalprice,
        };
        let cancelOrderSent = this.cancelOrder.map((el) => {
          return {
            order_id: el.order_id,
            totalPrice: el.price,
          };
        });

        const updatePrice = await api.updatePriceCustomer(dataSent);
        const updatePriceinOrder = await api.updatePriceinOrder(
          cancelOrderSent
        );
        if (updatePrice && updatePriceinOrder) {
          alert("updatePrice total already");
        }
        this.$router.back();
      } catch (err) {
        console.log(err);
      }

      this.dialog = false;
    },
    close() {
      this.dialog = false;
    },

    async checkDiscount() {
      let discountAll = await api.getDiscountAll();
      console.log(discountAll.data)
      discountAll.data.forEach((el) => {
        if (el.discount_code == this.discountCode) {
          if (el.minimum < this.totalprice) {
            this.discountDetail = el;
            this.totalprice = this.totalprice *(1-el.discount_amount/100)
            return;
          }
        }
      });
    },
  },
};
</script>

<style></style>
