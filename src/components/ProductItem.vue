<template>
  <div class="product__card">
    <div class="img-wrapper">
      <img class="product__image" :src="product.media.source">
    </div>
    <h3 class="product__name">{{ product.name }}</h3>
    <p class="product__description" v-html="product.description"></p>
    <p class="product__price">{{ product.price.formatted_with_symbol }}</p>
    <v-btn
        class="product__btn"
        @click="AddToCart(product.id)"
    >
      Quick Add
    </v-btn>

  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'ProductItem',
  props: ['product'],
  methods: {
    ...mapActions(['AddToCart']),
    // addToCart() {
    //   this.$emit('add-to-cart', this.product.id, 1);
    // }
  }
};
</script>

<style scoped lang="scss">

.product__card {
  display: flex;
  flex-basis: calc(25% - 10px);
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  margin: 5px;
  border-radius: 6px;
  background: #ffffff;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, .07);

  .product__image {
    width: 100%;
    height: auto;

  }
}
</style>