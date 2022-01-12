<template>
  <div class="sideBar">
    <div class="info">
      <div class="info-title">欢迎您</div>
      <div class="info-name">{{ userName }}</div>
      <div class="info-name">{{ identity }}</div>
    </div>
    <div class="buttons">
      <div class="button">
        <button @click="$emit('goPage', 'userInfo')">个人信息</button>
        <button @click="$emit('goPage', 'adminManage')">管理员管理</button>
      </div>
    </div>
    <div>
      <div class="logout">
        <button @click="logOut()">登出</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class SideBar extends Vue {
  @Prop() userName!: string;
  @Prop() identity!: string;
  @Prop() goPage!: (page: string) => void;
  @Prop() logOut!: () => void;
}
</script>

<style lang="scss" scoped>
.sideBar {
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  color: brown;
  height: 100%;
  width: 200px;
  min-width: 200px;
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    .info-title {
      font-size: 20px;
      font-weight: bold;
    }
    .info-name {
      font-size: 16px;
    }
  }
  .buttons {
    display: flex;
    width: 100%;
    flex-direction: column;
    .button {
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: space-between;
      button {
        width: 100%;
        height: 40px;
        border: none;
        background-color: transparent;
        // border-top: 1px solid brown;
        border-bottom: 1px solid brown;
        color: black;
        font-size: 14px;
        cursor: pointer;
      }
      button:nth-child(1) {
        border-top: 1px solid brown;
      }
    }
  }
}
</style>
