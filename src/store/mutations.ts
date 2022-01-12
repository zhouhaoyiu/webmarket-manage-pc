import { SET_USER_UUID } from "./type/mutation-type";

const mutations = {
  [SET_USER_UUID](state: { userUUid: string }, uuid: string): void {
    state.userUUid = uuid;
  },
};

export default mutations;
