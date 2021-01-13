<template>
  <v-navigation-drawer app permanent color="#febd2e">
    <v-list shaped>
      <v-list-item-group v-model="selectedMenu" mandatory color="primary">
        <v-list-item
          class="title"
          v-for="([icon, title, route], index) in menus"
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
export default {
  methods: {
    onClickMenu(link) {
      
      this.$router.push(link).catch(err => {});
    }
  },
  mounted() {
    this.selectedMenu = this.menus.findIndex(
      menu => menu[2] == this.$route.path
    );
  },
  data() {
    return {
      selectedMenu: 0,
      menus: [
        ["mdi-account-edit","User Profile",`employee-edit/${this.$store.getters.id}`],
        ["mdi-bank", "Accounting", "/accounting"],
        ["mdi-chart-areaspline", "Report", "/report"],
        ["mdi-tag", "Promotion", "/promotion"],
        ["mdi-account-box-multiple", "Manage Employee", "/employee"],
        ["mdi-file-document-box-check-outline", "About", "/about"],
        ["mdi-file-document-box-check-outline", "Product", "/product"],
        ["mdi-file-document-box-check-outline", "Waiter", "/waiter/test"],
        ["mdi-file-document-box-check-outline", "Chef", "/chef/test"],
        ["mdi-file-document-box-check-outline", "Cashier", "/cashier/test"],
        ["mdi-file-document-box-check-outline", "Customer", "/customer/1"],
        ["mdi-file-document-box-check-outline", "Customer", "/customer/2"]

      ]
    };
  },
  watch: {
    $route(to, from) {
      this.selectedMenu = this.menus.findIndex(menu => menu[2] == to.path);
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
