import Vue from "vue";
import Vuex from "vuex";
import createVuexAlong from "vuex-along";
import {
  adminInfo,
  goodsClassificationList,
  goodsClassificationTree,
  goodsList,
} from "./state";
import {
  getAdminInfo,
  getGoodsClassificationList,
  getGoodsClassificationTree,
  getGoodsList,
} from "./getters";
import {
  GET_ADMIN_INFO,
  GET_GOODS_CLASSIFICATION_LIST,
  GET_GOODS_CLASSIFICATION_TREE,
  GET_GOODS_LIST,
} from "./type/getter-type";
import {
  setAdminInfo,
  setGoodsClassificationList,
  setGoodsClassificationTree,
  setGoodsList,
} from "./mutations";
import {
  SET_ADMIN_INFO,
  SET_GOODS_CLASSIFICATION_LIST,
  SET_GOODS_CLASSIFICATION_TREE,
  SET_GOODS_LIST,
} from "./type/mutation-type";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    adminInfo: adminInfo,
    goodsClassificationList: goodsClassificationList,
    goodsClassificationTree: goodsClassificationTree,
    goodsList: goodsList,
  },
  getters: {
    [GET_ADMIN_INFO]: getAdminInfo,
    [GET_GOODS_CLASSIFICATION_LIST]: getGoodsClassificationList,
    [GET_GOODS_CLASSIFICATION_TREE]: getGoodsClassificationTree,
    [GET_GOODS_LIST]: getGoodsList,
  },
  mutations: {
    [SET_ADMIN_INFO]: setAdminInfo,
    [SET_GOODS_CLASSIFICATION_LIST]: setGoodsClassificationList,
    [SET_GOODS_CLASSIFICATION_TREE]: setGoodsClassificationTree,
    [SET_GOODS_LIST]: setGoodsList,
  },
  actions: {},
  plugins: [createVuexAlong()],
});
