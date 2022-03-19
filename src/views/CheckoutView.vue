<template>
  <div class="checkout">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step
            :complete="e1 > 1"
            step="1"
        >
          Shipping address
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
            :complete="e1 > 2"
            step="2"
        >
          Payment details
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card
                class="mb-12"
                color=""
                height="auto"
            >
              <b-row>
                <b-col md="6" sm="12">
                  <v-text-field
                      label="First Name"
                      :rules="rules"
                      hide-details="auto"
                      v-model="firstName"
                  ></v-text-field>
                </b-col>

                <b-col md="6" sm="12">
                  <v-text-field
                      label="Last Name"
                      :rules="rules"
                      hide-details="auto"
                      v-model="lastName"
                  ></v-text-field>
                </b-col>
                <b-col md="6" sm="12">
                  <v-text-field
                      label="Email"
                      :rules="rules"
                      hide-details="auto"
                      v-model="email"
                  ></v-text-field>
                </b-col>
                <b-col md="6" sm="12">
                  <v-text-field
                      label="Phone"
                      :rules="rules"
                      hide-details="auto"
                      v-model="phone"
                  ></v-text-field>
                </b-col>

                <b-col md="6" sm="12">
                  <v-text-field
                      label="Address"
                      :rules="rules"
                      hide-details="auto"
                      v-model="address1"
                  ></v-text-field>
                </b-col>
                <b-col md="6" sm="12">
                  <v-text-field
                      label="City"
                      :rules="rules"
                      hide-details="auto"
                      v-model="city"
                  ></v-text-field>
                </b-col>
                <b-col md="6" sm="12">
                  <v-text-field
                      label="Zip code"
                      :rules="rules"
                      hide-details="auto"
                      v-model="zip"
                  ></v-text-field>
                </b-col>
                <b-col md="6" sm="12">
                  <v-select
                      :items="countries"
                      label="Shipping Countries"
                      :loading="selectloading"
                      :disabled="selectloading"
                      :rules="ruler"
                  ></v-select>
                </b-col>
                <b-col md="6" sm="12">
                  <v-select
                      :items="subdivisions"
                      label="Shipping Subdivision"
                      :loading="selectloading"
                      :disabled="selectloading"
                      :rules="ruler"
                  ></v-select>
                </b-col>
                <b-col md="6" sm="12">
                  <v-select
                      :items="shippingOptions"
                      label="Shipping option"
                      :loading="selectloading"
                      :disabled="selectloading"
                      :rules="ruler"
                  ></v-select>
                </b-col>
              </b-row>
            </v-card>
          </v-form>
          <div style="justify-content: space-between; font-size: 20px;"
               class=" w-100 d-flex justify-content-space-between">

            <v-btn text>
              Cancel
            </v-btn>
            <v-btn
                color="primary"
                @click="validate"
            >
              Continue
            </v-btn>
        </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
              class="mb-12"
              color=""
              height="auto"
          >
            <h3>Order Summary</h3>
            <div v-if="!selectloading" >
              <div :key="order.id" v-for="order in token.live.line_items" style="justify-content: space-between; font-size: 20px; padding: 10px;"
                   class=" w-100 d-flex justify-content-space-between">
                <div>{{order.name}} <br>Quantity: {{order.quantity}}</div>
                <div> {{order.line_total.formatted_with_symbol}} </div>
              </div>


              <div style="justify-content: space-between; font-size: 20px; padding: 10px;"
                   class=" w-100 d-flex justify-content-space-between">
                <div><h4>Total</h4></div>

                <div> {{token.live.subtotal.formatted_with_symbol}} </div>
              </div>
            </div>
            <hr>
            <h3>Payment method</h3>

            <StripeElementCard :pk="publishableKey"></StripeElementCard>
            <StripeCheckout :pk="publishableKey"></StripeCheckout>
          </v-card>
          <div style="justify-content: space-between; font-size: 20px;"
               class=" w-100 d-flex justify-content-space-between">
            <v-btn text>
              Cancel
            </v-btn>
            <v-btn
                color="primary"
                @click="e1 = 3"
            >
              Pay now {{ token.live.subtotal.formatted_with_symbol }}
            </v-btn>
         </div>
        </v-stepper-content>


      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import { StripeCheckout, StripeElementCard,  } from '@vue-stripe/vue-stripe';


