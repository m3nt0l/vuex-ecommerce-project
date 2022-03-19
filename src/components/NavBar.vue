<template>
  <div>
    <b-navbar sty toggleable="lg" type="dark" variant="dark" fixed="top">
      <b-navbar-brand href="#"><router-link to="/"><img width="20px" alt="logo" src="../assets/mylogo.png">Alibaba</router-link></b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item right>
          <v-tab>
            <router-link to="/cart">
              <v-badge
                color="green"
                :content="getCart.total_items"
                >
                <b-icon-cart-fill ></b-icon-cart-fill>
              </v-badge>
            </router-link>
          </v-tab>
        </b-nav-item>
      </b-navbar-nav>

    </b-navbar>
  </div>
</template>

<script>
import { BIconCartFill } from 'bootstrap-vue'
import {mapActions, mapGetters} from "vuex";
export default {
  name: "NavBar",
  props: {
    // cart: [Array, Object],
  },

  components: {
    BIconCartFill
  },
  computed: {
    ...mapGetters(['getCart'])
  },
  methods: {
    ...mapActions(['fetchCart']),
  },
  async created() {
    await this.fetchCart()
    console.log('this is from navbar', this.getCart)
  }
}
</script>

<style scoped>

</style>