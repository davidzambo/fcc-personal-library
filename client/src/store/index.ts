import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { library } from "./library/";
import { IRootState } from "./types";

Vue.use(Vuex);

const isDebug: boolean = process.env.NODE_ENV !== "production";

const store: StoreOptions<IRootState> = {
    state: {
        version: "1.0"
    },
    modules: {
        library
    },
    strict: isDebug
};

export default new Vuex.Store<IRootState>(store);
