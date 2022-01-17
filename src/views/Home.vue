<template>
  <div class="home">
    <side-bar
      :userName="userName"
      :identity="identity"
      @goPage="goPage"
      @logOut="logOut"
    ></side-bar>
    <router-view
      style="
        padding: 2% 3%;
        background: rgb(233, 233, 233, 0.5);
        width: 100%;
        height: 100%;
      "
    ></router-view>
  </div>
</template>

<script lang="ts">
import SideBar from "@/components/sideBar.vue";
import { GET_ADMIN_INFO } from "@/store/type/getter-type";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { SideBar },
})
export default class Home extends Vue {
  private goPage(page: string): void {
    this["$router"].push(`/home/${page}`);
  }

  get userName(): string {
    return this.$store.getters[GET_ADMIN_INFO].userName;
  }

  get identity(): string {
    let identityArr = {
      0: "超级管理员",
      1: "管理员",
    };
    return identityArr[
      this.$store.getters[GET_ADMIN_INFO].adminRole as keyof typeof identityArr
    ];
  }

  private logOut(): void {
    localStorage.removeItem("UUid");
    this["$router"].push("/login");
  }

  async mounted(): Promise<void> {
    if (!localStorage.getItem("UUid")) {
      this["$router"].push("/login");
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: wrap;
  width: 100%;
  height: 100%;
}
</style>
