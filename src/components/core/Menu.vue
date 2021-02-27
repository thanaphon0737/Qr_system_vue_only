<template>
  <v-navigation-drawer 
  v-model="drawer"
  app 
  width="260"
  :src="barImage">
    <v-list shaped>
      <v-list-item-group v-model="selectedMenu" mandatory color="primary">
        <v-list-item
          class="title"
          v-for="([icon, title, route], index) in showMenus"
          :key="index"
          @click="onClickMenu(route)"
        >
          <v-list-item-icon>
            <v-icon color="white">{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
  },
  methods: {
    onClickMenu(link) {
      
      this.$router.push(link);
    },
    checklistMenu(){
      this.menus.forEach(el =>{
        if(el[3] == this.$store.getters.role_name || el[3] == 'All'){
          this.showMenus.push(el)
        }
      })
    }
  },
  mounted() {
    this.selectedMenu = this.showMenus.findIndex(
      menu => menu[2] == this.$route.path
    );
    this.checklistMenu()
  },
  data() {
    return {
      selectedMenu: 0,
      menus: [
        ["mdi-file-document-box-check-outline", "About", "/about",'All'],
        // ["mdi-account-edit","User Profile",`employee-edit/${this.$store.getters.id}`,'Manager'],
        ["mdi-bank", "Accounting", "/accounting",'Manager'],
        ["mdi-chart-areaspline", "Report", "/report",'Manager'],
        ["mdi-tag", "Promotion", "/promotion",'Manager'],
        ["mdi-account-box-multiple", "Manage Employee", "/employee",'Manager'],
        
        ["mdi-file-document-box-check-outline", "Product", "/product",'Manager'],
        ["mdi-file-document-box-check-outline", "Waiter", `/waiter/${this.$store.getters.id}`, 'Waiter'],
        ["mdi-file-document-box-check-outline", "Chef", `/chef/${this.$store.getters.id}`, 'Chef'],
        ["mdi-file-document-box-check-outline", "Cashier", `/cashier/${this.$store.getters.id}`, 'Cashier'],
      ],
      showMenus:[]
    };
  },
  watch: {
    $route(to, from) {
      this.selectedMenu = this.showMenus.findIndex(menu => menu[2] == to.path);
    }
  }
};
</script>

<style>
.v-list-item-group .v-list-item--active {
  color: #fff !important;
  font-weight: bold;
}

.theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
  opacity: 0.7;
}

.tile {
  color: white;
}

.tile:hover {
  background: green;
}

.tile:active {
  background: #05ab71;
}
</style>
