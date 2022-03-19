<template>
  <v-app>
    <NavBar :cart="cart" />
    <v-main>
      <router-view/>
      <v-overlay
          :opacity="0.2"
          :value="getLoading"
      >
        <v-progress-circular indeterminate size="64">

        </v-progress-circular>
        <div class="text-primary">Please wait...</div>
      </v-overlay>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      products: [],
      cart: []
    }
  },
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['getLoading'])
  },
  methods: {
  }
}
</script>
