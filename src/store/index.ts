import Vue from "vue";
import Vuex from "vuex";
import createVuexAlong from "vuex-along";
import { adminInfo } from "./state";
import { getAdminInfo } from "./getters";
import { GET_ADMIN_INFO } from "./type/getter-type";
import { setAdminInfo } from "./mutations";
import { SET_ADMIN_INFO } from "./type/mutation-type";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    adminInfo: adminInfo
  },
  getters: {
    [GET_ADMIN_INFO]: getAdminInfo
  },
  mutations: {
    [SET_ADMIN_INFO]: setAdminInfo
  },
  actions: {},
  plugins: [createVuexAlong()]
});
