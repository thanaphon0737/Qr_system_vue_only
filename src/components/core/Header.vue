<template>
  <div>
    <v-app-bar
      app
      color="primary"
      dense
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>{{title}} V{{ version }}</v-toolbar-title>

      <v-spacer></v-spacer>

    <span>{{$store.getters["username"] | capitalize}}</span>
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
    version(){
      return process.env.VUE_APP_VERSION
    },
    title(){
      return process.env.VUE_APP_TITLE
    }
  },
   methods: {
      onClickLogOff(){
        this.$store.dispatch('doLogout')
      }
    }
}
</script>

<style>

</style>