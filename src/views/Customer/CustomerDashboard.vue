<template>
  <div class="about text-center">
    <v-card max-width="400" class="mx-auto">
      <Appbar />
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
          </v-col>

          <v-col v-for="(item, i) in items" :key="i" cols="12">
            <v-card :color="'#f4e7e2'">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="headline"
                    v-text="item.product_name"
                  ></v-card-title>

                  <v-card-actions>
                    <v-btn
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                      @click="infofood(item)"
                    >
                      add
                    </v-btn>
                  </v-card-actions>
                </div>

                <v-avatar class="ma-3" size="125" tile>
                  <v-img
                    :src="item.product_image | imageUrl"
                    lazy-src="http://www.codemobiles.com/biz/images/cm_logo.png?ref=10"
                    aspect-ratio="1"
                    max-width="150"
                    max-height="150"
                  ></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
// import io from 'socket.io-client';

import api from "@/services/api";
import Appbar from "@/components/mobile/Appbar.vue";
export default {
  components: {
    Appbar,
  },
  data() {
    return {
      items: [],
    };
  },
  created() {},
  mounted() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      let result = await api.getProducts();
      this.items = result.data;
    },
    infofood(item) {
      this.$router.push(`/productInfo/${item.id}`);
    },
  },
};
</script>
