import Vue from "vue";
import Vuex from "vuex";
import createVuexAlong from "vuex-along";
import { adminInfo, goodsClassificationList, goodsClassificationTree, goodsList } from "./state";
import { getAdminInfo, getGoodsClassificationList, getGoodsClassificationTree, getGoodsList } from "./getters";
import { GET_ADMIN_INFO } from "./type/getter-type";
import { setAdminInfo, setGoodsClassificationList, setGoodsClassificationTree, setGoodsList } from "./mutations";
import { SET_ADMIN_INFO } from "./type/mutation-type";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    adminInfo: adminInfo,
    goodsClassificationList:goodsClassificationList,
    goodsClassificationTree:goodsClassificationTree,
    goodsList
  },
  getters: {
    [GET_ADMIN_INFO]: getAdminInfo,
    getGoodsClassificationList:getGoodsClassificationList,
    getGoodsClassificationTree:getGoodsClassificationTree,
    getGoodsList:getGoodsList
  },
  mutations: {
    [SET_ADMIN_INFO]: setAdminInfo,
    setGoodsClassificationList:setGoodsClassificationList,
    setGoodsClassificationTree:setGoodsClassificationTree,
    setGoodsList:setGoodsList
  },
  actions: {},
  plugins: [createVuexAlong()]
});
