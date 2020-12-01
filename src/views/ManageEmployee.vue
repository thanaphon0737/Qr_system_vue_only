<template>
  <div class="ManageEmployee text-center">
    <h1>This is an Manage Employee page</h1>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Dropdown
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import api from "@/services/api";
export default {
  async mounted() {
    this.loadRoles();
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async loadRoles() {
      let result = await api.getRoles();
      console.log(result.data);
      
      
      for(var i=0; i<result.data.length; i++){
        console.log(result.data[i].name)
        let obj = {};
        obj['title'] = result.data[i].name
        this.items.push(obj);
        
      }
      // this.items = result.data;
    },
  },
};
</script>
