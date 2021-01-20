<template>
  <div class="about text-center">
    <v-card max-width="400" class="mx-auto">
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card color="#385F73" dark>
              <v-card-title class="headline">
                Menu today!!
              </v-card-title>

              <v-card-subtitle
                >Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt facere, illo cum accusantium in assumenda perspiciatis
                rem, totam corrupti asperiores sit ratione adipisci odio error
                eius nobis ea reiciendis accusamus?</v-card-subtitle
              >
            </v-card>
            <v-container class="ml-2 mt-5">
              <span>Your NO. table is <strong>{{tableId}}</strong></span>
              <v-btn  
              outlined
              rounded
              small
              @click="goToMenu()"  
                >
                Go to Menu!!
              </v-btn>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableId: this.$route.params.id,
    };
  },
  methods: {
    goToMenu(){
      this.$store.dispatch({
        type: "setCustomerId",
        id: this.tableId,
        token: this.$route.params.timestamp
      });

    }
  },
};
</script>
