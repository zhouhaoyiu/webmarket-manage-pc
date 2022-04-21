import { adminInfoType } from "@/types/type";

export const setAdminInfo = function (state: any, info: adminInfoType): void {
  state.adminInfo = info;
};

export const setGoodsClassificationList = function (
  state: any,
  list: any
): void {
  state.goodsClassificationList = list;
};

export const setGoodsClassificationTree = function (
  state: any,
  tree: any
): void {
  state.goodsClassificationTree = tree;
};

export const setGoodsList = function (state: any, list: any): void {
  state.goodsList = list;
};

export const setCustomersList = function (state: any, list: any): void {
  state.customersList = list;
}

