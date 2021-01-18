<template>
  <div>
    <v-container>
      <div class="text-center">
        <h1>Cashier Dashboard</h1>
        <v-row>
          <v-col v-for="(item, index) in testdat" :key="index" cols="2">
            <v-card outlined :color="color(item.status)" >
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
              
                <v-btn color="#febd2e" dark @click.stop="dialog = true">
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

                    <v-text-field v-model="customerNameAdd" label="customer name"></v-text-field>
                    {{customerNameAdd}}
                    <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                      >
                        Disagree
                      </v-btn>

                      <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                      >
                        Agree
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
    QrcodeVue
  },
  data() {
    return {
      value: "https://google.com",
      size: 300,
      testdat: [],
      dialog: false,
      customerNameAdd:""
    };
  },
  computed: {},
  mounted() {
    this.getTable();
  },
  methods: {
    color(status) {
      let color = status === "seated" ? "orange" : "green";
      return "color: " + color;
    },
    gendat() {
      for (let i = 0; i < 100; i++) {
        this.testdat.push(i);
      }
    },
    async getTable() {
      try {
        const tableAll = await api.getTableAll();
        const customer = await api.getCustomerAll();
        let newObj = [];

        tableAll.data.forEach((table) => {
          let hasSeated = false;
          customer.data.forEach((cust) => {
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
        console.table(newObj);
        this.testdat = newObj;
      } catch (err) {}
    },
  },
};
</script>

<style>
.col {
  max-width: 200px;
  max-height: 200px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
