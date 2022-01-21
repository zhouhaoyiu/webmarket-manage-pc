<template>
  <div>
    <img class="logo" src="../../assets/logo.png" />
    <h1 class="title">欢迎来到xxxxx网上商城</h1>
    <el-carousel height="450px" style="margin-top: 40px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  components: {},
})
export default class homeIndex extends Vue {}
</script>
<style lang="scss" scoped>
.logo {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  display: block;
}
.title {
  text-align: center;
  font-size: 48px;
  color: #2c3e50;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
