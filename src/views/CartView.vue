<template>
  <div>
    <h1>Cart Page</h1>
    <CartComp
        :cart="getCart"
        @update-quantity="UpdateQtyHandler"
        @remove-quantity="RemoveQtyHandler"/>
  </div>
</template>

<script>
import CartComp from "@/components/CartComp.vue";
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "CartView",
  components: {
    CartComp
  },
  data() {
    return {

    }
  },
  props: {
    cart: [Array, Object],
  },
  computed: {
    ...mapGetters(['getCart'])
  },
  methods: {
    ...mapActions(['fetchCart']),

    UpdateQtyHandler({id, quantity}) {
      this.$emit('update-quantity', {'id': id, 'quantity': quantity});
    },
    RemoveQtyHandler(id) {
      this.$emit('remove-quantity', id);
    }
  },
  async created() {
    await this.fetchCart()
    console.log(this.getCart, "This is my cart")
  }
}
</script>

<style scoped>

</style>