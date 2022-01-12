import { GET_USER_UUID } from "./type/getter-type";
const getters = {
  [GET_USER_UUID]: (state: { userUUid: string }): string => state.userUUid,
};

export default getters;
