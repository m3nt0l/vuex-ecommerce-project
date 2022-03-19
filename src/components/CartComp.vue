<template>

  <b-row>

    <b-col :key="item.id" v-for="item in cart.line_items" md="4" sm="12" class="px-2">
      <CartItem :item="item"/>

    </b-col>
    <div v-if="!getLoading" style="justify-content: space-between; font-size: 20px;" class=" w-100 p-3 bg-secondary text-light  d-flex justify-content-space-between">
      <div>subtotal : {{ cart.subtotal.formatted_width_symbol }}</div>
      <div>
        <v-btn @click="emptyCART" color="red" elevation="2" class="mr-4" large
        >
          EMPTY CART
        </v-btn>
        <router-link to="checkout">
          <v-btn
              color="green"
              elevation="2"
              large
              class="mr-4"
          >
            CHECKOUT
          </v-btn>
        </router-link>
      </div>
    </div>
    <b-col align-v="center" v-if="cart.line_items.length === 0 && !getLoading" md="12" sm="12" class="px-2 vh-100 text-center h-100 d-flex align-items-center justify-content-center">
      <h2>Cart Empty <b-icon-cart-fill ></b-icon-cart-fill></h2><br>
      <router-link to="/">Back to shopping</router-link>
    </b-col>

  </b-row>

</template>

<script>
// [Vue warn]: Error in render: "TypeError: Cannot read properties of null (reading 'line_items')"
import CartItem from './CartItem';
import {mapGetters, mapActions} from 'vuex';

export default {
  name: "CartComp",
  components: {
    CartItem,
  },
  props: {
    cart: [Array, Object]
  },
  methods: {
    ...mapActions(['emptyCART'])
  },
  computed: {
    ...mapGetters(['getLoading'])
  },
  created() {
    console.log('This is the cart',this.cart);

  }
}
</script>

<style lang="scss" scoped>



</style>