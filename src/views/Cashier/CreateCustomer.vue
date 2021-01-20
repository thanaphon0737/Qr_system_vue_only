<template>
  <div>
    <v-container>
      <div class="text-center">
        <h1>Cashier Dashboard</h1>
        <div>
          {{ this.mDataArray.message }}
        </div>
        <v-row>
          <v-col v-for="(item, index) in tableArray" :key="index" cols="2">
            <v-card outlined :color="color(item.status)">
              <v-list-item four-line>
                <v-list-item-content>
                  <v-list-item-title>Table {{ item.id }}</v-list-item-title>
                  <v-list-item-subtitle>
                    capacity: {{ item.capacity }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    status: {{ item.status }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    seatBy: {{ item.seatBy }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-btn color="#febd2e" dark @click.stop="openDialog(item)">
                create
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <v-dialog v-model="dialog" max-width="500" :retain-focus="false">
      <v-card>
        <v-card-title class="headline">
          New Customer
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="customerNameAdd"
            label="customer name"
            :disabled="checkDisableText()"
          ></v-text-field>
          {{ url_customer }}
          {{ customerNameAdd }}
          <v-progress-circular
            v-if="checkSentData"
            indeterminate
            color="amber"
          ></v-progress-circular>
          <div class="qrcode" :key="foreUpdateQr" v-if="checkDisableText()">
            <qrcode-vue
              :value="path + valueQr"
              :size="size"
              level="M"
            ></qrcode-vue>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            close
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="createCustomer()"
            :disabled="checkDisableText()"
          >
            seat
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from "@/services/api";
import QrcodeVue from "qrcode.vue";
export default {
  name: "createcustomer",
  components: {
    QrcodeVue,
  },
  data() {
    return {
      path: "http://10.80.84.55:8080/dashboard/",
      valueQr: "",
      size: 300,
      tableArray: [],
      dialog: false,
      customerNameAdd: "",
      url_customer: "",
      current_table_id: 0,
      foreUpdateQr: 0,
      socket: {},
      mDataArray: [],
      checkSentData: false,
    };
  },
  computed: {},
  mounted() {
    this.socket = this.$store.getters.socket[0];
    this.socket.emit("initial_data_cashier");
    this.socket.on("getData", (data) => {
      this.getData(data);
    });
    this.socket.on("changeData", () => this.changeData());
  },
  methods: {
    async openDialog(item) {
      this.dialog = true;
      this.current_table_id = item.id;

      this.socket.emit("initial_data_cashier_qr", { id: item.id });
      this.socket.on("getDataQr", (data) => {
        this.valueQr = data.message.url_image;
        this.url_customer = data.message.url_image;
        this.customerNameAdd = data.message.customer_name;
      });

      this.socket.on("changeDataQr", () => {
        this.socket.emit("initial_data_cashier_qr", { id: item.id });
      });
      this.url_customer = "";
      this.customerNameAdd = "";
    },
    createCustomer() {
      let data = {
        customer_name: this.customerNameAdd,
        table_id: this.current_table_id,
      };
      //send data through socket

      this.checkSentData = true;
      this.socket.emit("add_customer", data);
      this.foreUpdateQr += 1;
    },
    //realtime update
    getData(data) {
      this.mDataArray = data;
      this.getTable().then((this.checkSentData = false));
    },
    changeData() {
      this.socket.emit("initial_data_cashier");
    },
    checkDisableText() {
      let status = null;
      this.tableArray.forEach((el) => {
        if (el.id == this.current_table_id) {
          status = el.status;
        }
      });
      if (status == "seated") {
        return true;
      } else {
        return false;
      }
    },
    color(status) {
      let color = status === "seated" ? "orange" : "green";
      return "color: " + color;
    },

    async getTable() {
      try {
        const tableAll = await api.getTableAll();
        // const customer = await api.getCustomerAll();
        const customer = this.mDataArray;
        let newObj = [];

        tableAll.data.forEach((table) => {
          let hasSeated = false;
          customer.forEach((cust) => {
            if (table.id == cust.table_id) {
              newObj.push({
                id: table.id,
                capacity: table.capacity,
                status: "seated",
                seatBy: cust.customer_name,
              });
              hasSeated = true;
              return;
            }
          });
          if (!hasSeated) {
            newObj.push({
              id: table.id,
              capacity: table.capacity,
              status: "Avaliable",
              seatBy: "",
            });
          }
        });
        this.tableArray = newObj;
      } catch (err) {
        console.log(err);
      }
    },
  },
  beforeDestroy() {
    this.socket.off("getData");
    this.socket.off("changeData");
    this.socket.off("changeDataQr");
  },
};
</script>

<style scoped>
.col {
  max-width: 200px;
  max-height: 200px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
