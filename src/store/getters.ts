import { adminInfoType } from "@/types/type";

export const getAdminInfo = (state: any): adminInfoType => state.adminInfo;
export const getGoodsClassificationList = (state: any): any => state.goodsClassificationList;
export const getGoodsClassificationTree = (state: any): any => state.goodsClassificationTree;
export const getGoodsList = (state: any): any => state.goodsList;