import Vue from 'vue'

const state = {
    products: [],
    cart: [],
    error: '',
    snackbar: false,
    loadingStatus: false
}

const getters = {
    allProducts: (state) => state.products,
    getCart: (state) => state.cart,
    getErrors: (state) => state.cart,
    getLoading: (state) => state.loadingStatus
}

const actions = {
    async fetchProducts({commit}) {
        commit('loadingStatus', true)
        await Vue.prototype.$commerce.products.list().then((products) => {
            commit('setProducts',products.data)
            console.log(products, 'This is the products')
            console.log(products.data)
            commit('loadingStatus', false)
        }).catch((error) => {
            console.log('There is an error fetching products', error);
            commit('loadingStatus', false)
        });
    },

    async fetchCart({commit}) {
        console.log('Fetcihing cart')
        commit('loadingStatus', true)
        await Vue.prototype.$commerce.cart.retrieve().then((cart) => {
            commit('setCart', cart)
            console.log(this.cart)
            commit('loadingStatus', false)
        }).catch((error) => {
            console.log('There is an error fetching products', error)
            commit('loadingStatus', false)
        });
    },

    async AddToCart({commit}, productId) {
        commit('loadingStatus', true)
        await Vue.prototype.$commerce.cart.add(productId, 1).then(
            (item) => {
                commit('setCart', item.cart)
                commit('loadingStatus', false)
            }
        ).catch((error) => {
            console.log('There is an error fetching products', error);
            commit('loadingStatus', false)
        });
    },
    async updateCartQty({commit},{id, quantity}) {
        commit('loadingStatus', true)

        await Vue.prototype.$commerce.cart.update(id, { quantity }).then(
            (item) => {
            console.log(item,"This is the item");
            commit('setCart', item.cart)
            commit('loadingStatus', false)
        }).catch((error) => {
            console.log('There is an error fetching products', error);
            commit('loadingStatus', false)
        });
    },
    async removeCartObj({commit},id) {
        commit('loadingStatus', true)
        await Vue.prototype.$commerce.cart.remove(id).then(
            (item)=>{
            commit('setCart', item.cart)
            commit('loadingStatus', false)
        }).catch((error) => {
            console.log('There is an error fetching products', error);
            commit('loadingStatus', false)
        });
    },
    async emptyCART({commit}) {
        commit('loadingStatus', true)
        await Vue.prototype.$commerce.cart.empty().then((item)=>{
            commit('setCart',item.cart);
            commit('loadingStatus', false)
        }).catch((error) => {
            console.log('There is an error fetching products', error);
            commit('loadingStatus', false)
        });
    },
}

const mutations = {
    setProducts: (state, allProducts) => state.products = allProducts,
    setCart: (state, cartProducts) =>state.cart = cartProducts,
    loadingStatus: (state, stats) => (state.loadingStatus = stats)
}

export default {
    state,
    getters,
    actions,
    mutations
}