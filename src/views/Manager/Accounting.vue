<template>
  <v-container>
    <!-- Table section -->
    <v-data-table :headers="headers" :items="mDataArray" sort-by="id" item-key="id"  hide-default-footer disable-pagination>
      <template v-for="(col, i) in filters" v-slot:[`header.${i}`]="{ header }">
        <div style="display: inline-block; padding: 16px 0;">{{ header.text }}</div>
          <v-menu :close-on-content-click="false" :nudge-width="200" offset-y transition="slide-y-transition" left fixed style="position: absolute; right: 0">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="indigo" icon v-bind="attrs" v-on="on">
                <v-icon small 
                  :color="activeFilters[header.value] && activeFilters[header.value].length < filters[header.value].length ? 'red' : 'default'">
                  mdi-filter-variant
                </v-icon>
              </v-btn>
            </template>
            <v-list flat dense class="pa-0">
              <v-list-item-group multiple v-model="activeFilters[header.value]" class="py-2">
                <template v-for="(item, i) in filters[header.value]">
                  <v-list-item :key="`${item}`" :value="item" :ripple="false">
                    <template v-slot:default="{ active, toggle }">
                      <v-list-item-action>
                        <v-checkbox :input-value="active" :true-value="item"
                          @click="toggle" color="primary" :ripple="false" ></v-checkbox>
                      </v-list-item-action>
                      <v-list-item-content > 
                        <v-list-item-title  v-text="item"></v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </template>
              </v-list-item-group>
              <v-divider></v-divider>
              <v-row no-gutters>
                <v-col cols="6">
                  <v-btn text block @click="toggleAll(header.value)" color="success">Toggle all</v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn text block @click="clearAll(header.value)" color="warning">Clear all</v-btn>
                </v-col>
              </v-row>
            </v-list>
          </v-menu>
        </div>
      </template>
      <template v-slot:header="{ props: { headers } }">
        <thead>
          <tr>
            <th :colspan="headers.length">
              total data [ {{counttable}} ] table
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>ORDERS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editEmployeeInfo(item)">
          mdi-pencil
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import api from "@/services/api";
import moment from 'moment';
export default {
  name: "Accouting",
  socket: {},
  data() {
    return {
      dialog: false,
      counttable:0,
      mDataArray: [],
      formatDataArray:[],
      filters: { 'id': [], 'order_date': [], 'customer_id': [] ,'status':[],'total_price':[]},
      activeFilters: {},
    };
  },
  async mounted() {
    this.socket = this.$store.getters.socket[0];
    this.socket.emit("initial_data_acc");
    this.socket.on("getDataAcc", (data) => {
      this.getData(data);
    });
    this.socket.on("changeData", () => this.changeData());
    
  },
  computed: {
    headers () {
      return [
        {
          text: 'Id',
          align: 'start',
          sortable: true,
          value: 'id',
          filter: value => {
            return this.activeFilters.id ? this.activeFilters.id.includes(value) : true;
          }
        },
        { text: 'Order Date', value: 'order_date',
          filter: value => {
            return this.activeFilters.order_date ? this.activeFilters.order_date.includes(value) : true;
          }
        },
        { text: 'CustomerId', value: 'customer_id',
          filter: value => {
            return this.activeFilters.customer_id ? this.activeFilters.customer_id.includes(value) : true;
          }
        },
        { text: 'Status', value: 'status',
          filter: value => {
            return this.activeFilters.status ? this.activeFilters.status.includes(value) : true;
          } },
        { text: 'Note', value: 'note' },
        { text: 'Total Price' ,value: 'total_price' ,
          filter: value => {
            return this.activeFilters.total_price ? this.activeFilters.total_price.includes(value) : true;
          }},
        { text: 'Actions', value: 'actions', sortable: false },
      ]
    },
    
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    mDataArray (val) {
      
      this.initFilters()
    }
    
  },
  created () {
    this.initialize()
  },
  methods: {
     initialize () {
       this.mDataArray = this.formatDataArray
     },
    initFilters() {
      
      for (const col in this.filters) {
        this.filters[col] = this.mDataArray.map((d) => { return d[col] }).filter(
          (value, index, self) => { return self.indexOf(value) === index }
        )
      }
      // TODO restore previous activeFilters before add/remove item
      this.activeFilters = Object.assign({}, this.filters)
      
    },
    toggleAll (col) {
      this.activeFilters[col] = this.mDataArray.map((d) => { return d[col] }).filter(
        (value, index, self) => { return self.indexOf(value) === index }
      )
    },
    
    clearAll (col) {
      this.activeFilters[col] = []
    },
    editEmployeeInfo(item) {
      this.$router.push(`/order-info/${item.id}`);
    },

    //realtime update
    getData(data) {
      this.formatDataArray = data.map(d =>{
        return{
          id:d.id,
          order_date: moment(String(d.order_date)).format('MM/DD/YYYY'),
          customer_id:d.customer_id,
          status:d.orderStatus.name,
          note:d.note,
          total_price:d.total_price,
        }
      })
      this.mDataArray = this.formatDataArray;
      this.counttable = this.formatDataArray.length;
    },
    changeData() {
      this.socket.emit("initial_data_acc");
    },

    async loadData() {
      let result = await api.getOrder();
      this.formatDataArray = result.data.map(d =>{
        return{
          id:d.id,
          order_date:d.order_date,
          customer_id:d.customer_id,
          status:d.orderStatus.name,
          note:d.note,
          price:d.price,
        }
      })
      
      this.mDataArray = this.formatDataArray;
      
    },
  },
  beforeDestroy() {
    this.socket.off("getDataAcc");
    this.socket.off("changeData");
  },
};
</script>

<style scoped>
.v-list--dense .v-list-item, .v-list-item--dense {
  min-height: 20px !important;
  height: 2rem;
}

.v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: .5rem !important;
}

.v-list-item--link {
  transition: background-color .3s cubic-bezier(.25,.8,.5,1);
}

.v-list-item--link:hover {
  background-color: rgba(0,0,0, .13);
}
</style>>
