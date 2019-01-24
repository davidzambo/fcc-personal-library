import "bootstrap/dist/css/bootstrap.css";
import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import store from "./store";

Vue.use(Vuex);
Vue.config.productionTip = false;

new Vue({
    el: "#app",
    store,
    components: {
        App
    },
    render: (h) => h(App)
});

