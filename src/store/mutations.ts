import { adminInfoType } from "@/types/type";

export const setAdminInfo = function (state: any, info: adminInfoType): void {
  state.adminInfo = info
};
