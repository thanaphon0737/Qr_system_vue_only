<template>
  <v-card ripple id="StockCard">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{title}}</v-list-item-title>
        <v-list-item-subtitle class="title">{{subtitle}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" :color="avatar_bg">
        <v-icon color="white"> {{avatar_ic}} </v-icon>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "StockCard",
   props: ["title", "subtitle", "avatar_bg", "avatar_ic"]
};
</script>

<style></style>
