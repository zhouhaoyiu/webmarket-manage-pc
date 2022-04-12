<template>
  <div>
    <!-- <img class="logo" src="../../assets/logo.png" /> -->
    <h1 class="title">欢迎来到{{ marketInfo.marketName }}</h1>
    <div class="carousel">
      <el-carousel height="630px" style="margin-top: 10px">
        <el-carousel-item
          v-for="(image, index) in marketInfo.marketImages.split(',')"
          :key="index"
        >
          <img :src="`http://localhost:8090/images/${image}`" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  components: {},
})
export default class homeIndex extends Vue {
  /**
   * @todo 修改为vuex
   */
  marketInfo = {};

  async created() {
    const res = await this.axios.get("/marketInfo/getMarketInfo");
    this.marketInfo = res.data.data[0];
  }
}
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

.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .el-carousel {
    width: 1440px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
}
</style>
