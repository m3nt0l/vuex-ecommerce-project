<template>
  <div class="products">
    <ProductItem
    v-for="product in allProducts"
    :key="product.id"
    :product="product"
    class="products__item"
    />
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem";
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "ProductsList",
  components: {
    ProductItem,
  },
  props: {
    // products: {
    //   type: Array,
    //   default: () => [],
    // }
  },
  methods: {
    ...mapActions(['fetchProducts'])
  },
  computed: {
    ...mapGetters(['allProducts'])
  },
  async created() {
    await this.fetchProducts()
    console.log(this.allProducts, 'This is from vuex')
  }
}
</script>

<style scoped>
.products {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

}
</style>