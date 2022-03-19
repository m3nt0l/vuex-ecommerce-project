<!-- CartItem.vue -->

<template>

  <v-card class="mx-2" max-width="374">
    <v-img
    height="250"
    :src="item.media.source">
    </v-img>
    <v-card-title>{{ item.name }}</v-card-title>
    <v-card-text>
      <h3>{{ item.price.formatted_with_symbol }}</h3>
    </v-card-text>
    <div>
      <v-btn
      elevation="9"
      x-small
      class="mr-2"

      @click="updateCartQty({'id': item.id, 'quantity': item.quantity-1})"
      >-</v-btn>
      <span>{{item.quantity}}</span>
      <v-btn
          elevation="9"
          x-small
          class="mr-2"

          @click="updateCartQty({'id': item.id, 'quantity': item.quantity+1})"
      >+</v-btn>
      <v-btn
          elevation="5"
          color="red"
          class="ml-6"
          @click="removeCartObj(item.id)"
      >REMOVE</v-btn>
    </div>
  </v-card>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "CartItem",
  props: ['item'],
  methods: {
    ...mapActions(['updateCartQty','removeCartObj']),
    // updateCartQty({id, quantity}) {
    //   console.log("This is object quantity");
    //   // this.$emit('update-quantity', {'id': id, 'quantity': quantity});
    // },
    // removeCartObj(id) {
    //   this.$emit('remove-quantity', id);
    // }
  }
}

</script>

<style lang="scss" scoped>
.cart-item {
  display: flex;
  background: #f8f8f8;
  border-radius: 5px;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
  .cart-item__details {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: center;
    margin-left: 10px;
    padding: 5px;

    .qty-price {
      display: flex;
      font-size: 12px;
    }
    h4 {
      font-size: 14px;
      margin-bottom: 0;
    }
    p {
      margin-bottom: 0;
    }
    .cart-item__details-name {
      margin-right: 10px;
      font-weight: bold;
    }
    .cart-item__details-price {
      margin-left: 10px;
    }
  }

  .img-wrapper {
    display: flex;
    padding: 5px;
  }

  img {
    display: block;
    width: 50px;
    height: 50px;
  }
}
</style>