export default {
  name: "CheckoutView",
  data() {
    return {
      e1: 2,
      rules: [
          value => !!value || 'Required.',
          value => (value && value.length >=3) || 'Min 3 characters',
      ],
      ruler: [
        value => !!value || 'Required.',
      ],
      publishableKey: 'pk_test_51Hqmw9EnylLNWUqjZhGaG1ipWYADqMvDACswXeMX1ZYEe5PwGEh1xmtmJgYZkZMigJaROV3k5ZYPl22gBaWgJReS00xo3zab3y',
      valid: true,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      token: [],
      firstName: '',
      lastName: '',
      address1: '',
      email: '',
      phone: '',
      city: '',
      zip: '',
      countries: [],
      country: '',
      subdivisions: [],
      subdivision: '',
      shippingOptions: [],
      shippingOption: '',
      selected: null,
      selectloading: true,
      cart: [],
      userDetails: []

   }
  },
  components: {
    StripeCheckout,
    StripeElementCard
  },
  props: {
    // cart: [Array, Object],
    // fetchCart: Function,
  },
  methods: {
    async fetchcart() {
      await this.$commerce.cart.retrieve().then((cart) => {
        this.cart = cart
        console.log(this.cart)
      }).catch((error) => {
        console.log('There is an error fetching products', error);
      });
    },

    async fetchCountries(TokenId){
      const {countries} = await this.$commerce.services.localeListShippingCountries(TokenId);
      this.countries = Object.values(countries)
      this.country = Object.keys(countries)[0]
      console.log(this.country, "this the countries", Object.values(countries))
    },
    async fetchSubdivisions(countryCode){
      const {subdivisions} = await this.$commerce.services.localeListSubdivisions(countryCode);
      console.log(Object.values(subdivisions));
      this.subdivisions = Object.values(subdivisions, 'this subdivisions')
      this.subdivision = Object.keys(subdivisions)[0]
    },
    async fetchShippingOptions(checkoutTokenId, country, stateProvince = null){
      const options = await this.$commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
      this.shippingOptions = [`${options[0].description} - (${options[0].price.formatted_with_symbol})`]
      this.shippingOption = options[0].id
      console.log(options[0].description, ' ', options[0].price.formatted_with_symbol)
    },
    async fetchToken(cartId) {
      console.log('trying to fetch token')
      await this.$commerce.checkout.generateToken(cartId, {type: 'cart'}).then(
          (token) => {
            console.log(token, "this the token")
            this.token = token
          }
      ).catch(() => {
        // this.$router.push('/')
      })
    },
    validate() {
      this.$refs.form.validate()
      if(this.$refs.form.validate()) {
       const data = {
         'firstName': this.firstName,
         'lastName': this.lastName,
         'address1': this.address1,
         'email': this.email,
         'phone': this.phone,
         'city': this.city,
         'zip': this.zip,
         'shippingCountry': this.countries,
         'shippingOption': this.shippingOption,
         'shippingSubdivision': this.subdivision
       }
       this.userDetails = data
       console.log("User details: ", this.userDetails)
       this.e1=2;

      }
    }
  },
  async created() {
    await this.fetchcart()
    console.log(this.cart.id, 'This is the cart ID')
    await this.fetchToken(this.cart.id)
    await this.fetchCountries(this.token.id)
    await this.fetchSubdivisions(this.country)
    await this.fetchShippingOptions(this.token.id, this.country, this.subdivision)
    console.log('This is shipping options: ', this.shippingoptions)
    this.selectloading = false;
  }
}
</script>

<style lang="css" scoped>
.v-sheet.v-stepper {
  margin-top: 57px;
}
.checkout{
  max-width: 800px;
  margin: 30px auto;
  overflow: auto;
  min-height: 600px;
  /* border: 1px solid steelblue; */
  padding: 30px;
  border-radius: 5px;
}
</style>