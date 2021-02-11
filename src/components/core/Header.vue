<template>
  <div>
    <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
      <v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
        <!-- <v-icon v-if="value">
          mdi-view-quilt
        </v-icon> -->

        <v-icon >
          mdi-dots-vertical
        </v-icon>
      </v-btn>
      <v-list-item-content class="yText">
        <v-list-item-title
          >Role: {{ $store.getters["role_name"] }}</v-list-item-title
        >
        <v-list-item-subtitle
          >Username:{{
            $store.getters["username"] | capitalize
          }}</v-list-item-subtitle
        >
      </v-list-item-content>
      <v-spacer></v-spacer>
      <v-btn class="ml-2" min-width="0" text @click="$router.push(`employee-edit/${$store.getters.id}`)">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon @click="onClickLogOff">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: "Header",
  
  components: {},
  computed: {
      ...mapState(['drawer']),
    },
  methods: {
    onClickLogOff() {
      this.$store.dispatch("doLogout");
    },
    ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
  },
};
</script>

<style>
.yText {
  color: #1f1e19;
}
</style>
