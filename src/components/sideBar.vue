<template>
  <div class="sideBar">
    <div class="info">
      <div class="info-title">欢迎您</div>
      <div class="info-name">{{ userName }}</div>
      <div class="info-name">{{ identity }}</div>
    </div>
    <div class="buttons">
      <!-- <div class="button" :style="$route.path ===">
        <button @click="$emit('goPage', 'userInfo')">个人信息</button>
        <button @click="$emit('goPage', 'adminsManage')">管理员管理</button>
        <button @click="$emit('goPage', 'customersManage')">顾客管理</button>
      </div> -->
      <div
        class="button"
        v-for="(button, buttonIndex) in calcButtonArr"
        :class="getActiveClass(button.strict, button.path)"
        :key="button.name"
      >
        <button @click="emitGoPage(button.path, buttonIndex)">
          {{ button.name }}
          <!-- {{ getActiveClass(button.strict, button.path) }} -->
        </button>
      </div>
    </div>
    <div class="sideBar-foot">
      <el-button type="primary" @click="$emit('logOut')">登出</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { GET_ADMIN_INFO } from "@/store/type/getter-type";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { btn } from "./type";
@Component({
  components: {},
})
export default class SideBar extends Vue {
  @Prop() userName!: string;
  @Prop() identity!: string;
  @Prop() goPage!: (page: string) => void;
  @Prop() logOut!: () => void;

  private buttonArr = [
    {
      name: "首页",
      path: "index",
      role: 1,
    },
    {
      name: "个人信息",
      path: "userInfo",
      role: 1,
    },
    {
      name: "商城管理",
      path: "mallManage",
      role: 1,
    },
    {
      name: "管理员管理",
      path: "adminsManage",
      role: 0,
    },
    {
      name: "顾客管理",
      path: "customersManage",
      role: 1,
    },
    {
      name: "订单管理",
      path: "ordersManage",
      role: 1,
    },
    {
      name: "商品管理",
      path: "goodsManage",
      role: 1,
    },
    {
      name: "商品分类管理",
      path: "goodsClassificationManage",
      role: 1,
    },
    {
      name: "用户统计",
      path: "usersStatistics",
      role: 1,
    },
    {
      name: "商品统计",
      path: "goodsStatistics",
      role: 1,
    },
  ];

  private emitGoPage(path: string, index: number): void {
    this.$emit("goPage", path);
  }

  private getActiveClass(
    strict = false,
    path: string
  ): { active: boolean } | string {
    if (this.routePath === (strict ? path.split("/")[1] : path)) {
      return {
        active: true,
      };
    } else {
      return "";
    }
  }

  get routePath(): string {
    return this.$route.path.split("/")[2] || "index";
  }

  get calcButtonArr(): btn[] {
    return this.buttonArr.filter((button: btn) => {
      return button.role >= this.$store.getters[GET_ADMIN_INFO].adminRole;
    });
  }

  mounted(): void {
    if (localStorage.getItem("page")) {
      this["$router"].push(`/home/${localStorage.getItem("page")}`);
    } else {
      this["$router"].push("/home/index");
    }
  }
}
</script>

<style lang="scss" scoped>
.sideBar {
  display: flex;
  flex-direction: column;
  background-color: transparent;
  color: #021146;
  height: 100%;
  width: 200px;
  min-width: 200px;
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    height: 160px;
    .info-title {
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: bold;
    }
    .info-name {
      margin-bottom: 10px;
      font-size: 16px;
    }
  }
  .buttons {
    display: flex;
    width: 100%;
    height: 70%;
    flex-direction: column;
    .button {
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: space-between;
      margin-top: 5px;
      button {
        width: 100%;
        height: 40px;
        border: none;
        background-color: transparent;
        // border-top: 1px solid brown;
        border-top: 1px solid #021146;
        border-bottom: 1px solid #021146;
        color: black;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .active {
      background: #021146 !important;
      font-weight: bold;
      button {
        color: #fff !important;
      }
    }
  }
  .sideBar-foot {
    display: flex;
    width: 100%;
    height: calc(30% - 160px);
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
      width: 80%;
      height: 40px;
      // background-color: blue;
      // border: none;
      border-radius: 6px;
      // // border-top: 1px solid brown;
      // color: #fff;
      // font-size: 14px;
      // cursor: pointer;
    }
  }
}
</style>
