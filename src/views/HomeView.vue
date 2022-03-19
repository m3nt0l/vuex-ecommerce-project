<template>
  <ProductsList :products="products" @add-to-cart="addToCart" />
</template>

<script>
  import ProductsList from '@/components/ProductsList'

  export default {
    name: 'HomeView',
    components: {
      ProductsList,
    },
    props: {
      products: Array,
    },
    methods: {
      addToCart(id) {
        console.log(id)
        this.$emit('main-addto-cart', id)
      }
    }
  }
</script>
