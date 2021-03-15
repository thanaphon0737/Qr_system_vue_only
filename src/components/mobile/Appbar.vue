<template>
    <div>
        <v-app-bar dark color="#890620">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Menu</v-toolbar-title>

        <v-spacer></v-spacer>
        <Cart/>
        <v-spacer></v-spacer>
        <CartOrder/>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        
        <v-btn icon @click="$router.back()"> <v-icon>mdi-arrow-left</v-icon></v-btn>
      </v-app-bar>
    </div>
</template>
<script>
import Cart from "@/components/cart/Cart.vue"
import CartOrder from "@/components/cart/CartOrder.vue"
export default {
    name: "Appbar",
    components:{
      Cart,
      CartOrder
    },
    
    methods: {
      
    },
}
</script>