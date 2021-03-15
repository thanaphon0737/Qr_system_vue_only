<template>
  <div class="about text-center">
    <v-card max-width="400" class="mx-auto">
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card color="#333333" dark>
              <v-card-title class="headline">
                Menu today!!
              </v-card-title>

              <v-card-subtitle
                >If you talk about food just as much as you eat it, you're in
                good company. We've got famous chefs and stars—Julia Child,
                Sophia Loren, Virginia Woolf—to thank for some of the greatest
                food quotes of all time. Do what you will with these: Memorize
                them, pin them, or print them out and tack them up all over your
                kitchen.</v-card-subtitle
              >
            </v-card>
            <v-container class="ml-2 mt-5">
              <span
                >Your NO. table is <strong>{{ tableId }}</strong></span
              >
              <v-btn outlined rounded small @click="goToMenu()">
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
import api from "@/services/api";
export default {
  data() {
    return {
      tableId: this.$route.params.id,
    };
  },
  methods: {
    async reqToken() {
      return new Promise(async (resolve, reject) => {
        try {
          const token = await api.customerReqToken({
            url: `${this.tableId}/${this.$route.params.timestamp}`,
          });
          localStorage.setItem("token", token.data.token);
          resolve(true);
        } catch (err) {
          reject(err);
        }
      });
    },
    async goToMenu() {
      const result = await this.reqToken();
      if (result) {
        this.$store.dispatch({
          type: "setCustomerId",
          table_id: this.tableId,
          token: this.$route.params.timestamp,
        });
      }
    },
  },
};
</script>
