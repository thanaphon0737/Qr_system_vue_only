<template>
  <div class="about text-center">
    <h1>Your role is {{ $store.getters["role_name"] }}</h1>
    <h1>Chef Dashboard</h1>
    <v-container justify col-6>
      <v-card>
        {{ inMessage }}
      </v-card>
      <v-textarea
        solo
        name="input-7-4"
        v-model="message"
        label="Solo textarea"
      ></v-textarea>
      {{ message }}

      <v-btn>
        <v-icon>
          mdi-send
        </v-icon>
      </v-btn>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      message: "",
      inMessage: "",
      socket: {},
    };
  },
  created() {},

  mounted() {
    this.socket = this.$store.getters.socket[0];
    // console.log(this.socket);
    this.socket.emit("initial_data");
    this.socket.on("getData", data => {this.getData(data)})
    this.socket.on("changeData", () => this.changeData())
  },
  
  methods: {
    getData(data) {
      // console.log("get")
        let showdata = data.map((data) => {
          return {
            order_id: data.id,
            customer_id: data.customer_id,
            price: data.total_price,
          };
        });
        this.inMessage = showdata;
    },
    changeData(){
      this.socket.emit("initial_data");
      
    }
  },
  beforeDestroy() {
    this.socket.off("getData");
    this.socket.off("changeData");
  },
};
</script>
