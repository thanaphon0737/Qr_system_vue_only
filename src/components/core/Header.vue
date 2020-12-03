<template>
  <div>
    <v-app-bar app color="primary" dense dark>

      <v-list-item-content>
        <v-list-item-title>Role: {{ $store.getters["role_name"] }}</v-list-item-title>
        <v-list-item-subtitle>Username:{{ $store.getters["username"] | capitalize }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-spacer></v-spacer>
      <v-btn icon @click="onClickLogOff">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    
  },
  methods: {
    onClickLogOff() {
      this.$store.dispatch("doLogout");
    },
  },
};
</script>

<style></style>
